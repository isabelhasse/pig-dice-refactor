(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
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

},{"./../js/pig-dice.js":1}]},{},[2]);
