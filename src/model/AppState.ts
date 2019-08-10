import { INoteList } from "./INoteList";

//Общий интерфейс по которому создаем стор
//за каждое поле отвечает отдельный редюсер
export interface AppState {
    noteList: INoteList
}
