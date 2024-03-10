const Question = require('@entities/question.js'); 
const questionsData = require('@assets/questions');

function convertQuestions(questions) {
  return questions.map(q => new Question(q.question, q.answer));
}

function startGame(){
  const questions = convertQuestions(questionsData);
  console.log(questionsData);
}

module.exports = startGame;

