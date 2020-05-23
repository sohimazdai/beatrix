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
import { ConfirmPopupConnect } from '../component/popup/ConfirmPopup';
import { Fader } from '../component/Fader';

interface AppNavigatorComponentProps {
    user?: IUser,
    interactive?: IInteractive
}

interface AuthedContainerProps {
    interactive?: IInteractive
}

const AppNavigatorComponent = (props: AppNavigatorComponentProps) => {
    return props.user && props.user.isAuthed ?
        <AuthedContainer interactive={props.interactive} /> :
        <AppUnknownNavigatorContainer />
}

const AuthedContainer = (props: AuthedContainerProps) => {
    const faded = props.interactive.confirmPopupShown ||
        props.interactive.creatingNoteMode
    return (
        <>
            <AuthedNavigatorContainer />
            <Fader hidden={!faded} />
            <NoteCreationPopupConnect />
            <ConfirmPopupConnect />
        </>
    )
}

export const AppNavigator = connect(
    (state: IStorage) => ({
        user: state.user,
        interactive: state.interactive
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
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: () => {
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
        Main: { screen: AuthedMainNavigator },
        Profile: { screen: ProfileScreenStack },
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
