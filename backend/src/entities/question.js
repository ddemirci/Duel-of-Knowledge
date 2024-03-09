class Question {
    constructor(questionText, answer) {
      this.questionText = questionText;
      this.answer = answer;
    }
  
    // Check if a provided answer is correct
    checkAnswer(userAnswer) {
      return userAnswer === this.answer;
    }
}

module.exports = Question;