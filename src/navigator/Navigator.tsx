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
import { Fader, FaderType } from '../component/fader/Fader';
import { ModalContentConnect } from '../component/modal-content/ModalContent';
import { IModal } from '../model/IModal';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate, { i18nGet, setLocale } from '../localisation/Translate';
import { CarbohydratesSettngs } from '../screen/profile/profile-settings/sub-settings/CarbohydratesSettngs';
import { GlycemiaSettings } from '../screen/profile/profile-settings/sub-settings/GlycemiaSettngs';
import { InsulinSettings } from '../screen/profile/profile-settings/sub-settings/InsulinSettngs';

setLocale(Localization.locale.slice(0, 2));

translate();

interface AppNavigatorComponentProps {
    user?: IUser,
    interactive?: IInteractive
    modal?: IModal
}

interface AuthedContainerProps {
    interactive?: IInteractive
    modal?: IModal
    user?: IUser
}

const AppNavigatorComponent = (props: AppNavigatorComponentProps) => {
    return props.user && props.user.isAuthed ?
        <AuthedContainer {...props} /> :
        <AppUnknownNavigatorContainer />
}

const AuthedContainer = (props: AuthedContainerProps) => {
    const faded = (
        props.interactive.confirmPopupShown ||
        props.interactive.creatingNoteMode ||
        props.modal.needToShow ||
        props.user.syncLoading
    );

    const faderType = props.user.syncLoading
        ? FaderType.SYNC
        : FaderType.EMPTY;

    return (
        <>
            <AuthedNavigatorContainer />
            <Fader hidden={!faded} type={faderType} />
            <NoteCreationPopupConnect />
            <ConfirmPopupConnect />
            <ModalContentConnect />
        </>
    )
}

export const AppNavigator = connect(
    (state: IStorage) => ({
        user: state.user,
        interactive: state.interactive,
        modal: state.modal || {},
    })
)(AppNavigatorComponent)

const ProfileScreenStack = createStackNavigator(
    {
        Profile: {
            screen: ProfileScreenConnect,
        },
        ProfileDiabetesSettings: {
            screen: ProfileScreenDiabetesSettings,
        },
        GlycemiaSettings: {
            screen: GlycemiaSettings,
        },
        CarbohydratesSettings: {
            screen: CarbohydratesSettngs,
        },
        InsulinSettings: {
            screen: InsulinSettings,
        },
    },
    {
        headerMode: 'none'
    }
)



const AuthedMainNavigator = createBottomTabNavigator(
    {
        [i18nGet('notes')]: { screen: NoteListScreenConnect },
        [i18nGet('charts')]: { screen: ChartConnect },
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: () => {
                const { routeName } = navigation.state;
                if (routeName === i18nGet('notes')) {
                    return <NotesIcon />
                } else if (routeName === i18nGet('charts')) {
                    return <ChartsIcon />
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
