'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.status = status;
exports.isWinner = isWinner;
exports.challengeUser = challengeUser;
exports.acceptChallenge = acceptChallenge;
exports.unknownCommand = unknownCommand;
exports.quit = quit;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _board = require('../data/board');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isGameInprogress = false;
var isChallengeInProgress = false;
var playersTurn = void 0;

function add(space, user) {
  if (isChallengeInProgress || !isGameInprogress) {
    return 'You can not add something unless there is a game going';
  }
  if (!_board.players.includes(user)) {
    return 'You are not playing this game! wait until it is over.';
  }
  if (_board.players.indexOf(user) !== playersTurn) {
    return 'It is not your turn';
  }
  if (space < 10 && space > 0) {
    if (_board.players.indexOf(user) === 1) {
      _board.board[space] = 'x';
      playersTurn = 0;
      return '<@' + user + '> places an X on spot ' + space;
    }
    _board.board[space] = 'o';
    playersTurn = 1;
    return '<@' + user + '> places an O on spot ' + space;
  }
  return 'That is not a valid spot bruh bruh';
}

function status() {
  if (isChallengeInProgress || !isGameInprogress) {
    return 'You can not check the status of an empty game';
  }
  if (_lodash2.default.isEmpty(_board.board)) {
    return 'You dont have a board bruh bruh';
  }
  var currentStatus = 'These values are taken \n';
  _lodash2.default.forEach(_board.board, function (value, key) {
    currentStatus += key + ' - ' + value + ' \n';
  });
  return currentStatus;
}

function diagonalWinner(currBoard) {
  if (_lodash2.default.includes(currBoard, { 1: 'o' }) && _lodash2.default.includes(currBoard, { 5: 'o' }) && _lodash2.default.includes(currBoard, { 9: 'o' }) || _lodash2.default.includes(currBoard, { 3: 'o' }) && _lodash2.default.includes(currBoard, { 5: 'o' }) && _lodash2.default.includes(currBoard, { 7: 'o' })) {
    return 'o';
  } else if (_lodash2.default.includes(currBoard, { 1: 'x' }) && _lodash2.default.includes(currBoard, { 5: 'x' }) && _lodash2.default.includes(currBoard, { 9: 'x' }) || _lodash2.default.includes(currBoard, { 3: 'x' }) && _lodash2.default.includes(currBoard, { 5: 'x' }) && _lodash2.default.includes(currBoard, { 7: 'x' })) {
    return 'x';
  }
  return null;
}

function horizonalWinner(currBoard) {
  if (_lodash2.default.includes(currBoard, { 1: 'o' }) && _lodash2.default.includes(currBoard, { 2: 'o' }) && _lodash2.default.includes(currBoard, { 3: 'o' }) || _lodash2.default.includes(currBoard, { 4: 'o' }) && _lodash2.default.includes(currBoard, { 5: 'o' }) && _lodash2.default.includes(currBoard, { 6: 'o' }) || _lodash2.default.includes(currBoard, { 7: 'o' }) && _lodash2.default.includes(currBoard, { 8: 'o' }) && _lodash2.default.includes(currBoard, { 9: 'o' })) {
    return 'o';
  } else if (_lodash2.default.includes(currBoard, { 1: 'x' }) && _lodash2.default.includes(currBoard, { 2: 'x' }) && _lodash2.default.includes(currBoard, { 3: 'x' }) || _lodash2.default.includes(currBoard, { 4: 'x' }) && _lodash2.default.includes(currBoard, { 5: 'x' }) && _lodash2.default.includes(currBoard, { 6: 'x' }) || _lodash2.default.includes(currBoard, { 7: 'x' }) && _lodash2.default.includes(currBoard, { 8: 'x' }) && _lodash2.default.includes(currBoard, { 9: 'x' })) {
    return 'x';
  }
  return null;
}

function verticalWinner(currentBoard) {
  if (_lodash2.default.includes(currentBoard, { 1: 'o' }) && _lodash2.default.includes(currentBoard, { 4: 'o' }) && _lodash2.default.includes(currentBoard, { 7: 'o' }) || _lodash2.default.includes(currentBoard, { 2: 'o' }) && _lodash2.default.includes(currentBoard, { 5: 'o' }) && _lodash2.default.includes(currentBoard, { 8: 'o' }) || _lodash2.default.includes(currentBoard, { 3: 'o' }) && _lodash2.default.includes(currentBoard, { 6: 'o' }) && _lodash2.default.includes(currentBoard, { 9: 'o' })) {
    return 'o';
  } else if (_lodash2.default.includes(currentBoard, { 1: 'x' }) && _lodash2.default.includes(currentBoard, { 4: 'x' }) && _lodash2.default.includes(currentBoard, { 7: 'x' }) || _lodash2.default.includes(currentBoard, { 2: 'x' }) && _lodash2.default.includes(currentBoard, { 5: 'x' }) && _lodash2.default.includes(currentBoard, { 8: 'x' }) || _lodash2.default.includes(currentBoard, { 3: 'x' }) && _lodash2.default.includes(currentBoard, { 6: 'x' }) && _lodash2.default.includes(currentBoard, { 9: 'x' })) {
    return 'x';
  }
  return null;
}

function isWinner(user) {
  // check for winning
  console.log('here');
  if (diagonalWinner(_board.board) === 'o' || horizonalWinner(_board.board) === 'o' || verticalWinner(_board.board) === 'o') {
    isGameInprogress = false;
    (0, _board.clearBoard)();
    (0, _board.clearPlayers)();
    console.log('here2');
    return 'WINNER WINNER CHICKEN DINNER <@' + user + '>';
  } else if (diagonalWinner(_board.board) === 'x' || horizonalWinner(_board.board) === 'x' || verticalWinner(_board.board) === 'x') {
    console.log('here3');
    isGameInprogress = false;
    (0, _board.clearBoard)();
    (0, _board.clearPlayers)();
    return 'WINNER WINNER CHICKEN DINNER <@' + user + '>';
  } else if (_lodash2.default.size(_board.board) === 9) {
    console.log('here4');
    isGameInprogress = false;
    (0, _board.clearBoard)();
    (0, _board.clearPlayers)();
    return 'damnnnn the game is  a tie!';
  }
  return ' bitch';
}

function challengeUser(user) {
  if (isGameInprogress) {
    return 'There is already a game in progress';
  } else if (isChallengeInProgress) {
    return 'There is already a challenge in progress';
  }
  isChallengeInProgress = true;
  _board.players.push(user);
  return 'You have started a challenge any takers?';
}

function acceptChallenge(user) {
  if (isGameInprogress) {
    return 'There is already a game in progress';
  } else if (!isChallengeInProgress) {
    return 'There is no challenge in progress! You need to start one asap!!';
  } else if (_board.players.indexOf(user) === 0) {
    return 'You can not play yourself!';
  } else if (_board.players.length === 2) {
    return 'The game is full';
  }
  isGameInprogress = true;
  isChallengeInProgress = false;
  _board.players.push(user);
  playersTurn = 0;
  return 'You have accepted the challenge! Let the game begin!!';
}

function unknownCommand(user) {
  if (!_board.players.includes(user)) {
    return 'You are not playing this game! wait until it is over.';
  }
  return 'That is an unknown command \n The commands are add 1-9 / quit / challenge / accept / status';
}

function quit(user) {
  if (!_board.players.includes(user)) {
    return 'You are not playing this game! wait until it is over.';
  }
  isGameInprogress = false;
  isChallengeInProgress = false;
  (0, _board.clearBoard)();
  (0, _board.clearPlayers)();
  return 'ya quit the game.. the game is now over.';
}