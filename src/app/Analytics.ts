import * as Amplitude from 'expo-analytics-amplitude';
import Variables from './Variables';
import { Platform } from 'react-native';

export const appAnalytics = {
  init: (): Promise<void> => {
    console.log('::amplitude initializing');

    return Amplitude.initialize(Variables.amplitudeApiKey)
      .then(() => console.log('::amplitude inited'))
      .catch((e) => console.log('::amplitude initializing error: ', e.message))
  },
  setUser: (userId: string) => {
    console.log('::amplitude user is setting now');

    Amplitude.setUserId(userId)
      .then(() => Amplitude.setUserProperties({
        'OS': Platform.OS
      }))
      .then(() => console.log('::amplitude user setted'))
      .catch((e) => console.log('::amplitude user error: ', e.message))
  },
  sendEvent: (eventName: string) => {
    console.log('::amplitude trying to send event: ', eventName);

    Amplitude.logEvent(eventName)
      .then(() => console.log('::amplitude send event: ', eventName))
      .catch((e) => console.log('::amplitude sending error: ', e.message))
  },
  sendEventWithProps: (eventName: string, properties: any) => {
    console.log('::amplitude trying to send event: ', eventName);
    console.log('::amplitude event properties: ', properties);

    Amplitude.logEventWithProperties(eventName, properties)
      .then(() => console.log('::amplitude send event: ', eventName))
      .catch((e) => console.log('::amplitude sending error: ', e.message))
  },
  events: {
    EMAIL_LOGIN: 'Email login',
    EMAIL_SIGN_UP: 'Email sign up',
    GOOGLE_SIGN_IN: 'Google sign in',
    REMEMBER_PASSWORD: 'Remember password',
    LOG_OUT: 'Log out',

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
