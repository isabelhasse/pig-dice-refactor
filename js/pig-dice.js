function Player(name) {
  this.totalScore = 0;
  this.name = name;
}

function Game() {
  this.roll = 0;
  this.runningScore = 0;
  this.player1 = new Player('player1');
  this.player2 = new Player('player2');
  this.whoseTurn = 1;
}

Game.prototype.currentPlayer = function() {
  if (this.whoseTurn === 1) {
    return this.player1;
  } else {
    return this.player2;
  }
};

Game.prototype.resetValues = function() {

};

Game.prototype.nextPlayer = function() {
  if (this.whoseTurn === 1) {
    this.whoseTurn = 2;
  } else {
    this.whoseTurn = 1;
  }
  this.runningScore = 0;
};

Game.prototype.processRoll = function() {
  this.roll = Math.floor((Math.random() * 6) + 1);
  if (this.roll === 1) {
    this.nextPlayer();
  } else {
    this.runningScore += this.roll;
  }
};

Game.prototype.hold = function() {
  this.currentPlayer().totalScore += this.runningScore;
  if (this.currentPlayer().totalScore >= 100) {
    alert(this.currentPlayer().name + "is the winner!!!!");
    this.player1.totalScore = 0;
    this.player2.totalScore = 0;
  }
  this.nextPlayer();
};

exports.playerModule = Player;
exports.gameModule = Game;
