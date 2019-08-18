import { createStackNavigator, createAppContainer } from "react-navigation";
import { NoteListScreenConnect } from "../screen/note-list/NoteListScreen";
import { NoteCreationScreenConnect } from "../screen/note-creation/NoteCreationScreen";
import { NoteEdittingScreenConnect } from "../screen/note-editting/NoteEdittingScreen";

const MainNavigator = createStackNavigator(
    {
        NoteList: { screen: NoteListScreenConnect },
        NoteCreation: { screen: NoteCreationScreenConnect },
        NoteEdittor: { screen: NoteEdittingScreenConnect }
    }, {
        headerMode: 'none'
    }
)

export const AppNavigator = createAppContainer(MainNavigator)
