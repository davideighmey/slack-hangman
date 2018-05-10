#!/usr/bin/env node
'use strict';

var _ticTacToe = require('./ticTacToe');

var _ticTacToe2 = _interopRequireDefault(_ticTacToe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!process.env.ticTacToeToken) {
  process.exit(1);
}
var bot = (0, _ticTacToe2.default)(process.env.ticTacToeToken);
bot.start();