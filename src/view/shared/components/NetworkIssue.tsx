import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { StyleSheet, Text } from 'react-native';
import { IStorage } from '../../../model/IStorage';
import { i18nGet } from '../../../localisation/Translate';
import { COLOR } from '../../../constant/Color';
import { IApp } from '../../../model/IApp';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { appAnalytics } from '../../../app/Analytics';
import { createAppPingAction } from '../../../store/service/app/AppPingSaga';

interface Props {
  app: IApp
  ping: () => void
};

function Component(props: Props) {
  const [hidden, setHidden] = useState(false);
  const { app, ping } = props;
  const isNetworkFine = app.networkConnected;
  const isServerFine = app.serverAvailable;

  useEffect(() => {
    setHidden(isServerFine && isNetworkFine)
  }, [app]);

  if (hidden) {
    return null;
  }

  const onPlankClick = () => {
    appAnalytics.sendEventWithProps(appAnalytics.events.FOOD_SEARCH_UNAVAILABLE, {
      because: isServerFine ? 'networkError' : 'serverError'
    });
    () => setHidden(true);
    ping();
  }

  return (
    <TouchableOpacity onPress={onPlankClick}>
      {
        isNetworkFine && !isServerFine &&
        <Text style={styles.networking}>
          {i18nGet('server_is_unavailable')}
        </Text>
      }
      {
        !isNetworkFine && (
          <Text style={styles.networking}>
            {i18nGet('network_is_unavailable')}
          </Text>
        )
      }
    </TouchableOpacity>
  );
}

export const NetworkIssue = connect(
  (state: IStorage) => ({
    app: state.app,
  }),
  (dispatch) => ({
    ping: () => dispatch(createAppPingAction()),
  })
)(Component);

const styles = StyleSheet.create({
  networking: {
    backgroundColor: COLOR.TEXT_DIMGRAY,
    padding: 16,
    textAlign: 'center',
    alignSelf: 'center',
    color: COLOR.PRIMARY_WHITE,
    borderRadius: 10,
  },
})
