import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { AuthScreenConnect } from "../screen/auth/AuthScreen";
import { NoteListScreenConnect } from "../screen/note/NoteListScreen";
import { ChartConnect } from "../screen/chart/ChartScreen";
import { IUser } from '../model/IUser';
import { connect } from 'react-redux';
import { IStorage } from '../model/IStorage';
import { ProfileScreenConnect } from '../screen/profile/ProfileScreen';
import { NotesIcon } from '../component/icon/NotesIcon';
import { ChartsIcon } from '../component/icon/ChartsIcon';
import { ProfileIcon } from '../component/icon/ProfileIcon';
import { IInteractive } from '../model/IInteractive';
import { ProfileScreenDiabetesSettings } from '../screen/profile/profile-settings/ProfileScreenDiabetesSettings';
import { NoteCreationPopupConnect } from '../view/notes/note-creation-popup/NoteCreationPopup';
import ConfirmPopup, { ConfirmPopupConnect } from '../component/popup/ConfirmPopup';
import { ProfileUserPropertiesShedulePopupConnect } from '../view/profile/shedule-popup/ProfileUserPropertiesShedulePopup';

interface AppNavigatorComponentProps {
    user?: IUser,
}

interface AuthedContainer {
    interactive?: IInteractive
}

const AppNavigatorComponent = (props: AppNavigatorComponentProps) => {
    React.useEffect(() => {

    })
    return props.user.id ?
        <AuthedContainer /> :
        <AppUnknownNavigatorContainer />
}

export const AuthedContainer = () => (
    <>
        <AuthedNavigatorContainer />
        <NoteCreationPopupConnect />
        <ConfirmPopupConnect />
        <ProfileUserPropertiesShedulePopupConnect />
    </>
)

export const AppNavigator = connect(
    (state: IStorage) => ({
        user: state.user,
    })
)(AppNavigatorComponent)

const ProfileScreenStack = createStackNavigator(
    {
        Profile: {
            screen: ProfileScreenConnect,
        },
        ProfileDiabetesSettings: {
            screen: ProfileScreenDiabetesSettings,
        }
    },
    {
        headerMode: 'none'
    }
)



const AuthedMainNavigator = createBottomTabNavigator(
    {
        'Записи': { screen: NoteListScreenConnect },
        "Графики": { screen: ChartConnect },
        // "Профиль": { screen: ProfileScreenStack }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                if (routeName === 'Записи') {
                    return <NotesIcon />
                } else if (routeName === "Графики") {
                    return <ChartsIcon />
                } else if (routeName === "Профиль") {
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

const AuthedNavigator = createStackNavigator(
    {
        Main: {screen: AuthedMainNavigator},
        Profile: {screen: ProfileScreenStack},
    },
    {
        headerMode: 'none'
    }
)



const UnknownMainNavigator = createStackNavigator(
    {
        Auth: { screen: AuthScreenConnect },
    },
    {
        headerMode: 'none'
    }
)

const AuthedNavigatorContainer = createAppContainer(AuthedNavigator)

const AppUnknownNavigatorContainer = createAppContainer(UnknownMainNavigator)
