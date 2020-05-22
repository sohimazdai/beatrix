import { appAnalytics } from './Analytics';
import { logger } from './Logger';

export function handleError(e: Error, customMessage?: string) {
  const message = customMessage
    ? `${customMessage}.\n${e.message}`
    : e.message;

  alert(message);
  logger(message);

  appAnalytics.sendEventWithProps(appAnalytics.events.ERROR, {
    message: message
  })
}

export function handleErrorSilently(message) {
  appAnalytics.sendEventWithProps(appAnalytics.events.ERROR, {
    message: message
  })
}
