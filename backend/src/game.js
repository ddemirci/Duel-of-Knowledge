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

const questionSet = convertQuestions(questionsData);

function findOrCreateRoomForClient() {
  // Check if there's an available room with less than two players
  let availableRoom = rooms.find(room => !room.isFull());

  if (availableRoom) {
    // If an available room is found, return it
    console.log('Available room found. Room number', availableRoom.id)
    return availableRoom;
  } else {
    // If no available room is found, create a new room
    console.log('No available room found.');
    
    const newRoom = new Room(rooms.length + 1, getRandomQuestions(questionSet.slice(), 5));
    rooms.push(newRoom);
    console.log('Room ' + newRoom.id + ' created.');
    return newRoom;
  }
}

function getRandomQuestions(questions, count) {
  const selectedQuestions = [];
  let totalQuestions = questions.length;

  // Randomly select count questions
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * totalQuestions);
    selectedQuestions.push(questions[randomIndex]);
    // Remove the selected question from the array to prevent duplicates
    questions.splice(randomIndex, 1);
    totalQuestions--;
  }

  return selectedQuestions;
}

function sendMessageToClient(client, type, content) {
  const message = JSON.stringify({ type, content });
  client.send(message);
}

function initialize(){
  // Create WebSocket server
  const wss = new WebSocket.Server({ port: 8080 });
  console.log('Game is initialized. Waiting for the players to join.');

  webSocketHandler(wss);
  
}

// Function to start the game for a room
function startGame(room) {
  console.log('Game is starting for the room', room.id)
  room.currentQuestionIndex = 0;
  room.sendCurrentQuestion();
}

function webSocketHandler(wss){
  wss.on('connection', function connection(ws) {
    // Client arrives
    const clientId = ++clientIdCounter;
    sendMessageToClient(ws, MESSAGE_TYPES.INTRODUCTION, 'Welcome to the question game! Your ID is ' + clientId);

    // Find or create a room for the client
    let room = findOrCreateRoomForClient();
    room.addPlayer(new Player(clientId, ws));

    // Check if there are two players in the room and the game has not been started, start the game
    if (room.isFull() && room.currentQuestionIndex === -1) {
      startGame(room);
    }

    // For receiving messages (answers) from the client
    ws.on('message', function incoming(message) {
      
    });
  
    // When the client leaves the game
    ws.on('close', function () {
        
    });
  });
}

module.exports = initialize;

