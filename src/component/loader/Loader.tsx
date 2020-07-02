import * as React from 'react';
import { ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';
import { Color } from '../../constant/Color';

interface Props {
  loading: boolean
  isManaged?: boolean
  isManagedLoading?: boolean
}

class Component extends React.Component<Props> {
  render() {
    const { loading, isManaged, isManagedLoading } = this.props;

    if (isManaged) {
      return isManagedLoading
        ? <ActivityIndicator collapsable color={Color.PRIMARY} style={{ paddingLeft: 5 }} />
        : null
    }

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
