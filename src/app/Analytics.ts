import * as Amplitude from 'expo-analytics-amplitude';
import Variables from './Variables';
import { Platform } from 'react-native';
import { logger } from './Logger';
import Constants from 'expo-constants';
import { IUserDiabetesProperties } from '../model/IUserDiabetesProperties';

export interface IAmplitudeUserProperties extends IUserDiabetesProperties {
  locale?: string
};

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
        'OS': Platform.OS,
        'DeviceYearClass': Constants.deviceYearClass,
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

  setUserProperties: (properties: IAmplitudeUserProperties) => {
    logger('::amplitude user properties is setting now');

    Amplitude.setUserProperties(properties)
      .then(() => logger('::amplitude user properties setted'))
      .catch((e) => logger('::amplitude user properties error: ', e.message))
  },

  events: {
    ERROR: 'Error',

    EMAIL_LOGIN: 'Email login',
    EMAIL_SIGN_UP: 'Email sign up',
    GOOGLE_SIGN_IN: 'Google sign in',
    REMEMBER_PASSWORD: 'Remember password',
    LOG_OUT: 'Log out',
    USER_BY_INSTALLATION_ID: 'User by installation id',
    //ONBOARDING
    ONBOARDING_SEEN: 'Onboarding seen',
    ONBOARDING_COMPLETED: 'Onboarding completed',
    //DASHBOARD
    DASHBOARD_SEEN: 'Dashboard seen',
    HBA1C_CALCULATED: 'HBA1C calculated',
    //NOTELIST
    NOTELIST_SEEN: 'NoteList seen',
    //PROFILE
    PROFILE_SEEN: 'Profile seen',
    DIABETES_PROFILE_SEEN: 'Profile diabetes seen',
    SETTINGS_SEEN: 'Settings seen',
    SHEDULE_UPDATED: 'Shedule updated',
    USER_DIABETES_PROPERTIES_UPDATED: 'User diabetes properties updated',
    EXPORT_DATA: "Export data",
    EXPORT_SEEN: 'Export seen',
    //CHART
    CHARTS_SEEN: 'Charts seen',
    CHART_DOT_SELECTED: 'Chart dot selected',
    ANOTHER_CHART_DATE_SEEN: 'Another chart date seen',
    CHART_CALENDAR_DATE_SET: 'Chart calendar date set',
    DAY_CHART_INFO_OPEN: 'Day chart info open',
    MONTH_CHART_INFO_OPEN: 'Month chart info open',
    THREE_MONTH_CHART_INFO_OPEN: 'Three month chart info open',
    //NOTES
    NOTE_CREATED: 'Note created',
    NOTE_UPDATED: 'Note updated',
    NOTE_DELETED: 'Note deleted',
    NOTE_DATE_CHANGED: 'Note date changed',
    NOTE_TIME_CHANGED: 'Note time changed',
    //TOOLTIPS
    TOOLTIP_SHOWN: 'Tooltip shown',
    //HANDLED ERRORS
    SERVER_IS_NOT_AVAILABLE: 'Server is not available',
    //AUTH
    AUTH_SCREEN_SEEN: 'Auth screen seen',
    GOOGLE_SIGN_IN_PRESSED: 'Google sign in pressed',
    //LINK OPENED
    SETTINGS_INSULIN_LINK_OPENED: 'Settings insulin link opened',
  }
}
