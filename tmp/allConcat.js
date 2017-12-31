var Player = require('./../js/pig-dice.js').playerModule;
var Game = require('./../js/pig-dice.js').gameModule;

$(document).ready(function(){
  var game = new Game();

  $("#total1").text(game.player1.totalScore);
  $("#total2").text(game.player2.totalScore);

  var displayTurn = function() {
    $("#player1").slideToggle();
    $("#player2").slideToggle();
  };

  var rollButton = function() {
    game.processRoll();
    $("#running-score").text(game.runningScore);

    if(game.roll === 1) {
      displayTurn();
    }
    $("#roll-result").text(game.roll);
  };

  var holdButton = function() {
    game.hold();

    $("#total1").text(game.player1.totalScore);
    $("#total2").text(game.player2.totalScore);
    displayTurn();
  };

  $("#roll-dice").click(function() {
    rollButton();
  });

  $("#hold").click(function() {
    holdButton();
  });

  $("#computer-turn").click(function() {
    rollButton();
    if (game.roll != 1) {
      rollButton();
    }
    if (game.roll != 1) {
      holdButton();
    }
  });
});
