import React from 'react'
import { createStackNavigator, createAppContainer, createBottomTabNavigator } from "react-navigation";
import { AuthScreenConnect } from "../screen/auth/AuthScreen";
import { NoteListScreenConnect } from "../screen/note/NoteListScreen";
import { ChartConnect } from "../screen/chart/ChartScreen";
import { IUser } from '../model/IUser';
import { connect } from 'react-redux';
import { IStorage } from '../model/IStorage';
import { ProfileScreenConnect } from '../screen/profile/ProfileScreen';
import { IInteractive } from '../model/IInteractive';
import { ProfileScreenDiabetesSettings } from '../screen/profile/profile-settings/ProfileScreenDiabetesSettings';
import { NoteCreationPopupConnect } from '../view/notes/note-creation-popup/NoteCreationPopup';
import { ConfirmPopupConnect } from '../component/popup/ConfirmPopup';
import { Fader, FaderType } from '../component/fader/Fader';
import { ModalContentConnect } from '../component/modal-content/ModalContent';
import { IModal } from '../model/IModal';
import * as Localization from 'expo-localization';
import translate, { setLocale } from '../localisation/Translate';
import { CarbohydratesSettngs } from '../screen/profile/profile-settings/sub-settings/CarbohydratesSettngs';
import { GlycemiaSettings } from '../screen/profile/profile-settings/sub-settings/GlycemiaSettngs';
import { InsulinSettings } from '../screen/profile/profile-settings/sub-settings/InsulinSettngs';
import { DashboardScreenConnect } from '../screen/dashboard/DashboardScreen';
import { ChartDotInfoPopupConnect } from '../view/chart/chart-dot-info-popup/components/chart-dot-info-popup/ChartDotInfoPopup';
import { ExportDataSettings } from '../screen/profile/profile-settings/sub-settings/ExportDataSettings';
import { OnboardingConnected } from '../screen/onboarding/Onboarding';

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
    const { user: { isOnboardingCompleted } } = props;

    const faded = (
        props.interactive.confirmPopupShown ||
        props.interactive.creatingNoteMode ||
        props.modal.needToShow ||
        props.user.syncLoading ||
        props.user.exportLoading
    );

    const faderType = props.user.syncLoading
        ? FaderType.SYNC
        : FaderType.EMPTY;

    return isOnboardingCompleted
        ? (
            <>
                <AuthedNavigatorContainer />
                <Fader hidden={!faded} type={faderType} />
                <ChartDotInfoPopupConnect />
                <NoteCreationPopupConnect />
                <ConfirmPopupConnect />
                <ModalContentConnect />
            </>
        ) : <OnboardingConnected />
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
        ExportDataSettings: {
            screen: ExportDataSettings,
        }
    },
    {
        headerMode: 'none'
    }
)

const AuthedNavigator = createStackNavigator(
    {
        Dashboard: { screen: DashboardScreenConnect },
        Notes: { screen: NoteListScreenConnect },
        Charts: { screen: ChartConnect },
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
