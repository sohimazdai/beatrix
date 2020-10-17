import * as Amplitude from 'expo-analytics-amplitude';
import { Platform } from 'react-native';

import Constants from 'expo-constants';
import { IUserPropertiesShedule } from '../model/IUserPropertiesShedule';
import { IUserDiabetesProperties } from '../model/IUserDiabetesProperties';

import Variables from './Variables';
import { logger } from './Logger';

export interface IAmplitudeUserProperties extends IUserDiabetesProperties {
  shedule?: IUserPropertiesShedule

  locale?: string

  favorites?: number
};

export let section = '';

export const appAnalytics = {
  init: (): Promise<void> => {
    logger('::amplitude initializing');

    return Amplitude.initialize(Variables.amplitudeApiKey)
      .then(() => logger('::amplitude inited'))
      .catch((e) => logger('::amplitude initializing error: ', e.message))
  },
  setUser: (userId: string) => {
    logger('::amplitude user is setting now', { userId });

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

    Amplitude.logEventWithProperties(eventName, { section })
      .then(() => logger('::amplitude send event: ', eventName))
      .catch((e) => logger('::amplitude sending error: ', e.message))
  },
  sendEventWithProps: (eventName: string, properties: any) => {
    logger('::amplitude trying to send event: ', eventName);
    logger('::amplitude event properties: ', properties);

    Amplitude.logEventWithProperties(eventName, {
      ...properties,
      ...{ section },
    })
      .then(() => logger('::amplitude send event: ', eventName))
      .catch((e) => logger('::amplitude sending error: ', e.message))
  },

  setUserProperties: (properties: IAmplitudeUserProperties) => {
    logger('::amplitude user properties is setting now');

    Amplitude.setUserProperties(properties)
      .then(() => logger('::amplitude user properties setted'))
      .catch((e) => logger('::amplitude user properties error: ', e.message))
  },

  setSection: (sectionName: AnalyticsSections) => {
    // NOTHING TO DO TODO: remove or change
  },

  events: {
    ERROR: 'Error',

    EMAIL_LOGIN: 'Email login',
    EMAIL_SIGN_UP: 'Email sign up',
    GOOGLE_SIGN_IN: 'Google sign in',
    REMEMBER_PASSWORD: 'Remember password',
    LOG_OUT: 'Log out',
    USER_BY_INSTALLATION_ID: 'User by installation id',
    //USER
    USER_SYNCED: 'User synced',
    //ONBOARDING
    ONBOARDING_SEEN: 'Onboarding seen',
    ONBOARDING_COMPLETED: 'Onboarding completed',
    //DASHBOARD
    DASHBOARD_SEEN: 'Dashboard seen',
    HBA1C_CALCULATED: 'HBA1C calculated',
    NAVIGATE_FROM_SIDE_MENU: 'Navigated from side menu',
    //NOTELIST
    NOTELIST_SEEN: 'NoteList seen',
    NOTE_EDITOR_SEEN: 'NoteEditor seen',
    //PROFILE
    PROFILE_SEEN: 'Profile seen',
    DIABETES_PROFILE_SEEN: 'Profile diabetes seen',
    SETTINGS_SEEN: 'Settings seen',
    SHEDULE_UPDATED: 'Shedule updated',
    USER_DIABETES_PROPERTIES_UPDATED: 'User diabetes properties updated',
    EXPORT_DATA: "Export data",
    EXPORT_SEEN: 'Export seen',
    EXPORT_PRESS: 'Export press',
    //CHART
    CHARTS_SEEN: 'Charts seen',
    CHART_DOT_SELECTED: 'Chart dot selected',
    CHART_DOT_CLICKED: 'Chart dot clicked',
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
    NOTES_SYNCED: 'Notes synced',
    ADD_NOTE_CLICKED: 'Add note clicked',
    //TOOLTIPS
    TOOLTIP_SHOWN: 'Tooltip shown',
    //HANDLED ERRORS
    SERVER_IS_NOT_AVAILABLE: 'Server is not available',
    //AUTH
    AUTH_SCREEN_SEEN: 'Auth screen seen',
    GOOGLE_SIGN_IN_PRESSED: 'Google sign in pressed',
    RESOLVER_PRESSED: 'Resolver pressed',
    //LINK OPENED
    SETTINGS_INSULIN_LINK_OPENED: 'Settings insulin link opened',
    //NOTE_EDITOR
    NOTE_EDITOR_INPUT_POPUP_CLOSED: 'Note editor input popup closed',
    // GENERAL
    PHONE_CONNECTION_STATUS_CHANGE: 'Phone connection status change',
    SERVER_AVAILIBILITY_STATUS_CHANGE: 'Server availibility status change',
    // PENDING
    PENDNG_DATA_SYNCED: 'Pending data synced',
    // TAG_LIST
    ADD_TAG_TO_NOTE: 'Tag added to note',
    CREATE_TAG: 'Tag cretead',
    DELETE_TAG: 'Tag deleted',
    // FILTER
    CLEAR_FILTER: 'Filter cleared',
    APPLY_FILTER: 'Filter applied',
    // FOOD
    ADD_FOOD_HANDLY: 'Food add handly',
    ADD_FOOD_AUTO: 'Food add auto',
    ADD_FOOD_TO_FAVORITES: 'Food add to favrites',
    REMOVE_FOOD_FROM_FAVORITES: 'Food remove from favrites',
    FOOD_BARCODE_GOT: 'Food searched by barcode',
    FOOD_FAVORITES_FETCHED: 'Food favorites fetched',
    FOOD_GOT_BY_ID: 'Food got by id',
    FOOD_SEARCH: 'Food searched',
    FOOD_CARD_SEEN: 'Food card screen seen',
    FOOD_CREATION_SEEN: 'Food creation screen seen',
    FOOD_SCREEN_SEEN: 'Food screen seen',
    FOOD_BARCODE_SCREEN_SEEN: 'Food barcode screen seen',
    FOOD_BARCODE_START_SCANING: 'Food barcode start scanning',
    FOOD_BARCODE_SUCCESS_SCANING: 'Food barcode success scanning',
    FOOD_ADD_TO_NOTE: 'Food added to note',
    FOOD_REMOVE_FROM_NOTE: 'Food removed from note',
    FOOD_SEARCH_UNAVAILABLE: 'Food search unavailable click',
  }
}


export enum AnalyticsSections {
  AUTH = 'auth',
  ONBOARDING = 'onboarding',
  DASHBOARD = 'dashboard',
  PROFILE = 'profile',
  NOTES = 'notes',
  CHARTS = 'charts',
} 
