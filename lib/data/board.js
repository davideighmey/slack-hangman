'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearBoard = clearBoard;
exports.clearPlayers = clearPlayers;
var _ = require('lodash');

var board = exports.board = {};

var players = exports.players = [];

var cell = exports.cell = [];

function clearBoard() {
  _.forEach(board, function (value) {
    delete board[value];
  });
}
function clearPlayers() {
  _.remove(players);
}