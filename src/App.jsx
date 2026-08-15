import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Bot,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Code2,
  FileText,
  Filter,
  Flame,
  Library,
  Lightbulb,
  ListChecks,
  MessageCircle,
  NotebookTabs,
  PenLine,
  Play,
  RotateCcw,
  Rocket,
  Search,
  Send,
  Sparkles,
  TerminalSquare,
  Trophy,
  UserRound,
  X,
} from 'lucide-react';
import { codingAnswersByChapter } from './data/codingAnswers.js';
import { cNotes, codingQuestionsByChapter, comingSoonLanguages } from './data/cNotes.js';
import { javaNotes } from './data/javaNotes.js';
import { programExamplesByChapter } from './data/programExamples.js';

const languages = [
  cNotes,
  javaNotes,
  ...comingSoonLanguages.filter((language) => language.id !== 'java'),
];

const readyLanguages = languages.filter((language) => language.chapters?.length);
const STUDY_STORAGE_KEY = 'code-notes-lab-study-v1';

const defaultStudyData = {
  completed: {},
  bookmarks: {},
  notes: {},
  quizScores: {},
  playground: {},
  settings: { difficulty: 'all' },
  lastLocation: { languageId: 'c', chapterNumber: 1 },
};

function loadStudyData() {
  try {
    const stored = JSON.parse(localStorage.getItem(STUDY_STORAGE_KEY));
    return {
      ...defaultStudyData,
      ...stored,
      settings: { ...defaultStudyData.settings, ...stored?.settings },
      lastLocation: { ...defaultStudyData.lastLocation, ...stored?.lastLocation },
    };
  } catch {
    return defaultStudyData;
  }
}

function getChapterKey(languageId, chapterNumber) {
  return `${languageId}:${chapterNumber}`;
}

function handleHorizontalWheel(event) {
  const scroller = event.currentTarget;
  const maxScroll = scroller.scrollWidth - scroller.clientWidth;
  if (maxScroll <= 1) return;

  const rawDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
    ? event.deltaX
    : event.deltaY;
  const delta = rawDelta * (event.deltaMode === 1 ? 16 : 1);
  const canMoveLeft = delta < 0 && scroller.scrollLeft > 0;
  const canMoveRight = delta > 0 && scroller.scrollLeft < maxScroll - 1;

  if (canMoveLeft || canMoveRight) {
    event.preventDefault();
    scroller.scrollLeft = Math.max(0, Math.min(maxScroll, scroller.scrollLeft + delta));
  }
}

const cStarterPrompts = [
  'Explain pointers',
  'Loop revision',
  'Arrays fast notes',
  'File I/O traps',
  'String practice',
  'Chapter 1 recap',
];

