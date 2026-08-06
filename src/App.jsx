import { useMemo, useState } from 'react';
import {
  AlertTriangle,
  BookOpen,
  Boxes,
  CheckCircle2,
  ChevronDown,
  Code2,
  FileText,
  FlaskConical,
  Layers3,
  Library,
  Lightbulb,
  Search,
  Sparkles,
  TerminalSquare,
} from 'lucide-react';
import { cNotes, comingSoonLanguages } from './data/cNotes.js';

const languages = [cNotes, ...comingSoonLanguages];

function App() {
  const [activeLanguage, setActiveLanguage] = useState('c');
  const [query, setQuery] = useState('');
  const [activeChapter, setActiveChapter] = useState(1);

  const selectedLanguage = languages.find((language) => language.id === activeLanguage);
  const isReady = selectedLanguage.id === 'c';

  const filteredChapters = useMemo(() => {
    if (!isReady) return [];

    const needle = query.trim().toLowerCase();
    if (!needle) return cNotes.chapters;

    return cNotes.chapters.filter((chapter) => {
      const searchable = [
        chapter.title,
        chapter.hook,
        chapter.trap,
        chapter.practice,
        ...chapter.useIt,
        ...chapter.topics.flat(),
      ]
        .join(' ')
        .toLowerCase();

      return searchable.includes(needle);
    });
  }, [isReady, query]);

  const selectedChapter = filteredChapters.find((chapter) => chapter.number === activeChapter) ?? filteredChapters[0];

  const openChapter = (chapterNumber) => {
    setActiveChapter(chapterNumber);
    window.setTimeout(() => {
      document.getElementById('chapter-reader')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 50);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand-row">
          <div className="brand-mark" aria-hidden="true">
            <Code2 size={22} />
          </div>
          <div>
            <p className="eyebrow">Notes App</p>
            <h1>Code Notes Lab</h1>
          </div>
        </div>

        <div className="language-list" aria-label="Language list">
          {languages.map((language) => (
            <button
              className={`language-button ${activeLanguage === language.id ? 'is-active' : ''}`}
              key={language.id}
              onClick={() => {
                setActiveLanguage(language.id);
                setQuery('');
                setActiveChapter(1);
              }}
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
            <a href={cNotes.source.url} target="_blank" rel="noreferrer">
              {cNotes.source.label}
            </a>
          </div>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">Readable, practical, exam-friendly</p>
            <h2>{selectedLanguage.name} Notes</h2>
          </div>
          {isReady && (
            <label className="search-box">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search chapters, traps, examples..."
              />
            </label>
          )}
        </header>

        {!isReady ? (
          <ComingSoon language={selectedLanguage} />
        ) : (
          <div className="notes-grid">
            <nav className="chapter-rail" aria-label="C chapters">
              {filteredChapters.map((chapter) => (
                <button
                  className={`chapter-pill ${selectedChapter?.number === chapter.number ? 'is-current' : ''}`}
                  key={chapter.number}
                  onClick={() => openChapter(chapter.number)}
                  type="button"
                >
                  <span>{chapter.number.toString().padStart(2, '0')}</span>
                  {chapter.title}
                </button>
              ))}
            </nav>

            {selectedChapter ? <ChapterView chapter={selectedChapter} total={cNotes.chapters.length} /> : <EmptySearch />}
          </div>
        )}
      </section>
    </main>
  );
}

function ChapterView({ chapter, total }) {
  return (
    <article className="chapter-view" id="chapter-reader">
      <section className="chapter-hero">
        <div>
          <p className="chapter-index">Chapter {chapter.number} of {total}</p>
          <h3>{chapter.title}</h3>
          <p>{chapter.hook}</p>
        </div>
        <MemoryPoster chapter={chapter} />
      </section>

      <div className="quick-row">
        <InfoTile icon={<Layers3 />} label="Topics" value={chapter.topics.length} />
        <InfoTile icon={<CheckCircle2 />} label="Usable Points" value={chapter.useIt.length} />
        <InfoTile icon={<FlaskConical />} label="Practice" value="1 lab" />
        {chapter.legacy && <InfoTile icon={<Library />} label="Context" value="Legacy" />}
      </div>

      <section className="reader-band">
        <div className="section-heading">
          <Sparkles size={20} />
          <h4>Topic Map</h4>
        </div>
        <div className="topic-table">
          {chapter.topics.map(([topic, point], index) => (
            <details className="topic-row" key={topic} open={index < 3 || chapter.topics.length <= 5}>
              <summary>
                <span>{topic}</span>
                <ChevronDown size={18} />
              </summary>
              <p>{point}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="study-columns">
        <div className="reader-band">
          <div className="section-heading">
            <Lightbulb size={20} />
            <h4>Keep These</h4>
          </div>
          <ul className="clean-list">
            {chapter.useIt.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        <div className="reader-band danger">
          <div className="section-heading">
            <AlertTriangle size={20} />
            <h4>Trap Door</h4>
          </div>
          <p>{chapter.trap}</p>
        </div>
      </section>

      <section className="code-and-practice">
        <div className="code-panel">
          <div className="section-heading">
            <TerminalSquare size={20} />
            <h4>Tiny Example</h4>
          </div>
          <pre><code>{chapter.example}</code></pre>
        </div>

        <div className="practice-panel">
          <div className="section-heading">
            <BookOpen size={20} />
            <h4>Try This</h4>
          </div>
          <p>{chapter.practice}</p>
          <div className="energy-strip">{chapter.energy}</div>
        </div>
      </section>
    </article>
  );
}

function MemoryPoster({ chapter }) {
  const cells = ['main', 'data', 'loop', 'ptr', 'file', 'os'];

  return (
    <div className="memory-poster" aria-label={`Visual card for ${chapter.title}`}>
      <div className="poster-screen">
        <span>0x0{chapter.number}AF</span>
        <strong>{chapter.title.split(' ')[0]}</strong>
      </div>
      <div className="memory-grid">
        {cells.map((cell, index) => (
          <span className={index % 2 === chapter.number % 2 ? 'lit' : ''} key={cell}>
            {cell}
          </span>
        ))}
      </div>
      <Boxes size={28} />
    </div>
  );
}

function InfoTile({ icon, label, value }) {
  return (
    <div className="info-tile">
      {icon}
      <span>{label}</span>
      <strong>{value}</strong>
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

function EmptySearch() {
  return (
    <section className="empty-search">
      <Search size={34} />
      <h3>No matching chapter</h3>
      <p>Try searching for pointers, loops, files, arrays, signals, or input.</p>
    </section>
  );
}

export default App;
