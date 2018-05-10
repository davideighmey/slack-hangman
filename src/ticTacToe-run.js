#!/usr/bin/env node
import ticTacToe from './ticTacToe';

if (!process.env.ticTacToeToken) {
  process.exit(1);
}
const bot = ticTacToe(process.env.ticTacToeToken);
bot.start();
