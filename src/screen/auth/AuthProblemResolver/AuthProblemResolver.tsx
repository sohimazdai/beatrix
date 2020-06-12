import * as React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { connect } from 'react-redux';
import { batchActions } from 'redux-batched-actions';

import { IStorage } from '../../../model/IStorage';
import { IUser } from '../../../model/IUser';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { shadowOptions } from '../../../constant/ShadowOptions';
import { createGetUserByInstallationIdAction } from '../../../store/service/auth/GetUserByInstallationId';
import { createSyncUserAction } from '../../../store/service/user/SyncUserSaga';
import { createUserChangeAction } from '../../../store/modules/user/UserActionCreator';
import { IApp } from '../../../model/IApp';
import { i18nGet } from '../../../localisation/Translate';

interface Props {
  user?: IUser
  app?: IApp
  pullUserIdByInstallationId?: () => void
  syncUser?: () => void
}

interface State {
  installationDone: boolean
}

class Component extends React.Component<Props, State> {
  state = {
    installationDone: false,
  }

  componentDidMount() {
    const { app, user, pullUserIdByInstallationId } = this.props;
    if ((!user.email || !user.id || typeof user.isAuthed !== 'boolean') && app.serverAvailable) {

      pullUserIdByInstallationId();

    }
  }

  componentDidUpdate(pP: Props) {
    const { app, user, pullUserIdByInstallationId } = this.props;

    if (
      (!pP.user.email && user.email) ||
      (!pP.user.email && user.email) ||
      (typeof pP.user.isAuthed !== 'boolean' && typeof user.isAuthed === 'boolean') &&
      !this.state.installationDone
    ) {

      this.setState({ installationDone: true })

    } else if (
      (!user.email || !user.id || typeof user.isAuthed !== 'boolean') &&
      !pP.app.serverAvailable && app.serverAvailable &&
      !this.state.installationDone
    ) {

      pullUserIdByInstallationId();

    }
  }

  render() {
    const { user, syncUser } = this.props;

    if (Platform.OS === 'ios') return null;

    if (!user.email || !user.id) return null;

    const userName = user.email.split('@')[0];

    return (
      <View style={styles.resolverView}>
        <Text style={styles.resolverViewTitle}>
          {i18nGet('continue_as')}
        </Text>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={syncUser}>
            <Text style={styles.buttonText}>
              {userName}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

export const AuthProblemResolver = connect(
  (state: IStorage) => ({
    user: state.user,
    app: state.app,
  }),
  (dispatch) => ({
    dispatch,
    pullUserIdByInstallationId: () => dispatch(createGetUserByInstallationIdAction()),
  }),
  (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps,
    syncUser: () => {
      dispatchProps.dispatch(batchActions([
        createSyncUserAction({
          id: stateProps.user.id,
          installationId: stateProps.user.installationId,
          authType: stateProps.user.authType,
          email: stateProps.user.email,
        }),
        createUserChangeAction({
          isAuthed: true
        })
      ]))
    }
  })
)(Component)

const styles = StyleSheet.create({
  resolverView: {
    width: 200,
  },
  resolverViewTitle: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonView: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 5,
    ...shadowOptions,
  },
  buttonText: {
    fontSize: 16,
  }
})
