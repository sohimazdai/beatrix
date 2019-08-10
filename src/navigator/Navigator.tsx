import { createStackNavigator, createAppContainer } from "react-navigation";
import { NoteListScreenConnect } from "../screen/diary/NoteListScreen";

const MainNavigator = createStackNavigator(
    {
        DIARY: { screen: NoteListScreenConnect }
    }, {
        headerMode: 'none'
    }
)

export const AppNavigator = createAppContainer(MainNavigator)
