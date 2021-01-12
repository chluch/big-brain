// Returns the answer text of a question
const formatAnswer = (q) => {
  let isSingleChoice = true;
  if (q.questionType === 'multiple-choice-question') {
    isSingleChoice = false;
  }
  let index;
  if (isSingleChoice) {
    index = q.correctAnswer.replace('choice-', '');
    return q.choices[index].choice;
  }
  index = q.correctAnswer.map((ans) => ans.replace('choice-', ''));
  return index.map((i) => q.choices[i].choice).join(', ');
};

export default formatAnswer;
