'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _client = require('@slack/client');

var _game = require('./game-engine/game');

var _utils = require('./utils');

var ticTacToe = function ticTacToe(botToken) {
  var rtm = new _client.RtmClient(botToken);
  var web = new _client.WebClient(botToken);

  rtm.on(_client.RTM_EVENTS.MESSAGE, function (event) {
    // add switch for each case then default
    if ((0, _utils.isMessage)(event)) {
      var msgOptions = {
        as_user: true
      };
      var text = event.text,
          user = event.user;

      var msg = void 0;
      if (text.includes('add')) {
        var addedText = text.replace('ttt add ', '');
        msg = (0, _game.add)(Number(addedText), user);
        msg += (0, _game.isWinner)();
      } else if (text.includes('challenge')) {
        msg = (0, _game.challengeUser)(user);
      } else if (text.includes('accept')) {
        msg = (0, _game.acceptChallenge)(user);
      } else if (text.includes('status')) {
        msg = (0, _game.status)(user);
      } else if (text.includes('quit')) {
        msg = (0, _game.quit)(user);
      } else {
        msg = (0, _game.unknownCommand)();
      }

      web.chat.postMessage(event.channel, msg, msgOptions);
    }
  });

  return {
    rtm: rtm,
    web: web,
    start: function start() {
      rtm.start();
    }
  };
};

exports.default = ticTacToe;