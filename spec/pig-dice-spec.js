var Player = require('./../js/pig-dice.js').playerModule;
var Game = require('./../js/pig-dice.js').gameModule;

describe('Game', function() {
  //roll
  var game = new Game();
  it('should return a random number between 1 and 6', function() {
    spyOn(Math, "random").and.returnValue(0.1);
    game.processRoll();
    expect(game.roll).toEqual(1);
  });

  it('should pass turn to other player if a 1 is rolled', function() {
    spyOn(Math, "random").and.returnValue(0.1);
    var originalPlayer = game.currentPlayer();
    game.processRoll();
    expect(game.currentPlayer()).not.toEqual(originalPlayer);
  });

  it('should otherwise add number rolled to the running score', function() {
    spyOn(Math, "random").and.returnValue(0.2);
    var originalPlayer = game.currentPlayer();
    game.runningScore = 0;
    game.processRoll();
    expect(game.currentPlayer()).toEqual(originalPlayer);
    expect(game.runningScore).toEqual(2);
  });

  //hold
  it('should pass turn to other player', function() {
    var originalPlayer = game.currentPlayer();
    game.hold();
    expect(game.currentPlayer()).not.toEqual(originalPlayer);
  })

  it('should add running score to current players total', function() {
    game.whoseTurn = 1;
    game.player1.totalScore = 0;
    game.runningScore = 5;
    game.hold();
    expect(game.player1.totalScore).toEqual(5);
  });

  it('should restart game when one players score reaches 100', function() {
    game.player1.totalScore = 100;
    game.runningScore = 8;
    game.roll = 2;
    game.hold();
    expect(game.player1.totalScore).toEqual(0);
    expect(game.runningScore).toEqual(0);
  });

});
