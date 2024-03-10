class Player {
    constructor(id, socket) {
      this.id = id;
      this.socket = socket;
      this.answered = false;
    }
  
    // Mark player as answered
    markAnswered() {
      this.answered = true;
    }
  
    // Reset player's answered status
    resetAnswered() {
      this.answered = false;
    }
}

module.exports = Player;