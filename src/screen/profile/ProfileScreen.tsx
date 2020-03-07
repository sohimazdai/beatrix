import React from 'react'
import { Hat } from '../../component/hat/Hat'
import { connect } from 'react-redux'
import { IStorage } from '../../model/IStorage'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { ProfileItem } from '../../view/profile/ProfileItem'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createUserChangeAction } from '../../store/modules/user/UserActionCreator'
import { NavigationParams, NavigationScreenProp } from 'react-navigation'
import { NavigationState } from 'react-navigation'
import { createChangeInteractive } from '../../store/modules/interactive/interactive'
import { batchActions } from 'redux-batched-actions'

interface Props {
    onLogOut?: () => void;
    navigation: NavigationScreenProp<NavigationState, NavigationParams>
}

interface State {

}

class ProfileScreenComponent extends React.Component<Props, State> {
    render() {
        return (
            <View style={styles.profileView}>
                <Hat
                    onBackPress={() => this.props.navigation.navigate('Main')}
                    title={'Профиль'}
                />
                <ScrollView>
                    <ProfileItem
                        title={'Диабетический профиль'}
                        description={'Настройте ваши параметры и улучшите компенсацию'}
                        activeElement={<TouchableOpacity onPress={this.onProfileSettingsPress}>
                            <Text style={styles.activeElementToSettings}>
                                {'Перейти'}
                            </Text>
                        </TouchableOpacity>}
                    />
                    <ProfileItem
                        description={'Выйти из аккаунта'}
                        hint={'Чтобы использовать ваши записи необходимо будет зайти снова в ваш аккаунт'}
                        activeElement={<TouchableOpacity onPress={this.props.onLogOut}>
                            <Text style={styles.activeElementExit}>
                                {'Выйти'}
                            </Text>
                        </TouchableOpacity>}
                    />
                </ScrollView>
            </View>
        )
    }


    onProfileSettingsPress = () => {
        this.props.navigation.navigate('ProfileDiabetesSettings')
    }
}

export const ProfileScreenConnect = connect(
    (state: IStorage) => ({}),
    (dispatch) => ({ dispatch }),
    (stateProps, { dispatch }, ownProps) => {
        return {
            ...stateProps,
            ...ownProps,
            onLogOut() {
                dispatch(createChangeInteractive({
                    confirmPopupShown: true,
                    confirmPopupDescription: "Вы уверены?",
                    confirmPopupSuccessCallback: () => {
                        batchActions([
                            dispatch(createUserChangeAction({
                                id: '',
                                isAuthed: false
                            })),
                            dispatch(createChangeInteractive({
                                confirmPopupShown: false,
                                confirmPopupSuccessCallback: null,
                                confirmPopupRejectCallback: null,
                                confirmPopupDescription: null
                            }))
                        ])
                    },
                    confirmPopupRejectCallback: () => {
                        dispatch(createChangeInteractive({
                            confirmPopupShown: false,
                            confirmPopupSuccessCallback: null,
                            confirmPopupRejectCallback: null,
                            confirmPopupDescription: null
                        }))
                    }
                }))

            }
        }
    }
)(ProfileScreenComponent)

const styles = StyleSheet.create({
    profileView: {
        height: '100%',
        width: '100%',
        display: 'flex',

        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: "#DDDDDD"
    },
    activeElementExit: {
        fontSize: 16,
        color: 'crimson'
    },
    activeElementToSettings: {
        fontSize: 16,
        color: '#2E3858'
    }
})