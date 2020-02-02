import React from 'react'
import { BlockHat } from '../../component/hat/BlockHat'
import { connect } from 'react-redux'
import { IStorage } from '../../model/IStorage'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { ProfileItem } from '../../view/profile/ProfileItem'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createUserChangeAction } from '../../store/modules/user/UserActionCreator'
import { NavigationParams, NavigationScreenProp } from 'react-navigation'
import { NavigationState } from 'react-navigation'

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
                <BlockHat title={'Профиль'} />
                <ScrollView>
                    <ProfileItem
                        title={'Диабетический профиль'}
                        description={'Вы можете настроить свои параметры для лучшей компенсации диабета'}
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
                dispatch(createUserChangeAction({
                    id: '',
                    isAuthed: false
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