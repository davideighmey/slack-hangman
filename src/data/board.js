const _ = require('lodash');

export const board = {};

export const players = [];

export const cell = [];

export function clearBoard() {
  _.forEach(board, (value) => {
    delete board[value];
  });
}
export function clearPlayers() {
  _.remove(players);
}
