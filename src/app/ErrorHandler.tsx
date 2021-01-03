import { appAnalytics } from './Analytics';
import { logError, logger } from './Logger';

export function handleError(e: Error, customMessage?: string) {
  const message = customMessage
    ? `${customMessage}.\n${e.message}`
    : JSON.stringify(e.message);

  alert(message);
  logger(message);

  appAnalytics.sendEventWithProps(appAnalytics.events.ERROR, {
    message: message
  })
}

export function handleErrorSilently(message: Error | string, type?: string) {
  let messageToSend = JSON.stringify(message);

  appAnalytics.sendEventWithProps(
    appAnalytics.events.ERROR,
    {
      message: messageToSend,
      type: type,
    },
  );

  logError(messageToSend + ':::' + type)
}
