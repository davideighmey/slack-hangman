export const isMessage = event => Boolean(event.type === 'message' && event.text.includes('ttt'));

export const isMessageToChannel = message => typeof message.channel === 'string';
