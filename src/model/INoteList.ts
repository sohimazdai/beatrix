//определяем интерфейсы, все ожидаемые поля и их типы
export interface INoteList {
    [id: number]: INoteListNote[];

    test: string
}

export interface INoteListNote {
    id: number, //тот же что и в индексе ассоциативного массива
    date: number, //время в милисекундах
    glucose: number,
    breadUnits: number,
    insulin: number
}

// const notes { //пример
//     19545454: {
//         id: 19545454,
//         date: 19545454, //дата на случай если мы решим изменить способ присваивания айдишника например на порядковый номер. Чтобы у нас ничег оне исчезло
//         glucose: 5.5,
//         breadUnits: 3,
//         insulin: 4
//     }
// }
