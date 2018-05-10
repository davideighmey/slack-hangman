import { RtmClient, WebClient, RTM_EVENTS } from '@slack/client';
import {
  add,
  status,
  isWinner,
  challengeUser,
  acceptChallenge,
  unknownCommand,
  quit,
} from './game-engine/game';
import { isMessage } from './utils';

const ticTacToe = (botToken) => {
  const rtm = new RtmClient(botToken);
  const web = new WebClient(botToken);

  rtm.on(RTM_EVENTS.MESSAGE, (event) => {
    // add switch for each case then default
    if (isMessage(event)) {
      const msgOptions = {
        as_user: true,
      };
      const { text, user } = event;
      let msg;
      if (text.includes('add')) {
        const addedText = text.replace('ttt add ', '');
        msg = add(Number(addedText), user);
        msg += isWinner();
      } else if (text.includes('challenge')) {
        msg = challengeUser(user);
      } else if (text.includes('accept')) {
        msg = acceptChallenge(user);
      } else if (text.includes('status')) {
        msg = status(user);
      } else if (text.includes('quit')) {
        msg = quit(user);
      } else {
        msg = unknownCommand(user);
      }

      web.chat.postMessage(event.channel, msg, msgOptions);
    }
  });

  return {
    rtm,
    web,
    start() {
      rtm.start();
    },
  };
};

export default ticTacToe;
