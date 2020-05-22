import * as Amplitude from 'expo-analytics-amplitude';
import Variables from './Variables';
import { Platform } from 'react-native';
import { logger } from './Logger';

export const appAnalytics = {
  init: (): Promise<void> => {
    logger('::amplitude initializing');

    return Amplitude.initialize(Variables.amplitudeApiKey)
      .then(() => logger('::amplitude inited'))
      .catch((e) => logger('::amplitude initializing error: ', e.message))
  },
  setUser: (userId: string) => {
    logger('::amplitude user is setting now');

    Amplitude.setUserId(userId)
      .then(() => Amplitude.setUserProperties({
        'OS': Platform.OS
      }))
      .then(() => logger('::amplitude user setted'))
      .catch((e) => logger('::amplitude user error: ', e.message))
  },
  sendEvent: (eventName: string) => {
    logger('::amplitude trying to send event: ', eventName);

    Amplitude.logEvent(eventName)
      .then(() => logger('::amplitude send event: ', eventName))
      .catch((e) => logger('::amplitude sending error: ', e.message))
  },
  sendEventWithProps: (eventName: string, properties: any) => {
    logger('::amplitude trying to send event: ', eventName);
    logger('::amplitude event properties: ', properties);

    Amplitude.logEventWithProperties(eventName, properties)
      .then(() => logger('::amplitude send event: ', eventName))
      .catch((e) => logger('::amplitude sending error: ', e.message))
  },
  events: {
    ERROR: 'Error',
    
    EMAIL_LOGIN: 'Email login',
    EMAIL_SIGN_UP: 'Email sign up',
    GOOGLE_SIGN_IN: 'Google sign in',
    REMEMBER_PASSWORD: 'Remember password',
    LOG_OUT: 'Log out',
    USER_BY_INSTALLATION_ID: 'User by installation id',

    NOTELIST_SEEN: 'NoteList seen',
    CHARTS_SEEN: 'Charts seen',
    PROFILE_SEEN: 'Profile seen',
    CHART_DOT_SELECTED: 'Chart dot selected',

    ANOTHER_CHART_DATE_SEEN: 'Another chart date seen',
    CHART_CALENDAR_DATE_SET: 'Chart calendar date set',

    NOTE_CREATED: 'Note created',
    NOTE_UPDATED: 'Note updated',
    NOTE_DELETED: 'Note deleted',
    NOTE_DATE_CHANGED: 'Note date changed',
    NOTE_TIME_CHANGED: 'Note time changed',
    
    SHEDULE_UPDATED: 'Shedule updated',
    TARGET_GLYCEMIA_UPDATED: 'Target glycemia updated',
  }
}
