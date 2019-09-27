import { createStackNavigator, createAppContainer } from "react-navigation";
import AuthotizationScreen  from "../screen/auth/AuthorizationScreen";
import { NoteListScreenConnect } from "../screen/note-list/NoteListScreen";
import { NoteCreationScreenConnect } from "../screen/note-creation/NoteCreationScreen";
import { NoteEditingScreenConnect } from "../screen/note-editing/NoteEditingScreen";
import { ChartWithSettingsConnect } from "../screen/chart-with-settings-screen/ChartWithSettingsScreen";

const MainNavigator = createStackNavigator(
    {
        Auth: { screen: AuthotizationScreen },
        NoteList: { screen: NoteListScreenConnect },
        NoteCreation: { screen: NoteCreationScreenConnect },
        NoteEditor: { screen: NoteEditingScreenConnect },
        Chart: { screen: ChartWithSettingsConnect },
    }, {
        headerMode: 'none'
    }
)

export const AppNavigator = createAppContainer(MainNavigator)
