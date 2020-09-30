import { isDev } from './Variables';

export function logger(messageTitle?: any, message?: any) {
  if (isDev()) {
    if (message) {
      messageTitle
        ? console.log(messageTitle, message)
        : console.log(message)
    } else if (messageTitle) {
      message
        ? console.log(messageTitle, message)
        : console.log(messageTitle)
    }
  }
}

export function logError(e: string) {
  if (isDev()) {
    console.log('🍄\n' + e + '\n🍄')
  }
}
