
import * as React from 'react';
import { styles } from './Style';
import { Popup } from '../../../component/popup/Popup';
import { View, Text } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { IStorage } from '../../../model/IStorage';
import { createRememberPasswordAction } from '../../../store/service/auth/RememberPasswordSaga';

interface Props {
    rememberPassword: (email: string) => void
    onRememberEnd: () => void;
    restorePasswordPopupShown?: boolean
}

interface State {
    restorePasswordEmail?: string
}

class AuthRememberPasswordPopup extends React.Component<Props, State> {
    state = {
        restorePasswordEmail: "",
    }

    render() {
        return (
            <Popup hidden={!this.props.restorePasswordPopupShown}>
                <View style={styles.authScreenRestorePasswordView}>
                    <Text style={styles.authScreenRestorePasswordViewTitle}>
                        Восстановление пароля
                                </Text>
                    <TextInput
                        style={styles.input}
                        value={this.state.restorePasswordEmail}
                        keyboardType={'email-address'}
                        placeholder={'Почта'}
                        onChangeText={(value) => this.setState({ restorePasswordEmail: value })}
                    />
                    <View style={styles.rememberButton}>
                        <TouchableOpacity
                            onPress={() => this.props.rememberPassword(this.state.restorePasswordEmail)}
                            style={styles.rememberButtonTouchable}
                        >
                            <Text>
                                Напомнить
                                </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cancelRememberButton}>
                        <TouchableOpacity
                            onPress={this.props.onRememberEnd}
                        >
                            <Text>
                                Отмена
                                </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Popup>
        )
    }
}

export const AuthRememberPasswordPopupConnect = connect(
    (state: IStorage) => ({}),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => ({
        ...ownProps,
        ...stateProps,
        rememberPassword: (email: string) => dispatch(
            createRememberPasswordAction(email)
        )
    })
)(AuthRememberPasswordPopup)