function App() {
  const [studyData, setStudyData] = useState(loadStudyData);
  const [activeLanguage, setActiveLanguage] = useState(() => studyData.lastLocation.languageId);
  const [activeChapter, setActiveChapter] = useState(() => studyData.lastLocation.chapterNumber);
  const [activeView, setActiveView] = useState('reader');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState(() => [
    {
      id: crypto.randomUUID(),
      role: 'bot',
      type: 'welcome',
      text: 'Ready for a C study sprint. Pick a chapter or ask for pointers, loops, arrays, files, traps, examples, or practice.',
    },
  ]);
  const inputRef = useRef(null);

  const selectedLanguage = languages.find((language) => language.id === activeLanguage) ?? cNotes;
  const isReady = Boolean(selectedLanguage.chapters?.length);
  const selectedChapter = selectedLanguage.chapters?.find((chapter) => chapter.number === activeChapter)
    ?? selectedLanguage.chapters?.[0]
    ?? cNotes.chapters[0];
  const starterPrompts = selectedLanguage.prompts ?? cStarterPrompts;
  const chapterKey = getChapterKey(selectedLanguage.id, selectedChapter.number);
  const completedCount = selectedLanguage.chapters?.filter(
    (chapter) => studyData.completed[getChapterKey(selectedLanguage.id, chapter.number)],
  ).length ?? 0;
  const progressPercent = selectedLanguage.chapters?.length
    ? Math.round((completedCount / selectedLanguage.chapters.length) * 100)
    : 0;

  useEffect(() => {
    localStorage.setItem(STUDY_STORAGE_KEY, JSON.stringify(studyData));
  }, [studyData]);

  const topicMatches = useMemo(
    () => flattenNotes(selectedLanguage.chapters ?? []),
    [selectedLanguage],
  );

  const searchIndex = useMemo(() => createSearchIndex(readyLanguages), []);
  const searchResults = useMemo(
    () => searchNotes(searchIndex, searchTerm),
    [searchIndex, searchTerm],
  );

  const updateStudyData = (updater) => {
    setStudyData((current) => updater(current));
  };

  const rememberLocation = (languageId, chapterNumber) => {
    updateStudyData((current) => ({
      ...current,
      lastLocation: { languageId, chapterNumber },
    }));
  };

  const askBot = (rawQuestion) => {
    const cleanQuestion = rawQuestion.trim();
    if (!cleanQuestion) return;

    const answer = buildAnswer(cleanQuestion, selectedChapter, topicMatches, selectedLanguage);
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: 'user',
        text: cleanQuestion,
      },
      {
        id: crypto.randomUUID(),
        role: 'bot',
        text: answer.text,
        chapter: answer.chapter,
        match: answer.match,
      },
    ]);

    if (answer.chapter) {
      setActiveChapter(answer.chapter.number);
    }

    setQuestion('');
    window.setTimeout(() => inputRef.current?.focus(), 80);
  };

  const openChapter = (chapter) => {
    setActiveChapter(chapter.number);
    setActiveView('reader');
    rememberLocation(selectedLanguage.id, chapter.number);
    setMessages((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        role: 'bot',
        text: `Opened Chapter ${chapter.number}: ${chapter.title}. Start with the power points, study the program examples, then try the 5 coding questions at the end.`,
        chapter,
      },
    ]);
  };

  const openLanguage = (language) => {
    setActiveLanguage(language.id);
    setActiveChapter(1);
    setActiveView('reader');
    setSearchTerm('');
    rememberLocation(language.id, 1);
    if (language.chapters?.length) {
      setMessages([
        {
          id: crypto.randomUUID(),
          role: 'bot',
          text: `Ready for a ${language.name} study sprint. Pick a chapter or ask for a concept, example, trap, or practice set.`,
        },
      ]);
    }
  };

  const openSearchResult = (result) => {
    setActiveLanguage(result.language.id);
    setActiveChapter(result.chapter.number);
    setActiveView('reader');
    setSearchTerm('');
    setShowBookmarks(false);
    rememberLocation(result.language.id, result.chapter.number);
  };

  const toggleChapterFlag = (collection) => {
    updateStudyData((current) => ({
      ...current,
      [collection]: {
        ...current[collection],
        [chapterKey]: !current[collection][chapterKey],
      },
    }));
  };

  const moveChapter = (offset) => {
    const nextIndex = selectedLanguage.chapters.findIndex(
      (chapter) => chapter.number === selectedChapter.number,
    ) + offset;
    const nextChapter = selectedLanguage.chapters[nextIndex];
    if (nextChapter) {
      openChapter(nextChapter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <main className="bot-page">
      <aside className="bot-sidebar">
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">
            <Bot size={24} />
          </div>
          <div>
            <p className="eyebrow">Study Arena</p>
            <h1>Code Notes Lab</h1>
          </div>
        </div>

        <div className="streak-card">
          <Flame size={20} />
          <div>
            <span>{isReady ? `${progressPercent}% complete` : 'Focus Path'}</span>
            <strong>{isReady ? `${completedCount} of ${selectedLanguage.chapters.length} chapters` : 'More tracks coming'}</strong>
            {isReady && <i><b style={{ width: `${progressPercent}%` }} /></i>}
          </div>
        </div>

        <button
          className="bookmark-shelf-button"
          onClick={() => setShowBookmarks((current) => !current)}
          type="button"
        >
          <BookmarkCheck size={18} />
          <span>Bookmarks</span>
          <strong>{Object.values(studyData.bookmarks).filter(Boolean).length}</strong>
        </button>

        <div className="language-list" aria-label="Language list">
          {languages.map((language) => (
            <button
              className={`language-button ${activeLanguage === language.id ? 'is-active' : ''}`}
              key={language.id}
              onClick={() => openLanguage(language)}
              type="button"
            >
              <span>{language.name}</span>
              <small>{language.status}</small>
            </button>
          ))}
        </div>

        <div className="source-panel">
          <FileText size={18} />
          <div>
            <p>Current source</p>
            {selectedLanguage.source ? (
              <a href={selectedLanguage.source.url} target="_blank" rel="noreferrer">
                {selectedLanguage.source.label}
              </a>
            ) : <span>Source not loaded yet</span>}
          </div>
        </div>
      </aside>

      <section className="bot-workspace">
        <header className="bot-hero">
          <div>
            <p className="eyebrow">Ask. Unlock. Remember.</p>
            <h2>{selectedLanguage.name} Notes Bot</h2>
            <p>Turn each {selectedLanguage.name} chapter into a short mission: key ideas, danger points, examples, and practice.</p>
          </div>
          <HeroVisual chapter={selectedChapter} />
          <div className="hero-stats" aria-label="Notes summary">
            <span><NotebookTabs size={18} /> {selectedLanguage.chapters?.length ?? 0} chapters</span>
            <span><ListChecks size={18} /> {selectedChapter.topics.length} live topics</span>
          </div>
        </header>

        {!isReady ? (
          <ComingSoon language={selectedLanguage} />
        ) : (
          <>
            <StudyToolbar
              activeView={activeView}
              bookmarks={studyData.bookmarks}
              onChangeView={setActiveView}
              onCloseBookmarks={() => setShowBookmarks(false)}
              onOpenResult={openSearchResult}
              onToggleBookmarks={() => setShowBookmarks((current) => !current)}
              searchResults={searchResults}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              showBookmarks={showBookmarks}
            />

            {activeView === 'reader' && <div className="bot-grid">
            <section className="chat-panel" aria-label="Notes bot chat">
              <div className="chat-header">
                <div className="chat-icon"><MessageCircle size={21} /></div>
                <div>
                  <h3>Notes Bot</h3>
                  <p>Chapter {selectedChapter.number}: {selectedChapter.title}</p>
                </div>
              </div>

              <div className="prompt-chips" aria-label="Suggested questions">
                {starterPrompts.map((prompt) => (
                  <button key={prompt} type="button" onClick={() => askBot(prompt)}>
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="messages" aria-live="polite">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>

              <form
                className="ask-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  askBot(question);
                }}
              >
                <label>
                  <Search size={18} />
                  <input
                    ref={inputRef}
                    value={question}
                    onChange={(event) => setQuestion(event.target.value)}
                    placeholder="Ask: explain arrays, chapter 5 trap, recursion practice..."
                  />
                </label>
                <button type="submit" aria-label="Ask notes bot">
                  <Send size={19} />
                </button>
              </form>
            </section>

            <section className="study-panel" aria-label="Selected chapter notes">
              <ChapterPicker
                activeChapter={activeChapter}
                bookmarks={studyData.bookmarks}
                chapters={selectedLanguage.chapters}
                completed={studyData.completed}
                languageId={selectedLanguage.id}
                onOpenChapter={openChapter}
              />
              <ChapterNotebook
                chapter={selectedChapter}
                difficulty={studyData.settings.difficulty}
                isBookmarked={Boolean(studyData.bookmarks[chapterKey])}
                isCompleted={Boolean(studyData.completed[chapterKey])}
                language={selectedLanguage}
                note={studyData.notes[chapterKey] ?? ''}
                onChangeDifficulty={(difficulty) => updateStudyData((current) => ({
                  ...current,
                  settings: { ...current.settings, difficulty },
                }))}
                onChangeNote={(note) => updateStudyData((current) => ({
                  ...current,
                  notes: { ...current.notes, [chapterKey]: note },
                }))}
                onMoveChapter={moveChapter}
                onToggleBookmark={() => toggleChapterFlag('bookmarks')}
                onToggleComplete={() => toggleChapterFlag('completed')}
                total={selectedLanguage.chapters.length}
              />
            </section>
            </div>}

            {activeView === 'quiz' && (
              <QuizMode
                chapter={selectedChapter}
                language={selectedLanguage}
                onOpenChapter={(chapter) => {
                  setActiveChapter(chapter.number);
                  rememberLocation(selectedLanguage.id, chapter.number);
                }}
                onSaveScore={(score) => updateStudyData((current) => ({
                  ...current,
                  quizScores: {
                    ...current.quizScores,
                    [chapterKey]: {
                      attempts: (current.quizScores[chapterKey]?.attempts ?? 0) + 1,
                      best: Math.max(current.quizScores[chapterKey]?.best ?? 0, score),
                    },
                  },
                }))}
                savedScore={studyData.quizScores[chapterKey]}
              />
            )}

            {activeView === 'playground' && (
              <CodePlayground
                chapter={selectedChapter}
                draft={studyData.playground[selectedLanguage.id]}
                language={selectedLanguage}
                onChangeDraft={(draft) => updateStudyData((current) => ({
                  ...current,
                  playground: { ...current.playground, [selectedLanguage.id]: draft },
                }))}
              />
            )}
          </>
        )}
      </section>
    </main>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === 'user';

  return (
    <article className={`message ${isUser ? 'is-user' : 'is-bot'}`}>
      <div className="message-avatar" aria-hidden="true">
        {isUser ? <UserRound size={18} /> : <Bot size={18} />}
      </div>
      <div className="message-bubble">
        <p>{message.text}</p>
        {message.chapter && !isUser && (
          <div className="answer-card">
            <span>Chapter {message.chapter.number}</span>
            <strong>{message.chapter.title}</strong>
            <p>{message.chapter.hook}</p>
          </div>
        )}
        {message.match && !isUser && (
          <div className="topic-answer">
            <strong>{message.match.topic}</strong>
            <p>{message.match.point}</p>
          </div>
        )}
      </div>
    </article>
  );
}

function HeroVisual({ chapter }) {
  return (
    <div className="hero-visual" aria-label={`Visual study card for ${chapter.title}`}>
      <div className="console-window">
        <div className="window-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div className="console-lines">
          <p><Code2 size={15} /> load chapter_{chapter.number}</p>
          <p><Rocket size={15} /> unlock {chapter.title}</p>
          <p><Sparkles size={15} /> {chapter.topics.length} ideas ready</p>
        </div>
      </div>
      <div className="level-meter">
        <span>Level {chapter.number.toString().padStart(2, '0')}</span>
        <strong>{chapter.title}</strong>
      </div>
    </div>
  );
}

function StudyToolbar({
  activeView,
  bookmarks,
  onChangeView,
  onCloseBookmarks,
  onOpenResult,
  onToggleBookmarks,
  searchResults,
  searchTerm,
  setSearchTerm,
  showBookmarks,
}) {
  const bookmarkResults = getBookmarkedResults(bookmarks);
  const visibleResults = searchTerm.trim() ? searchResults : (showBookmarks ? bookmarkResults : []);

  return (
    <div className="study-toolbar">
      <div className="view-switcher" aria-label="Study view">
        <button
          className={activeView === 'reader' ? 'is-active' : ''}
          onClick={() => onChangeView('reader')}
          type="button"
        >
          <BookOpen size={17} /> Reader
        </button>
        <button
          className={activeView === 'quiz' ? 'is-active' : ''}
          onClick={() => onChangeView('quiz')}
          type="button"
        >
          <Trophy size={17} /> Quiz
        </button>
        <button
          className={activeView === 'playground' ? 'is-active' : ''}
          onClick={() => onChangeView('playground')}
          type="button"
        >
          <TerminalSquare size={17} /> Playground
        </button>
      </div>

      <div className="global-search">
        <label>
          <Search size={18} />
          <input
            aria-label="Search all C and Java notes"
            onChange={(event) => {
              setSearchTerm(event.target.value);
              if (event.target.value) onCloseBookmarks();
            }}
            placeholder="Search C and Java notes..."
            value={searchTerm}
          />
          {searchTerm && (
            <button aria-label="Clear search" onClick={() => setSearchTerm('')} type="button">
              <X size={17} />
            </button>
          )}
        </label>
        <button
          className={`toolbar-bookmark-button ${showBookmarks ? 'is-active' : ''}`}
          onClick={onToggleBookmarks}
          title="Show bookmarks"
          type="button"
        >
          <Bookmark size={18} />
        </button>

        {(searchTerm.trim() || showBookmarks) && (
          <div className="search-results">
            <div className="search-results-head">
              <strong>{searchTerm.trim() ? 'Search results' : 'Bookmarked chapters'}</strong>
              <span>{visibleResults.length}</span>
            </div>
            {visibleResults.length ? visibleResults.map((result) => (
              <button key={`${result.language.id}:${result.chapter.number}:${result.topic ?? ''}`} onClick={() => onOpenResult(result)} type="button">
                <span>{result.language.name} · Chapter {result.chapter.number}</span>
                <strong>{result.topic ?? result.chapter.title}</strong>
                <p>{result.point ?? result.chapter.hook}</p>
              </button>
            )) : (
              <p className="empty-result">No matching notes yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ChapterPicker({ activeChapter, bookmarks, chapters, completed, languageId, onOpenChapter }) {
  return (
    <nav
      className="chapter-strip"
      aria-label="Language chapters"
      onWheel={handleHorizontalWheel}
    >
      {chapters.map((chapter) => (
        <button
          className={`chapter-card ${activeChapter === chapter.number ? 'is-active' : ''}`}
          key={chapter.number}
          onClick={() => onOpenChapter(chapter)}
          type="button"
        >
          <span className="chapter-number">{chapter.number.toString().padStart(2, '0')}</span>
          <span className="chapter-card-copy">
            <strong>{chapter.title}</strong>
            <small>
              {completed[getChapterKey(languageId, chapter.number)] && <CheckCircle2 size={13} />}
              {bookmarks[getChapterKey(languageId, chapter.number)] && <Bookmark size={13} />}
              {chapter.revisionOnly ? 'Revision route' : `${chapter.topics.length} concepts`}
            </small>
          </span>
        </button>
      ))}
    </nav>
  );
}

function ChapterNotebook({
  chapter,
  difficulty,
  isBookmarked,
  isCompleted,
  language,
  note,
  onChangeDifficulty,
  onChangeNote,
  onMoveChapter,
  onToggleBookmark,
  onToggleComplete,
  total,
}) {
  return (
    <article className="notebook">
      <div className="chapter-actionbar">
        <div className="chapter-actionbar-copy">
          <span>Chapter {chapter.number}</span>
          <strong>{isCompleted ? 'Completed' : 'In progress'}</strong>
        </div>
        <div className="chapter-action-buttons">
          <button
            className={isBookmarked ? 'is-active' : ''}
            onClick={onToggleBookmark}
            title={isBookmarked ? 'Remove bookmark' : 'Bookmark chapter'}
            type="button"
          >
            {isBookmarked ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>
          <button
            className={isCompleted ? 'is-complete' : ''}
            onClick={onToggleComplete}
            type="button"
          >
            {isCompleted ? <CheckCircle2 size={18} /> : <Circle size={18} />}
            <span>{isCompleted ? 'Completed' : 'Mark complete'}</span>
          </button>
        </div>
      </div>

      <div className="notebook-cover">
        <div>
          <p className="chapter-index">Chapter {chapter.number} of {total}</p>
          <h3>{chapter.title}</h3>
          <p>{chapter.hook}</p>
        </div>
        <div className="chapter-metrics" aria-label="Chapter summary">
          <span><Sparkles size={16} /> {chapter.topics.length} topics</span>
          <span><TerminalSquare size={16} /> Examples</span>
          <span><BookOpen size={16} /> {chapter.revisionOnly ? 'Revision' : 'Questions'}</span>
        </div>
      </div>

      <div className="note-card">
        <div className="section-heading">
          <Sparkles size={20} />
          <h4>Topic Table</h4>
        </div>
        <div className="topic-table" role="table" aria-label={`${chapter.title} important topic table`}>
          <div className="topic-table-head" role="row">
            <span role="columnheader">Topic</span>
            <span role="columnheader">Important Point + Example</span>
          </div>
          {chapter.topics.map(([topic, point, example]) => (
            <div className="topic-table-row" key={topic} role="row">
              <strong role="cell">{topic}</strong>
              <div className="topic-detail" role="cell">
                <p>{point}</p>
                <div className="topic-example">
                  <span>Example</span>
                  <SyntaxBlock
                    code={example ?? getTopicExample(chapter.number, topic)}
                    compact
                    languageId={language.id}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="note-split">
        <div className="note-card">
          <div className="section-heading">
            <Lightbulb size={20} />
            <h4>Important & Usable</h4>
          </div>
          <ul className="clean-list">
            {chapter.useIt.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="note-card warning">
          <div className="section-heading">
            <AlertTriangle size={20} />
            <h4>Trap</h4>
          </div>
          <p>{chapter.trap}</p>
        </div>
      </div>

      {chapter.revisionPlan && <RevisionPlan plan={chapter.revisionPlan} />}

      {chapter.conditionalExamples && (
        <div className="note-card examples-card">
          <div className="section-heading">
            <ListChecks size={20} />
            <h4>Conditional Statements Examples</h4>
          </div>
          <div className="example-table">
            <div className="example-table-head">
              <span>Statement</span>
              <span>When To Use</span>
              <span>Example</span>
            </div>
            {chapter.conditionalExamples.map((item) => (
              <div className="example-table-row" key={item.title}>
                <strong>{item.title}</strong>
                <p>{item.use}</p>
                <SyntaxBlock code={item.code} compact languageId={language.id} />
              </div>
            ))}
          </div>
        </div>
      )}

      {!chapter.revisionOnly && <ProgramExamples chapter={chapter} language={language} />}

      <div className="note-split">
        <div className="code-card">
          <div className="section-heading">
            <TerminalSquare size={20} />
            <h4>Highlighted Syntax</h4>
          </div>
          <SyntaxBlock code={chapter.example} languageId={language.id} />
          <SyntaxLegend languageId={language.id} />
        </div>

        <div className="note-card practice">
          <div className="section-heading">
            <BookOpen size={20} />
            <h4>Practice</h4>
          </div>
          <p>{chapter.practice}</p>
          <div className="energy-strip">{chapter.energy}</div>
        </div>
      </div>

      {!chapter.revisionOnly && (
        <CodingQuestions
          chapter={chapter}
          difficulty={difficulty}
          language={language}
          onChangeDifficulty={onChangeDifficulty}
        />
      )}

      <PersonalNotes note={note} onChange={onChangeNote} />

      <ChapterNavigation
        canGoNext={chapter.number < total}
        canGoPrevious={chapter.number > 1}
        chapter={chapter}
        onMove={onMoveChapter}
      />
    </article>
  );
}

function PersonalNotes({ note, onChange }) {
  return (
    <div className="note-card personal-notes">
      <div className="section-heading">
        <PenLine size={20} />
        <h4>My Chapter Notes</h4>
        <span><Check size={14} /> Saved offline</span>
      </div>
      <textarea
        aria-label="Personal chapter notes"
        onChange={(event) => onChange(event.target.value)}
        placeholder="Write your own explanation, memory trick, or mistake to avoid..."
        value={note}
      />
    </div>
  );
}

function ChapterNavigation({ canGoNext, canGoPrevious, chapter, onMove }) {
  return (
    <nav className="chapter-navigation" aria-label="Chapter navigation">
      <button disabled={!canGoPrevious} onClick={() => onMove(-1)} type="button">
        <ChevronLeft size={19} />
        <span>Previous</span>
      </button>
      <div>
        <span>Current chapter</span>
        <strong>{chapter.number}. {chapter.title}</strong>
      </div>
      <button disabled={!canGoNext} onClick={() => onMove(1)} type="button">
        <span>Next</span>
        <ChevronRight size={19} />
      </button>
    </nav>
  );
}

function RevisionPlan({ plan }) {
  return (
    <div className="note-card revision-plan">
      <div className="section-heading">
        <Sparkles size={20} />
        <h4>Easy Revision Strategy</h4>
      </div>
      <div className="revision-grid">
        {plan.map((section) => (
          <article className="revision-card" key={section.title}>
            <strong>{section.title}</strong>
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </div>
  );
}

function ProgramExamples({ chapter, language }) {
  const examples = chapter.programExamples
    ?? (language.id === 'c' ? programExamplesByChapter[chapter.number] : []);

  if (examples.length === 0) return null;

  return (
    <div className="note-card program-examples">
      <div className="section-heading">
        <TerminalSquare size={20} />
        <h4>Program Examples</h4>
      </div>
      <div className="program-example-list">
        {examples.map((example) => (
          <article className="program-example" key={example.title}>
            <div>
              <strong>{example.title}</strong>
              <p>{example.idea}</p>
            </div>
            <div className="program-code-stack">
              <SyntaxBlock code={example.code} compact languageId={language.id} />
              <CodeExplanation code={example.code} idea={example.idea} languageId={language.id} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function CodeExplanation({ code, idea, languageId }) {
  const points = getCodeExplanationPoints(code, idea, languageId);

  return (
    <div className="code-explanation">
      <div className="explain-title">
        <Lightbulb size={16} />
        <strong>Code Explanation</strong>
      </div>
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  );
}

function CodingQuestions({ chapter, difficulty, language, onChangeDifficulty }) {
  const questions = chapter.questions
    ?? (language.id === 'c' ? codingQuestionsByChapter[chapter.number] : []);
  const answers = chapter.answers
    ?? (language.id === 'c' ? codingAnswersByChapter[chapter.number] : []);

  if (questions.length === 0) return null;

  const visibleQuestions = questions
    .map((question, index) => ({
      answer: answers[index],
      difficulty: getQuestionDifficulty(index),
      index,
      question,
    }))
    .filter((item) => difficulty === 'all' || item.difficulty === difficulty);

  return (
    <div className="note-card coding-questions">
      <div className="section-heading">
        <BookOpen size={20} />
        <h4>5 Coding Questions</h4>
      </div>
      <DifficultyFilter value={difficulty} onChange={onChangeDifficulty} />
      <ol>
        {visibleQuestions.map((item) => (
          <li className={`difficulty-${item.difficulty}`} key={item.question}>
            <div className="question-meta">
              <span>{item.difficulty}</span>
              <small>Question {item.index + 1}</small>
            </div>
            <div className="question-text">{item.question}</div>
            {item.answer && (
              <details className="answer-reveal">
                <summary>Answer</summary>
                <SyntaxBlock code={item.answer} compact languageId={language.id} />
              </details>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}

function DifficultyFilter({ onChange, value }) {
  return (
    <div className="difficulty-filter" aria-label="Question difficulty">
      <Filter size={16} />
      {['all', 'beginner', 'intermediate', 'exam'].map((level) => (
        <button
          className={value === level ? 'is-active' : ''}
          key={level}
          onClick={() => onChange(level)}
          type="button"
        >
          {level}
        </button>
      ))}
    </div>
  );
}

function getQuestionDifficulty(index) {
  if (index < 2) return 'beginner';
  if (index < 4) return 'intermediate';
  return 'exam';
}

function SyntaxBlock({ code, compact = false, languageId = 'c' }) {
  const blockRef = useRef(null);
  const dragState = useRef({
    active: false,
    startX: 0,
    scrollLeft: 0,
  });

  const startDrag = (event) => {
    const block = blockRef.current;
    if (!block) return;

    dragState.current = {
      active: true,
      startX: event.clientX,
      scrollLeft: block.scrollLeft,
    };
    block.setPointerCapture?.(event.pointerId);
    block.classList.add('is-dragging');
  };

  const moveDrag = (event) => {
    const block = blockRef.current;
    if (!block || !dragState.current.active) return;

    event.preventDefault();
    const walk = event.clientX - dragState.current.startX;
    block.scrollLeft = dragState.current.scrollLeft - walk;
  };

  const stopDrag = (event) => {
    dragState.current.active = false;
    blockRef.current?.releasePointerCapture?.(event.pointerId);
    blockRef.current?.classList.remove('is-dragging');
  };

  return (
    <div className={`syntax-frame ${compact ? 'is-compact' : ''}`}>
      <pre
        className="syntax-block"
        onPointerCancel={stopDrag}
        onPointerDown={startDrag}
        onPointerLeave={stopDrag}
        onPointerMove={moveDrag}
        onPointerUp={stopDrag}
        onWheel={handleHorizontalWheel}
        ref={blockRef}
      >
        <code dangerouslySetInnerHTML={{ __html: highlightCode(code, languageId) }} />
      </pre>
    </div>
  );
}

function SyntaxLegend({ languageId }) {
  return (
    <div className="syntax-legend" aria-label="Syntax color guide">
      <span><i className="legend-key key-pre" /> {languageId === 'java' ? 'Annotation' : 'Preprocessor'}</span>
      <span><i className="legend-key key-kw" /> Keyword</span>
      <span><i className="legend-key key-fn" /> Function</span>
      <span><i className="legend-key key-str" /> String</span>
      <span><i className="legend-key key-num" /> Number</span>
    </div>
  );
}

function ComingSoon({ language }) {
  return (
    <section className="coming-soon">
      <div className="coming-card">
        <Library size={38} />
        <p className="eyebrow">{language.status}</p>
        <h3>{language.name} notes are ready for your next source.</h3>
        <p>{language.teaser}</p>
      </div>
    </section>
  );
}

function QuizMode({ chapter, language, onOpenChapter, onSaveScore, savedScore }) {
  const questions = useMemo(
    () => createQuizQuestions(chapter, language),
    [chapter, language],
  );
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  useEffect(() => {
    setAnswers({});
    setResult(null);
  }, [chapter.number, language.id]);

  const answerCount = Object.keys(answers).length;
  const chapterIndex = language.chapters.findIndex((item) => item.number === chapter.number);

  const submitQuiz = () => {
    if (answerCount !== questions.length) return;
    const correct = questions.reduce(
      (total, item, index) => total + (answers[index] === item.correctIndex ? 1 : 0),
      0,
    );
    const percentage = Math.round((correct / questions.length) * 100);
    setResult({ correct, percentage });
    onSaveScore(percentage);
  };

  return (
    <section className="quiz-mode">
      <header className="tool-page-header">
        <div>
          <p className="eyebrow">Chapter Challenge</p>
          <h3>{language.name} Quiz · {chapter.title}</h3>
        </div>
        <div className="quiz-summary">
          <span><Trophy size={18} /> Best {savedScore?.best ?? 0}%</span>
          <span>{savedScore?.attempts ?? 0} attempts</span>
        </div>
      </header>

      <div className="quiz-chapter-nav">
        <button
          disabled={chapterIndex <= 0}
          onClick={() => onOpenChapter(language.chapters[chapterIndex - 1])}
          type="button"
        >
          <ArrowLeft size={17} /> Previous chapter
        </button>
        <span>{chapter.number} / {language.chapters.length}</span>
        <button
          disabled={chapterIndex >= language.chapters.length - 1}
          onClick={() => onOpenChapter(language.chapters[chapterIndex + 1])}
          type="button"
        >
          Next chapter <ArrowRight size={17} />
        </button>
      </div>

      <div className="quiz-list">
        {questions.map((item, questionIndex) => (
          <article className="quiz-question" key={item.prompt}>
            <div className="quiz-question-head">
              <span>{questionIndex + 1}</span>
              <div>
                <small>{item.difficulty}</small>
                <h4>{item.prompt}</h4>
              </div>
            </div>
            {item.code && <SyntaxBlock code={item.code} compact languageId={language.id} />}
            <div className="quiz-options">
              {item.options.map((option, optionIndex) => {
                const isChosen = answers[questionIndex] === optionIndex;
                const showCorrect = result && optionIndex === item.correctIndex;
                const showWrong = result && isChosen && optionIndex !== item.correctIndex;
                return (
                  <button
                    className={`${isChosen ? 'is-chosen' : ''} ${showCorrect ? 'is-correct' : ''} ${showWrong ? 'is-wrong' : ''}`}
                    disabled={Boolean(result)}
                    key={option}
                    onClick={() => setAnswers((current) => ({ ...current, [questionIndex]: optionIndex }))}
                    type="button"
                  >
                    <span>{String.fromCharCode(65 + optionIndex)}</span>
                    {option}
                  </button>
                );
              })}
            </div>
          </article>
        ))}
      </div>

      <div className="quiz-submit-bar">
        <div>
          <span>{answerCount} of {questions.length} answered</span>
          {result && <strong>{result.correct}/{questions.length} correct · {result.percentage}%</strong>}
        </div>
        {result ? (
          <button onClick={() => { setAnswers({}); setResult(null); }} type="button">
            <RotateCcw size={18} /> Try again
          </button>
        ) : (
          <button disabled={answerCount !== questions.length} onClick={submitQuiz} type="button">
            <CheckCircle2 size={18} /> Check answers
          </button>
        )}
      </div>
    </section>
  );
}

function CodePlayground({ chapter, draft, language, onChangeDraft }) {
  const fallbackDraft = useMemo(() => ({
    code: getPlaygroundTemplate(language.id),
    stdin: '',
  }), [language.id]);
  const currentDraft = draft ?? fallbackDraft;
  const [output, setOutput] = useState('Ready.');
  const [isRunning, setIsRunning] = useState(false);
  const [isOnline, setIsOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const updateConnection = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', updateConnection);
    window.addEventListener('offline', updateConnection);
    return () => {
      window.removeEventListener('online', updateConnection);
      window.removeEventListener('offline', updateConnection);
    };
  }, []);

  useEffect(() => {
    setOutput('Ready.');
  }, [language.id]);

  const updateDraft = (changes) => onChangeDraft({ ...currentDraft, ...changes });

  const runCode = async () => {
    if (!isOnline) {
      setOutput('Offline: your draft is saved. Connect to the internet to compile and run it.');
      return;
    }

    setIsRunning(true);
    setOutput('Compiling...');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch('https://wandbox.org/api/compile.json', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: currentDraft.code,
          compiler: language.id === 'java' ? 'openjdk-jdk-21+35' : 'gcc-13.2.0-c',
          stdin: currentDraft.stdin,
        }),
        signal: controller.signal,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || `Compiler returned ${response.status}`);

      const sections = [
        data.compiler_message && `Compiler:\n${data.compiler_message.trim()}`,
        data.program_output && `Output:\n${data.program_output.trimEnd()}`,
        data.program_error && `Runtime error:\n${data.program_error.trim()}`,
      ].filter(Boolean);
      setOutput(sections.join('\n\n') || `Program finished with status ${data.status}.`);
    } catch (error) {
      setOutput(error.name === 'AbortError'
        ? 'The compiler took too long to respond. Try again.'
        : `Could not run the code. Your draft is still saved.\n${error.message}`);
    } finally {
      window.clearTimeout(timeout);
      setIsRunning(false);
    }
  };

  return (
    <section className="playground-page">
      <header className="tool-page-header">
        <div>
          <p className="eyebrow">Edit. Run. Learn.</p>
          <h3>{language.name} Playground</h3>
        </div>
        <span className={`connection-status ${isOnline ? 'is-online' : ''}`}>
          <i /> {isOnline ? 'Online compiler' : 'Offline draft'}
        </span>
      </header>

      <div className="playground-toolbar">
        <strong>{language.id === 'java' ? 'Main.java' : 'main.c'}</strong>
        <div>
          <button onClick={() => updateDraft({ code: chapter.example })} type="button">
            <BookOpen size={17} /> Load chapter example
          </button>
          <button onClick={() => updateDraft({ code: fallbackDraft.code, stdin: '' })} type="button">
            <RotateCcw size={17} /> Reset
          </button>
          <button className="run-button" disabled={isRunning} onClick={runCode} type="button">
            <Play size={17} fill="currentColor" /> {isRunning ? 'Running' : 'Run'}
          </button>
        </div>
      </div>

      <div className="playground-grid">
        <label className="editor-panel">
          <span>Code</span>
          <textarea
            aria-label={`${language.name} code editor`}
            onChange={(event) => updateDraft({ code: event.target.value })}
            spellCheck="false"
            value={currentDraft.code}
          />
        </label>
        <div className="runner-side">
          <label className="stdin-panel">
            <span>Input</span>
            <textarea
              aria-label="Program standard input"
              onChange={(event) => updateDraft({ stdin: event.target.value })}
              placeholder="Input supplied to scanf or Scanner..."
              spellCheck="false"
              value={currentDraft.stdin}
            />
          </label>
          <div className="output-panel">
            <span>Console</span>
            <pre aria-live="polite">{output}</pre>
          </div>
        </div>
      </div>
    </section>
  );
}

function highlightC(code) {
  const escaped = escapeHtml(code);
  const pattern =
    /(^\s*#.*$)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\/\/.*$|\/\*[\s\S]*?\*\/)|(\b(?:auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while|FILE|NULL)\b)|(\b\d+(?:\.\d+)?(?:[uUlLfF]+)?\b)|(\b[A-Za-z_]\w*(?=\s*\())/gm;

  return escaped.replace(pattern, (match, preprocessor, string, comment, keyword, number, fn) => {
    if (preprocessor) return `<span class="tok-pre">${preprocessor}</span>`;
    if (string) return `<span class="tok-str">${string}</span>`;
    if (comment) return `<span class="tok-com">${comment}</span>`;
    if (keyword) return `<span class="tok-kw">${keyword}</span>`;
    if (number) return `<span class="tok-num">${number}</span>`;
    if (fn) return `<span class="tok-fn">${fn}</span>`;
    return match;
  });
}

function highlightJava(code) {
  const escaped = escapeHtml(code);
  const pattern =
    /(@[A-Za-z_]\w*)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*')|(\/\/.*$|\/\*[\s\S]*?\*\/)|(\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|goto|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|void|volatile|while|true|false|null|var|record|sealed|permits|yield)\b)|(\b\d+(?:\.\d+)?(?:[lLfFdD]+)?\b)|(\b[A-Za-z_]\w*(?=\s*\())/gm;

  return escaped.replace(pattern, (match, annotation, string, comment, keyword, number, fn) => {
    if (annotation) return `<span class="tok-pre">${annotation}</span>`;
    if (string) return `<span class="tok-str">${string}</span>`;
    if (comment) return `<span class="tok-com">${comment}</span>`;
    if (keyword) return `<span class="tok-kw">${keyword}</span>`;
    if (number) return `<span class="tok-num">${number}</span>`;
    if (fn) return `<span class="tok-fn">${fn}</span>`;
    return match;
  });
}

function highlightCode(code, languageId) {
  return languageId === 'java' ? highlightJava(code) : highlightC(code);
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function getCodeExplanationPoints(code, idea, languageId = 'c') {
  const checks = [
    [/System\.out\.(?:print|println|printf)\s*\(/, '`System.out` writes program output. `println` adds a new line, while `printf` gives precise formatting control.'],
    [/\bclass\s+[A-Za-z_]/, 'A `class` groups state and behavior into a reusable type; objects are created from that blueprint.'],
    [/\bnew\s+[A-Za-z_]/, '`new` creates an object and returns the reference used to reach it.'],
    [/\bextends\b/, '`extends` creates an inheritance relationship so a child can reuse and specialize parent behavior.'],
    [/\bimplements\b/, '`implements` promises that the class supplies the operations declared by an interface.'],
    [/\btry\s*\{/, '`try` surrounds work that may fail; a matching `catch` decides how that failure is handled.'],
    [/\bcatch\s*\(/, '`catch` receives a specific exception, allowing the program to recover or report useful context.'],
    [/\bsynchronized\b/, '`synchronized` protects shared state so only one thread at a time enters the guarded section.'],
    [/\bThread\b|ExecutorService/, 'Threading is used because this work may run concurrently; shared state and cleanup need deliberate coordination.'],
    [/java\.util\.|\bList<|\bSet<|\bMap</, 'A Java collection stores groups of objects behind a clear contract such as ordered values, unique values, or key-value pairs.'],
    [/try\s*\([^)]/, 'Try-with-resources closes owned resources automatically, including when an exception interrupts the normal path.'],
    [/scanf\s*\(/, '`scanf()` is used to take input from the user; `&` gives the variable address so C can store the typed value there.'],
    [/printf\s*\(/, '`printf()` shows output on the screen; format symbols like `%d`, `%f`, and `%s` decide how values are printed.'],
    [/\bif\s*\(/, '`if` checks a condition. The code inside it runs only when the condition is true.'],
    [/\belse\b/, '`else` gives the program another path when the `if` condition is false.'],
    [/\bswitch\s*\(/, '`switch` is used for exact choices, like menu numbers or command codes.'],
    [/\bcase\b/, '`case` labels are the possible choices inside a `switch`. `break` stops the next case from running accidentally.'],
    [/\bfor\s*\(/, '`for` is used when you know how many times the loop should run, such as array indexes or fixed repetitions.'],
    [/\bwhile\s*\(/, '`while` repeats as long as its condition remains true. It is useful when the stopping point depends on input or events.'],
    [/\bdo\s*\{/, '`do-while` runs once before checking the condition, which is useful for menus.'],
    [/\bbreak\b/, '`break` immediately comes out of the nearest loop or `switch`, so it is useful after finding what you need.'],
    [/\bcontinue\b/, '`continue` skips the rest of the current loop turn and jumps to the next repetition.'],
    [/for\s*\([^)]*\)\s*\{\s*for\s*\(/s, 'Nested loops mean the inner loop completes fully for every single turn of the outer loop.'],
    [/for\s*\([^;]+,[^;]+;[^;]+;[^,]+,[^)]+\)/, 'Multiple initialization/update in a `for` loop lets two variables move together in one loop header.'],
    [/\breturn\b/, '`return` sends a value back from a function or ends `main()` cleanly.'],
    [/\*/, 'Pointer logic appears here. `*` can access the value at an address when used with a pointer.'],
    [/&[A-Za-z_]/, '`&` gives the address of a variable, commonly needed by `scanf()` and pointer-based functions.'],
    [/\[[^\]]*\]/, 'Array brackets `[]` store or access many values using index positions.'],
    [/\bstruct\b/, '`struct` groups related values into one record, such as a student, book, or shape.'],
    [/->/, '`->` accesses a structure field through a pointer. It means “go to this address, then use this field.”'],
    [/#define/, '`#define` creates a preprocessor constant or macro before compilation starts.'],
    [/#ifndef|#endif|#ifdef/, 'Preprocessor guards prevent repeated inclusion or choose code depending on the build condition.'],
    [/\bFILE\b|fopen\s*\(|fclose\s*\(|fgetc\s*\(|fputc\s*\(|fprintf\s*\(/, 'File functions are used to open, read/write, and close files so data can stay after the program ends.'],
    [/\bargc\b|\bargv\b/, '`argc` and `argv` let the program receive values from the command line.'],
    [/<<|>>|&|\||\^|~/, 'Bitwise operators work directly on individual bits, useful for flags, masks, and low-level settings.'],
    [/\benum\b/, '`enum` gives readable names to integer states or choices.'],
    [/\bunion\b/, '`union` lets different fields share the same memory space, so only one stored meaning should be active at a time.'],
    [/\bfork\s*\(/, '`fork()` creates a child process. Parent and child both continue, but receive different return values.'],
    [/\bgetpid\s*\(/, '`getpid()` returns the current Linux process ID.'],
    [/\bsignal\s*\(/, '`signal()` connects a signal, like Ctrl+C, to a handler function.'],
    [/\bpause\s*\(/, '`pause()` makes the process wait until a signal arrives.'],
  ];

  const points = [idea];

  const cOnlyExplanations = [
    '`scanf()`',
    'Pointer logic',
    '`&` gives',
    '`struct`',
    '`->`',
    '`#define`',
    'Preprocessor guards',
    'File functions',
    '`argc` and `argv`',
    '`fork()`',
    '`getpid()`',
    '`signal()`',
    '`pause()`',
  ];

  checks.forEach(([pattern, explanation]) => {
    if (languageId === 'java' && cOnlyExplanations.some((start) => explanation.startsWith(start))) {
      return;
    }
    if (pattern.test(code) && !points.includes(explanation)) {
      points.push(explanation);
    }
  });

  return points.slice(0, 4);
}

function getTopicExample(chapterNumber, topic) {
  const key = `${chapterNumber}:${topic.toLowerCase()}`;
  const examples = {
    '1:what is c': `printf("C is fast and close to hardware\\n");`,
    '1:character set': `char grade = 'A';
int count = 10;
printf("%c %d\\n", grade, count);`,
    '1:constants, variables, keywords': `const int MAX_MARKS = 100;
int marks = 87;`,
    '1:variable names': `int student_marks = 95;
int rollNo = 12;`,
    '1:first program': `#include <stdio.h>

int main(void) {
  printf("Hello C\\n");
  return 0;
}`,
    '1:compilation and execution': `/* Save as app.c
   Compile: gcc app.c -o app
   Run: ./app */`,
    '1:input and arithmetic': `int a, b;
scanf("%d %d", &a, &b);
printf("Sum = %d\\n", a + b);`,
    '2:if': `if (age >= 18) {
  printf("Adult\\n");
}`,
    '2:if-else': `if (n % 2 == 0) {
  printf("Even\\n");
} else {
  printf("Odd\\n");
}`,
    '2:nested decisions': `if (age >= 18) {
  if (hasId) printf("Allowed\\n");
}`,
    '2:logical operators': `if (marks >= 50 && attendance >= 75) {
  printf("Exam allowed\\n");
}`,
    '2:else-if ladder': `if (marks >= 90) printf("A\\n");
else if (marks >= 75) printf("B\\n");
else printf("C\\n");`,
    '2:conditional operator': `printf("%s\\n", age >= 18 ? "Adult" : "Minor");`,
    '3:while loop': `while (n <= 5) {
  printf("%d\\n", n);
  n++;
}`,
    '3:for loop': `for (int i = 1; i <= 5; i++) {
  printf("%d\\n", i);
}`,
    '3:nested loops': `for (int row = 1; row <= 3; row++) {
  for (int col = 1; col <= 3; col++)
    printf("* ");
  printf("\\n");
}`,
    '3:multiple initialisations': `for (int i = 1, j = 5; i <= 5; i++, j--) {
  printf("%d %d\\n", i, j);
}`,
    '3:break': `for (int i = 0; i < 5; i++) {
  if (a[i] == target) break;
}`,
    '3:continue': `for (int n = 1; n <= 10; n++) {
  if (n % 2 != 0) continue;
  printf("%d\\n", n);
}`,
    '3:do-while': `do {
  scanf("%d", &choice);
} while (choice != 0);`,
    '4:switch': `switch (choice) {
  case 1: printf("Add\\n"); break;
  default: printf("Invalid\\n");
}`,
    '4:case labels': `case 'A':
  printf("Excellent\\n");
  break;`,
    '4:break in switch': `case 2:
  printf("View\\n");
  break;`,
    '4:default': `default:
  printf("No matching option\\n");`,
    '4:switch vs if-else': `if (marks >= 50) printf("Pass\\n");
switch (choice) { case 1: printf("Menu\\n"); }`,
    '4:goto': `goto end;
end:
printf("Finished\\n");`,
    '5:functions': `int add(int a, int b) {
  return a + b;
}`,
    '5:passing values': `int result = add(4, 5);`,
    '5:scope': `void test(void) {
  int local = 10;
}`,
    '5:prototypes': `int add(int, int);
int add(int a, int b) { return a + b; }`,
    '5:call by value/reference style': `void update(int *x) {
  *x = 50;
}`,
    '5:pointers': `int x = 10;
int *p = &x;
printf("%d\\n", *p);`,
    '5:recursion': `int fact(int n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}`,
    '6:short, int, long': `short s = 10;
long population = 9000000L;`,
    '6:signed and unsigned': `unsigned int count = 25;
signed int balance = -10;`,
    '6:char signedness': `unsigned char code = 255;`,
    '6:float and double': `double average = total / 3.0;`,
    '6:auto storage': `void demo(void) {
  auto int x = 5;
}`,
    '6:register storage': `register int i;
for (i = 0; i < 10; i++) { }`,
    '6:static and extern': `static int calls = 0;
extern int score;`,
    '7:macro expansion': `#define PI 3.14159`,
    '7:macros with arguments': `#define SQUARE(x) ((x) * (x))`,
    '7:macros vs functions': `int square(int x) {
  return x * x;
}`,
    '7:file inclusion': `#include <stdio.h>
#include "student.h"`,
    '7:conditional compilation': `#ifdef DEBUG
printf("Debug mode\\n");
#endif`,
    '7:#undef and #pragma': `#undef LIMIT
#pragma once`,
    '8:one-dimensional arrays': `int marks[3] = {80, 75, 90};`,
    '8:initialization': `int a[] = {1, 2, 3, 4};`,
    '8:bounds checking': `if (i >= 0 && i < size) {
  printf("%d\\n", a[i]);
}`,
    '8:passing array elements': `show(marks[0]);`,
    '8:pointers and arrays': `int *p = marks;
printf("%d\\n", *(p + 1));`,
    '8:two-dimensional arrays': `int matrix[2][2] = {{1, 2}, {3, 4}};`,
    '8:array of pointers': `char *names[] = {"C", "Java"};`,
    '9:strings': `char name[] = "Asha";`,
    '9:pointers and strings': `char *title = "C Notes";`,
    '9:strlen': `printf("%zu\\n", strlen(name));`,
    '9:strcpy': `strcpy(copy, name);`,
    '9:strcat': `strcat(fullName, lastName);`,
    '9:strcmp': `if (strcmp(a, b) == 0) printf("Same\\n");`,
    '9:2d char arrays vs pointer arrays': `char cities[3][20];
char *langs[] = {"C", "Java"};`,
    '10:why structures': `struct Student s;`,
    '10:declaring structures': `struct Student {
  int rollNo;
  char name[30];
};`,
    '10:accessing elements': `s.rollNo = 1;
ptr->rollNo = 2;`,
    '10:memory layout': `printf("%zu\\n", sizeof(struct Student));`,
    '10:array of structures': `struct Student list[5];`,
    '10:nested structures': `struct Employee {
  struct Address address;
};`,
    '10:uses': `struct Book book = {101, "C Guide"};`,
    '11:types of i/o': `printf("Output\\n");
scanf("%d", &n);`,
    '11:printf': `printf("Marks = %d\\n", marks);`,
    '11:scanf': `scanf("%d", &age);`,
    '11:sprintf and sscanf': `sprintf(text, "Age %d", age);
sscanf(text, "Age %d", &age);`,
    '11:getchar and putchar': `char ch = getchar();
putchar(ch);`,
    '11:gets/puts awareness': `fgets(name, sizeof name, stdin);
printf("%s\\n", name);`,
    '12:file operations': `FILE *fp = fopen("a.txt", "r");
fclose(fp);`,
    '12:fopen': `FILE *fp = fopen("notes.txt", "w");
if (fp == NULL) printf("Error\\n");`,
    '12:reading and writing': `fputs("Hello\\n", fp);
fgets(line, sizeof line, fp);`,
    '12:file modes': `fopen("log.txt", "a");`,
    '12:newline handling': `line[strcspn(line, "\\n")] = '\\0';`,
    '12:text vs binary': `fopen("data.bin", "wb");`,
    '12:low-level i/o': `read(fd, buffer, sizeof buffer);`,
    '13:argc and argv': `int main(int argc, char *argv[]) {
  printf("%s\\n", argv[0]);
}`,
    '13:read/write errors': `if (fp == NULL) {
  perror("open failed");
}`,
    '13:standard devices': `fprintf(stderr, "Error\\n");`,
    '13:output redirection': `printf("Send this to a file\\n");`,
    '13:input redirection': `while (scanf("%d", &n) == 1) { }`,
    '13:both ways at once': `/* ./app < input.txt > output.txt */`,
    '14:bitwise operators': `flags = flags | 1u;`,
    '14:one’s complement': `mask = ~mask;`,
    '14:right shift': `n = n >> 1;`,
    '14:left shift': `n = n << 1;`,
    '14:and': `if (flags & READ) printf("read\\n");`,
    '14:or': `flags = flags | WRITE;`,
    '14:xor': `flags = flags ^ EXECUTE;`,
    '15:enum': `enum Status { PENDING, DONE };`,
    '15:typedef': `typedef unsigned int uint;`,
    '15:typecasting': `avg = (float)total / count;`,
    '15:bit fields': `struct Flags {
  unsigned read : 1;
};`,
    '15:function pointers': `int (*op)(int, int) = add;`,
    '15:functions returning pointers': `int *getValue(void) {
  static int x = 10;
  return &x;
}`,
    '15:variable arguments': `printf("%d %s\\n", age, name);`,
    '15:unions': `union Data { int i; float f; };`,
    '16:windows types and typedef': `typedef unsigned long DWORD;`,
    '16:pointers in 32-bit world': `printf("%zu\\n", sizeof(void *));`,
    '16:memory management': `void *p = malloc(100);
free(p);`,
    '16:device access': `/* Use OS API handles for devices */`,
    '16:dos vs windows model': `/* DOS: step by step
   Windows: wait for events */`,
    '16:event-driven model': `while (GetMessage(&msg, NULL, 0, 0)) {
  DispatchMessage(&msg);
}`,
    '16:first windows program': `int WINAPI WinMain(...) {
  return 0;
}`,
    '17:message box': `MessageBox(NULL, "Hello", "Title", MB_OK);`,
    '17:creating windows': `CreateWindow(className, title, style, x, y, w, h, NULL, NULL, hInst, NULL);`,
    '17:multiple windows': `HWND first, second;`,
    '17:real-world window': `ShowWindow(hwnd, SW_SHOW);
UpdateWindow(hwnd);`,
    '17:reacting to messages': `case WM_PAINT:
  /* redraw */
  break;`,
    '17:program instances': `printf("Instance handle identifies this run\\n");`,
    '18:device independent drawing': `/* Draw through a device context */`,
    '18:device context': `HDC hdc = GetDC(hwnd);`,
    '18:pens and brushes': `HPEN pen;
HBRUSH brush;`,
    '18:shapes': `Rectangle(hdc, 10, 10, 100, 60);`,
    '18:mouse capture': `SetCapture(hwnd);`,
    '18:bitmaps': `/* Load and draw bitmap resource */`,
    '18:timers and animation': `SetTimer(hwnd, 1, 100, NULL);`,
    '19:hardware interaction': `printf("Use OS APIs for hardware access\\n");`,
    '19:dos perspective': `/* Old DOS allowed more direct access */`,
    '19:windows perspective': `/* Windows uses drivers and handles */`,
    '19:storage devices': `struct Sector { int number; char data[512]; };`,
    '19:keyboard communication': `scanf(" %c", &key);`,
    '19:dynamic linking': `/* Load library, find function, call, unload */`,
    '19:hooks and keylogging awareness': `printf("Monitor input only with consent\\n");`,
    '20:what is linux': `printf("Linux runs processes and system calls\\n");`,
    '20:c under linux': `/* gcc app.c -o app */`,
    '20:hello linux': `printf("Hello Linux\\n");`,
    '20:processes': `printf("PID=%d\\n", getpid());`,
    '20:parent and child': `pid_t pid = fork();`,
    '20:zombies and orphans': `waitpid(pid, NULL, 0);`,
    '21:signals': `signal(SIGINT, handler);`,
    '21:multiple signals': `signal(SIGINT, handler);
signal(SIGTERM, handler);`,
    '21:common handler': `void handler(int sig) {
  printf("%d\\n", sig);
}`,
    '21:blocking signals': `sigprocmask(SIG_BLOCK, &set, NULL);`,
    '21:event-driven programming': `while (1) pause();`,
    '21:where next': `/* Next: sockets, threads, files, processes */`,
    '22:1. getting started': `int marks;
scanf("%d", &marks);
printf("%d\\n", marks);`,
    '22:2. decisions': `if (marks >= 50) printf("Pass\\n");
else printf("Try again\\n");`,
    '22:3. loops': `for (int i = 1; i <= 5; i++)
  printf("%d\\n", i);`,
    '22:4. switch': `switch (choice) {
  case 1: printf("Start\\n"); break;
  default: printf("Invalid\\n");
}`,
    '22:5. functions & pointers': `void update(int *x) {
  *x = *x + 1;
}`,
    '22:6. data types': `double average = total / 3.0;`,
    '22:7. preprocessor': `#define MAX 100
#include <stdio.h>`,
    '22:8. arrays': `int a[3] = {1, 2, 3};`,
    '22:9. strings': `char name[20] = "C";`,
    '22:10. structures': `struct Student { int rollNo; };`,
    '22:11. console i/o': `printf("%d", n);
scanf("%d", &n);`,
    '22:12. file i/o': `FILE *fp = fopen("a.txt", "r");
fclose(fp);`,
    '22:13. more i/o': `int main(int argc, char *argv[]) { }`,
    '22:14. bits': `flags |= 1u << 2;`,
    '22:15. misc features': `enum Status { PENDING, DONE };`,
    '22:16-19. windows & hardware': `while (eventAvailable()) {
  handleEvent();
}`,
    '22:20-21. linux': `pid_t pid = fork();
signal(SIGINT, handler);`,
  };

  return examples[key] ?? getFallbackTopicExample(topic);
}

function getFallbackTopicExample(topic) {
  const name = topic.replace(/[^A-Za-z0-9]+/g, '_').toLowerCase();
  return `/* Example idea for ${topic} */
printf("Practice ${name}\\n");`;
}

function flattenNotes(chapters) {
  return chapters.flatMap((chapter) =>
    chapter.topics.map(([topic, point]) => ({
      chapter,
      topic,
      point,
      text: `${chapter.number} ${chapter.title} ${topic} ${point} ${chapter.trap} ${chapter.practice}`.toLowerCase(),
    })),
  );
}

function buildAnswer(question, fallbackChapter, topicMatches, language) {
  const lower = question.toLowerCase();
  const chapterNumber = lower.match(/chapter\s*(\d+)|\bch\s*(\d+)/)?.slice(1).find(Boolean);
  const directChapter = chapterNumber
    ? language.chapters.find((chapter) => chapter.number === Number(chapterNumber))
    : null;

  const exactTopic = topicMatches.find((item) => lower.includes(item.topic.toLowerCase()));
  const keywordMatch = topicMatches
    .map((item) => ({
      item,
      score: lower
        .split(/\W+/)
        .filter((word) => word.length > 2 && item.text.includes(word)).length,
    }))
    .sort((a, b) => b.score - a.score)[0];

  const match = exactTopic ?? (keywordMatch?.score > 0 ? keywordMatch.item : null);
  const chapter = directChapter ?? match?.chapter ?? fallbackChapter;

  if (
    lower.includes('coding question') ||
    lower.includes('programming question') ||
    lower.includes('question')
  ) {
    const questions = chapter.questions
      ?? (language.id === 'c' ? codingQuestionsByChapter[chapter.number] : []);
    return {
      chapter,
      match,
      text: questions.length
        ? `Here are 5 coding questions for Chapter ${chapter.number}: ${chapter.title}: ${questions.join(' ')}`
        : `I opened Chapter ${chapter.number}: ${chapter.title}. The coding questions section will appear at the end of the chapter notes.`,
    };
  }

  if (lower.includes('practice') || lower.includes('exercise')) {
    return {
      chapter,
      match,
      text: `Practice for ${chapter.title}: ${chapter.practice}`,
    };
  }

  if (lower.includes('trap') || lower.includes('mistake') || lower.includes('error')) {
    return {
      chapter,
      match,
      text: `Important trap from ${chapter.title}: ${chapter.trap}`,
    };
  }

  if (lower.includes('example') || lower.includes('code')) {
    const examples = chapter.programExamples
      ?? (language.id === 'c' ? programExamplesByChapter[chapter.number] : []);
    return {
      chapter,
      match,
      text: examples.length
        ? `I opened the Program Examples section for Chapter ${chapter.number}: ${chapter.title}. It has ${examples.length} visible examples with highlighted syntax.`
        : `Here is the tiny example section for ${chapter.title}. Read it line by line, then change one value and run it again.`,
    };
  }

  if (directChapter) {
    return {
      chapter,
      match,
      text: `Chapter ${chapter.number} is about ${chapter.title}. The main idea: ${chapter.hook}`,
    };
  }

  if (match) {
    return {
      chapter,
      match,
      text: `${match.topic} belongs to Chapter ${match.chapter.number}: ${match.chapter.title}. Short answer: ${match.point}`,
    };
  }

  return {
    chapter,
    match: null,
    text: `I could not find an exact topic, so I opened the current chapter: ${chapter.title}. Try a chapter number or a keyword from the topic table.`,
  };
}

function createSearchIndex(languageList) {
  return languageList.flatMap((language) => language.chapters.flatMap((chapter) => [
    {
      chapter,
      language,
      point: chapter.hook,
      text: `${language.name} ${chapter.number} ${chapter.title} ${chapter.hook}`.toLowerCase(),
      topic: null,
    },
    ...chapter.topics.map(([topic, point]) => ({
      chapter,
      language,
      point,
      text: `${language.name} ${chapter.number} ${chapter.title} ${topic} ${point}`.toLowerCase(),
      topic,
    })),
  ]));
}

function searchNotes(index, term) {
  const words = term.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) return [];

  return index
    .map((item) => ({
      ...item,
      score: words.reduce((total, word) => total + (item.text.includes(word) ? 1 : 0), 0),
    }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.chapter.number - b.chapter.number)
    .slice(0, 12);
}

function getBookmarkedResults(bookmarks) {
  return readyLanguages.flatMap((language) => language.chapters
    .filter((chapter) => bookmarks[getChapterKey(language.id, chapter.number)])
    .map((chapter) => ({ chapter, language, point: chapter.hook, topic: null })));
}

function createQuizQuestions(chapter, language) {
  const topics = chapter.topics.slice(0, 5);
  const questions = topics.map(([topic, point], index) => {
    const distractors = topics
      .filter((_, otherIndex) => otherIndex !== index)
      .map(([, otherPoint]) => otherPoint);
    while (distractors.length < 3) {
      distractors.push(chapter.trap, chapter.hook, 'None of these descriptions matches the topic.');
    }
    const baseOptions = [point, ...distractors.slice(0, 3)];
    const rotation = index % baseOptions.length;
    const options = [...baseOptions.slice(rotation), ...baseOptions.slice(0, rotation)];
    return {
      correctIndex: options.indexOf(point),
      difficulty: getQuestionDifficulty(index),
      options,
      prompt: `Which explanation best matches “${topic}”?`,
    };
  });

  const outputExample = chapter.topics
    .map(([, , code]) => ({ code, output: predictLiteralOutput(code) }))
    .find((item) => item.output);

  if (outputExample && questions.length) {
    const correct = outputExample.output;
    const baseOptions = [correct, 'No output', 'Compilation error', 'It waits for input'];
    const options = [baseOptions[2], baseOptions[0], baseOptions[3], baseOptions[1]];
    questions[questions.length - 1] = {
      code: outputExample.code,
      correctIndex: options.indexOf(correct),
      difficulty: 'exam',
      options,
      prompt: `Predict the exact output of this ${language.name} snippet.`,
    };
  }

  return questions;
}

function predictLiteralOutput(code) {
  if (!code) return null;
  const outputCalls = code.match(/(?:puts|printf|System\.out\.(?:print|println|printf))\s*\(/g) ?? [];
  const literalPattern = /(?:puts|System\.out\.println)\(\s*"((?:\\.|[^"\\])*)"\s*\)\s*;/g;
  const matches = [...code.matchAll(literalPattern)];
  if (!matches.length || matches.length !== outputCalls.length) return null;

  return matches
    .map((match) => match[1]
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\\\/g, '\\'))
    .join('\n');
}

function getPlaygroundTemplate(languageId) {
  if (languageId === 'java') {
    return `import java.util.Scanner;

class Main {
  public static void main(String[] args) {
    Scanner input = new Scanner(System.in);
    System.out.print("Enter a number: ");
    int number = input.hasNextInt() ? input.nextInt() : 5;
    System.out.println("Square = " + number * number);
  }
}`;
  }

  return `#include <stdio.h>

int main(void) {
  int number = 5;
  printf("Enter a number: ");
  if (scanf("%d", &number) != 1) number = 5;
  printf("Square = %d\\n", number * number);
  return 0;
}`;
}

export default App;
