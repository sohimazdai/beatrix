import React from 'react'
import * as Progress from 'react-native-progress';
import { connect } from 'react-redux';
import { IStorage } from '../../model/IStorage';

interface Props {
  loading?: boolean;
}

interface State {
  loading: boolean;
  loaded: boolean;
}

export class ProgressBarComponent extends React.Component<Props, State> {
  state = {
    loaded: false,
    loading: false,
  }

  static getDerivedStateFromProps(p: Props, s: State) {
    if (p.loading) {
      return {
        ...s,
        loading: true,
      }
    }

    if (!p.loading && s.loading) {
      return {
        ...s,
        loaded: true,
      }
    }

    return s;
  }

  componentDidUpdate(pP: Props) {
    if (pP.loading && !this.props.loading) {
      const now = Date.now();
      setTimeout(() => {
        this.setState({ loaded: false, loading: false });
      }, 1000)
    }
  }

  render() {
    const { loaded, loading } = this.state;

    return (
      <Progress.Bar
        indeterminate={loading && !loaded}
        progress={loaded ? 100 : 0}
        borderWidth={0}
        borderRadius={0}
        color={
          loaded || !loading
            ? 'white'
            : '#FF8E8E'
        }
        height={3}
        width={null}
      />
    )
  }
}

export const ProgressBarConnect = connect(
  (state: IStorage) => {
    return {
      loading: (
        state.user.loading ||
        state.user.syncLoading ||
        state.pendingNoteList.loading
      )
    }
  }
)(ProgressBarComponent);
