import Variables, { isDev } from './Variables';

export function logger(messageTitle?: any, message?: any) {
  if (isDev()) {
    console.log(messageTitle, message)
  }
}
