import { createStackNavigator, createAppContainer } from "react-navigation";
import { NoteListScreenConnect } from "../screen/note-list/NoteListScreen";
import { NoteCreationScreenConnect } from "../screen/note-creation/NoteCreationScreen";
import { NoteEditingScreenConnect } from "../screen/note-editing/NoteEditingScreen";
import { NoteChartConnect } from "../screen/note-chart/NoteChart";

const MainNavigator = createStackNavigator(
    {
        NoteList: { screen: NoteListScreenConnect },
        NoteCreation: { screen: NoteCreationScreenConnect },
        NoteEditor: { screen: NoteEditingScreenConnect },
        NoteChart: { screen: NoteChartConnect },
    }, {
        headerMode: 'none'
    }
)

export const AppNavigator = createAppContainer(MainNavigator)
