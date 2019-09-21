import { createStackNavigator, createAppContainer } from "react-navigation";
import { NoteListScreenConnect } from "../screen/note-list/NoteListScreen";
import { NoteCreationScreenConnect } from "../screen/note-creation/NoteCreationScreen";
import { NoteEditingScreenConnect } from "../screen/note-editing/NoteEditingScreen";
import { ChartWithSettingsConnect } from "../screen/note-chart/ChartWithSettingsScreen";

const MainNavigator = createStackNavigator(
    {
        NoteList: { screen: NoteListScreenConnect },
        NoteCreation: { screen: NoteCreationScreenConnect },
        NoteEditor: { screen: NoteEditingScreenConnect },
        Chart: { screen: ChartWithSettingsConnect },
    }, {
        headerMode: 'none'
    }
)

export const AppNavigator = createAppContainer(MainNavigator)
