import React from 'react';
import { connect } from 'react-redux';

import { View } from 'react-native';
import { IStorage } from '../model/IStorage';
import { selectAreTherePendings } from '../store/selector/are-there-pendings';
import { createSyncPendingDataAction } from '../store/service/pending/SyncPendingData';

interface Props {
  areTherePendings: boolean
  isServerAvailable: boolean
  syncPending: () => void;
};

function PendingWatcher(props: Props) {
  const { areTherePendings, isServerAvailable, syncPending } = props;

  React.useEffect(
    () => {
      if (areTherePendings && isServerAvailable) {
        syncPending()
      }
    }, [areTherePendings, isServerAvailable]
  );

  return null;
}

export const PendingWatcherConnected = connect(
  (state: IStorage) => ({
    isServerAvailable: state.app.serverAvailable,
    areTherePendings: selectAreTherePendings(state),
  }),
  (dispatch) => ({
    syncPending: () => dispatch(createSyncPendingDataAction())
  })
)(PendingWatcher);
