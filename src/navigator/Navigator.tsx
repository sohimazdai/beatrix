import React from 'react'
import { createStackNavigator, createAppContainer, StackNavigatorConfig } from "react-navigation";
import { AuthScreenConnect } from "../screen/auth/AuthScreen";
import { NoteListScreenConnect } from "../screen/note/NoteListScreen";
import { ChartConnect } from "../screen/chart/ChartScreen";
import { IUser } from '../model/IUser';
import { connect } from 'react-redux';
import { IStorage } from '../model/IStorage';
import { ProfileScreenConnect } from '../screen/profile/ProfileScreen';
import { IInteractive } from '../model/IInteractive';
import { ProfileScreenDiabetesSettings } from '../screen/profile/profile-settings/ProfileScreenDiabetesSettings';
import { ConfirmPopupConnect } from '../component/popup/ConfirmPopup';
import { Fader, FaderType } from '../component/fader/Fader';
import { ModalContentConnect } from '../component/modal-content/ModalContent';
import { IModal } from '../model/IModal';
import * as Localization from 'expo-localization';
import translate, { setLocale, setOriginalLocale, setRegion } from '../localisation/Translate';
import { CarbohydratesSettngs } from '../screen/profile/profile-settings/sub-settings/CarbohydratesSettngs';
import { GlycemiaSettings } from '../screen/profile/profile-settings/sub-settings/GlycemiaSettngs';
import { InsulinSettings } from '../screen/profile/profile-settings/sub-settings/InsulinSettings';
import { DashboardScreenConnect } from '../screen/dashboard/DashboardScreen';
import { ExportDataSettings } from '../screen/profile/profile-settings/sub-settings/ExportDataSettings';
import { OnboardingConnected } from '../screen/onboarding/Onboarding';
import { NoteEditorConnect } from '../screen/note-editor/NoteEditor';
import { TagEditor } from '../screen/tag-editor/TagEditor';
import { FoodScreen } from '../screen/food/FoodScreen';
import { BarcodeScanningScreen } from '../screen/food/BarcodeScanningScreen';
import { FoodCard } from '../screen/food/FoodCard';
import { NavigatorEntities } from './modules/NavigatorEntities';
import { FoodCreationScreenConnected } from '../screen/food/FoodCreationScreen';

setLocale(Localization.locale.slice(0, 2));
setOriginalLocale(Localization.locale.slice(0, 2));
setRegion(Localization.locale.slice(3, 5));

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
    const { user: { isNeedToShowOnboarding } } = props;

    const faded = (
        props.interactive.confirmPopupShown ||
        props.modal.needToShow ||
        props.user.syncLoading ||
        props.user.exportLoading
    );

    const faderType = props.user.syncLoading
        ? FaderType.SYNC
        : FaderType.EMPTY;

    return isNeedToShowOnboarding
        ? <OnboardingConnected />
        : (
            <>
                <AuthedNavigatorContainer />
                <Fader hidden={!faded} type={faderType} />
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
        ExportDataSettings: {
            screen: ExportDataSettings,
        }
    },
    {
        headerMode: 'none'
    }
)

const authedStackNavigatorConfig: StackNavigatorConfig = {
    headerMode: 'none',
}

const AuthedNavigator = createStackNavigator(
    {
        Dashboard: { screen: DashboardScreenConnect },
        Notes: { screen: NoteListScreenConnect },
        Charts: { screen: ChartConnect },
        Profile: { screen: ProfileScreenStack },
        NoteEditor: { screen: NoteEditorConnect },
        TagEditor: { screen: TagEditor },
        Food: { screen: FoodScreen },
        BarcodeScanning: { screen: BarcodeScanningScreen },
        FoodCard: { screen: FoodCard },
        [NavigatorEntities.FOOD_CARD_CREATION]: { screen: FoodCreationScreenConnected },
    },
    authedStackNavigatorConfig
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
