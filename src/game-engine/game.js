import _ from 'lodash';

import { board, clearBoard, players, clearPlayers } from '../data/board';

let isGameInprogress = false;
let isChallengeInProgress = false;
let playersTurn;

export function add(space, user) {
  if (board[space]) {
    return 'bruhhhhhhhh that space is taken \n try again!';
  }
  if (isChallengeInProgress || !isGameInprogress) {
    return 'You can not add something unless there is a game going';
  }
  if (!players.includes(user)) {
    return 'You are not playing this game! wait until it is over.';
  }
  if (players.indexOf(user) !== playersTurn) {
    return 'It is not your turn';
  }
  if (space < 10 && space > 0) {
    if (players.indexOf(user) === 1) {
      board[space] = 'x';
      playersTurn = 0;
      return `<@${user}> places an X on spot ${space}`;
    }
    board[space] = 'o';
    playersTurn = 1;
    return `<@${user}> places an O on spot ${space}`;
  }
  return 'That is not a valid spot bruh bruh';
}

export function status() {
  if (isChallengeInProgress || !isGameInprogress) {
    return 'You can not check the status of an empty game';
  }
  if (_.isEmpty(board)) {
    return 'You dont have a board bruh bruh';
  }
  let currentStatus = 'These values are taken \n';
  _.forEach(board, (value, key) => {
    currentStatus += `${key} - ${value} \n`;
  });
  return currentStatus;
}

function diagonalWinner(currentBoard, value) {
  const diagonalWinner1 = {
    1: value,
    5: value,
    9: value,
  };
  const diagonalWinner2 = {
    3: value,
    5: value,
    7: value,
  };
  if (_.isMatch(currentBoard, diagonalWinner1) || _.isMatch(currentBoard, diagonalWinner2)) {
    return true;
  }
  return false;
}

function horizonalWinner(currentBoard, value) {
  const horizonalWinner1 = {
    1: value,
    2: value,
    3: value,
  };
  const horizonalWinner2 = {
    4: value,
    5: value,
    6: value,
  };
  const horizonalWinner3 = {
    7: value,
    8: value,
    9: value,
  };
  if (
    _.isMatch(currentBoard, horizonalWinner1) ||
    _.isMatch(currentBoard, horizonalWinner2) ||
    _.isMatch(currentBoard, horizonalWinner3)
  ) {
    return true;
  }
  return false;
}

function verticalWinner(currentBoard, value) {
  const verticalWinner1 = {
    1: value,
    4: value,
    7: value,
  };
  const verticalWinner2 = {
    2: value,
    5: value,
    7: value,
  };
  const verticalWinner3 = {
    3: value,
    6: value,
    9: value,
  };
  if (
    _.isMatch(currentBoard, verticalWinner1) ||
    _.isMatch(currentBoard, verticalWinner2) ||
    _.isMatch(currentBoard, verticalWinner3)
  ) {
    return true;
  }
  return false;
}

export function isWinner(user) {
  // check for winning
  if (diagonalWinner(board, 'o') || horizonalWinner(board, 'o') || verticalWinner(board, 'o')) {
    isGameInprogress = false;
    clearBoard();
    clearPlayers();
    return `WINNER WINNER CHICKEN DINNER <@${user}>`;
  } else if (
    diagonalWinner(board, 'x') ||
    horizonalWinner(board, 'x') ||
    verticalWinner(board, 'x')
  ) {
    isGameInprogress = false;
    clearBoard();
    clearPlayers();
    return `WINNER WINNER CHICKEN DINNER <@${user}>`;
  } else if (_.size(board) === 9) {
    isGameInprogress = false;
    clearBoard();
    clearPlayers();
    return '\n damnnnn the game is a tie!';
  }
  return '';
}

export function challengeUser(user) {
  if (isGameInprogress) {
    return 'There is already a game in progress';
  } else if (isChallengeInProgress) {
    return 'There is already a challenge in progress';
  }
  isChallengeInProgress = true;
  players.push(user);
  return 'You have started a challenge any takers?';
}

export function acceptChallenge(user) {
  if (isGameInprogress) {
    return 'There is already a game in progress';
  } else if (!isChallengeInProgress) {
    return 'There is no challenge in progress! You need to start one asap!!';
  } else if (players.indexOf(user) === 0) {
    return 'You can not play yourself!';
  } else if (players.length === 2) {
    return 'The game is full';
  }
  isGameInprogress = true;
  isChallengeInProgress = false;
  players.push(user);
  playersTurn = 0;
  return 'You have accepted the challenge! Let the game begin!!';
}

export function unknownCommand(user) {
  if (!players.includes(user)) {
    return 'You are not playing this game! wait until it is over.';
  }
  return 'That is an unknown command \n The commands are add 1-9 / quit / challenge / accept / status';
}

export function quit(user) {
  if (!players.includes(user)) {
    return 'You are not playing this game! wait until it is over.';
  }
  isGameInprogress = false;
  isChallengeInProgress = false;
  clearBoard();
  clearPlayers();
  return 'ya quit the game.. the game is now over.';
}
