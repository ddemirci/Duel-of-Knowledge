const WebSocket = require('ws');
const readline = require('readline');

const path = require('path');
require('module-alias/register');

const moduleAlias = require('module-alias');
moduleAlias.addAlias('@shared', path.join(__dirname, '../../shared'));

const MESSAGE_TYPE = require('@shared/message-type');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Parse the received message
function parseMessage(message) {
    try {
      return JSON.parse(message);
    } catch (error) {
      return { type: MESSAGE_TYPE.OTHER, content: message };
    }
}

const ws = new WebSocket('ws://localhost:8080');


ws.on('open', function open() {
    console.log('Connected to the backend');
  });
  
ws.on('message', function incoming(message) {
    const parsedMessage = parseMessage(message.toString());
  
    switch (parsedMessage.type) {
      case MESSAGE_TYPE.INTRODUCTION:
        console.log(parsedMessage.content); // Log the introduction message
        break;
      case MESSAGE_TYPE.QUESTION:
        console.log('Received question: ' + parsedMessage.content); // Log the question message
        rl.question('Your answer: ', (answer) => {
          ws.send(answer);
        });
        break;
      case MESSAGE_TYPE.OTHER:
        console.log('Received other message: ' + parsedMessage.content); // Log other types of messages
        break;
      default:
        console.log('Received unknown message type');
    }
});