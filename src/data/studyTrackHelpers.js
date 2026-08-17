export const lesson = (title, point, example, question, answer) => ({
  title,
  point,
  example,
  question,
  answer,
});

export const createChapter = ({ number, title, hook, lessons, trap, practice }) => {
  if (lessons.length !== 5) {
    throw new Error(`${title} must contain exactly five lessons.`);
  }

  return {
    number,
    title,
    hook,
    topics: lessons.map((item) => [item.title, item.point, item.example]),
    useIt: [
      'Read the idea, cover it, and explain it once in your own words.',
      'Work through the example by hand before checking the shown result.',
      'Finish the five practice questions without looking back at the topic table.',
    ],
    trap,
    example: lessons[0].example,
    practice,
    energy: 'Treat each topic as a small problem you can solve, not a paragraph you must memorise.',
    questions: lessons.map((item) => item.question),
    answers: lessons.map((item) => item.answer),
    programExamples: lessons.slice(0, 2).map((item) => ({
      title: `${item.title} Worked Example`,
      idea: item.point,
      code: item.example,
    })),
  };
};

export const createRevisionChapter = ({ number, title, hook, topics, plan, trap }) => ({
  number,
  title,
  hook,
  revisionOnly: true,
  topics,
  useIt: [
    'Recall the route names first, then fill in the details from memory.',
    'Mix calculations, diagrams, and explanation questions in one revision session.',
    'Keep a one-page mistake log and revisit it before starting another mock test.',
  ],
  trap,
  example: topics[0][2],
  practice: 'Choose one route below and rebuild its key diagram, procedure, and example without opening the chapter.',
  energy: 'Revision works when recall is active: close the notes, rebuild the idea, then check the missing pieces.',
  revisionPlan: plan,
});
