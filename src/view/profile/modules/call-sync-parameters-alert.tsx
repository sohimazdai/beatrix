import { Alert } from 'react-native';

import { i18nGet } from '../../../localisation/Translate';

export function callSyncParametersAlert(cb: Function) {
  Alert.alert(
    i18nGet('we_will_recalculating_your_notes'),
    i18nGet('please_do_not_close_app'),
    [
      { text: i18nGet('cancel') },
      { text: i18nGet('got_it'), onPress: () => cb() },
    ]
  );
}
