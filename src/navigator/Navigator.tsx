import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { AuthorizationScreenConnect } from "../screen/auth/AuthorizationScreen";
import { NoteListScreenConnect } from "../screen/note-list/NoteListScreen";
import { ChartWithSettingsConnect } from "../screen/chart-with-settings-screen/ChartWithSettingsScreen";
import { RegistrationScreenConnect } from "../screen/auth/RegistrationScreen";
import { IUser } from '../model/IUser';
import { connect } from 'react-redux';
import { IAppState } from '../model/IAppState';
import { ProfileScreenConnect } from '../screen/profile/ProfileScreen';
import { NotesIcon } from '../component/icon/NotesIcon';
import { ChartsIcon } from '../component/icon/ChartsIcon';
import { ProfileIcon } from '../component/icon/ProfileIcon';

interface AppNavigatorComponentProps {
    user: IUser
}

const AppNavigatorComponent = (props: AppNavigatorComponentProps) => {
    React.useEffect(() => {

    })
    return props.user.id ?
        <AppAuthedNavigatorContainer /> :
        <AppUnknownNavigatorContainer />
}

export const AppNavigator = connect(
    (state: IAppState) => ({
        user: state.user
    })
)(AppNavigatorComponent)

const AuthedMainNavigator = createBottomTabNavigator(
    {
        'Записи': { screen: NoteListScreenConnect },
        "Графики": { screen: ChartWithSettingsConnect },
        "Профиль": { screen: ProfileScreenConnect }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'Записи') {
                    return <NotesIcon />
                } else if (routeName === "Графики") {
                    return <ChartsIcon />
                }else if (routeName === "Профиль") {
                    return <ProfileIcon />
                }
            },
        }),
        tabBarOptions: {
            activeTintColor: 'black',
            inactiveTintColor: 'black',
            inactiveBackgroundColor: "#E3EAFF",
        },
    }
)

const UnknownMainNavigator = createStackNavigator(
    {
        Auth: { screen: AuthorizationScreenConnect },
        Registration: { screen: RegistrationScreenConnect },
    },
    {
        headerMode: 'none'
    }
)

const AppAuthedNavigatorContainer = createAppContainer(AuthedMainNavigator)

const AppUnknownNavigatorContainer = createAppContainer(UnknownMainNavigator)
