import React from 'react'
import { BlockHat } from '../component/hat/BlockHat'
import { connect } from 'react-redux'
import { IStorage } from '../model/IStorage'
import { View, StyleSheet, ScrollView, Text } from 'react-native'
import { ProfileItem } from '../view/profile/ProfileItem'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { createUserChangeAction } from '../store/modules/user/UserActionCreator'

interface Props {
    onLogOut?: () => void;
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
}

export const ProfileScreenConnect = connect(
    (state: IStorage) => ({}),
    (dispatch) => ({ dispatch }),
    (stateProps, {dispatch}, ownProps) => {
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
        backgroundColor: "#DDDDDD"
    },
    activeElementExit: {
        fontSize: 16,
        color: 'crimson'
    }
})