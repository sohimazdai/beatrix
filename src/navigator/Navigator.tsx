import { createStackNavigator, createAppContainer } from "react-navigation";
import { AuthorizationScreen, AuthorizationScreenConnect } from "../screen/auth/AuthorizationScreen";
import { NoteListScreenConnect } from "../screen/note-list/NoteListScreen";
import { NoteCreationScreenConnect } from "../screen/note-creation/NoteCreationScreen";
import { NoteEditingScreenConnect } from "../screen/note-editing/NoteEditingScreen";
import { ChartWithSettingsConnect } from "../screen/chart-with-settings-screen/ChartWithSettingsScreen";
import RegistrationScreen from "../screen/auth/RegistrationScreen";

const MainNavigator = createStackNavigator(
    {
        Auth: { screen: AuthorizationScreenConnect },
        Registration: { screen: RegistrationScreen },
        NoteList: { screen: NoteListScreenConnect },
        NoteCreation: { screen: NoteCreationScreenConnect },
        NoteEditor: { screen: NoteEditingScreenConnect },
        Chart: { screen: ChartWithSettingsConnect },
    }, {
    headerMode: 'none'
}
)

export const AppNavigator = createAppContainer(MainNavigator)
