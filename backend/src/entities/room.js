const MESSAGE_TYPE = require('@shared/message-type');

class Room {
    constructor(id, questions) {
      this.id = id;
      this.players = [];
      this.questions = questions;
      this.currentQuestionIndex = -1;
    }
  
    // Add a player to the room
    addPlayer(player) {
      this.players.push(player);
    }
  
    // Check if the room is full (has two players)
    isFull() {
      return this.numPlayers() === 2;
    }
  
    // Get the number of players in the room
    numPlayers() {
      return this.players.length;
    }

    // Check if all players in the room have answered the current question
    allPlayersAnswered() {
        return this.players.every(player => player.answered);
    }

    allQuestionsAsked(){
        return this.currentQuestionIndex + 1 === this.questions.length;
    }

    // Send the current question to all players in the room
    sendCurrentQuestion() {
        console.log('Sending the questions')
        const currentQuestion = this.questions[this.currentQuestionIndex];
        this.players.forEach(player => {
            this.sendMessageToClient(player.socket, MESSAGE_TYPE.QUESTION, 'Question: ' + currentQuestion.questionText.toString())
            player.resetAnswered();
        });
    }
  
    // Increment current question index
    nextQuestion() {
      this.currentQuestionIndex++;
    }

    // Define a function to send messages to clients
     sendMessageToClient(client, type, content) {
      const message = JSON.stringify({ type, content });
      client.send(message);
    }
  }

module.exports = Room;