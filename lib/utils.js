'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isMessage = exports.isMessage = function isMessage(event) {
  return Boolean(event.type === 'message' && event.text.includes('ttt'));
};

var isMessageToChannel = exports.isMessageToChannel = function isMessageToChannel(message) {
  return typeof message.channel === 'string';
};