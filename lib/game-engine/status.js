'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _board = require('../data/board');

function status() {
  return _board.board.toString();
}

exports.default = status;