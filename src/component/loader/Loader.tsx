import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';

interface Props {
  loading: boolean
}

class Component extends React.Component<Props> {
  render() {
    const { loading } = this.props;

    if (!loading) return null;

    return <ActivityIndicator collapsable color={'white'} style={{ paddingLeft: 5 }} />
  }
}

export const Loader = connect(
  (state: IStorage) => {
    return {
      loading: (
        state.user.loading ||
        state.user.syncLoading ||
        state.pendingNoteList.loading
      )
    }
  }
)(Component);
