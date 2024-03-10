const Question = require('@entities/question');

const WebSocket = require('ws');

const questionsData = require('@assets/questions');

const Player = require('@entities/player');
const Room = require('@entities/room');

let rooms = [];
let clientIdCounter = 0;

function convertQuestions(questions) {
  return questions.map(q => new Question(q.question, q.answer));
}

function startGame(){
  const questions = convertQuestions(questionsData);
  console.log(questionsData);
}

function initialize(){
  // Create WebSocket server
  const wss = new WebSocket.Server({ port: 8080 });
  console.log('Game is initialized. Waiting for the players to join.');
  // Handle WebSocket connections
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      
    });
  
    ws.on('close', function () {
        
    });
  });
}



module.exports = initialize;

