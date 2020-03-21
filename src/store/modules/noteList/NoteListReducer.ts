import { INoteList, INoteListNote } from "../../../model/INoteList";
import { NoteListActionType } from "./NoteListActionType";
import { NoteListChangeNoteByIdAction, NoteListDeleteNoteByIdAction, FDTUUIDAction } from "./NoteListAction";
import { v1 as uuidv1 } from 'react-native-uuid';

export function noteListReducer(
  noteList: INoteList = {},
  action: NoteListChangeNoteByIdAction | NoteListDeleteNoteByIdAction | FDTUUIDAction,
): INoteList {
  switch (action.type) {
    case NoteListActionType.CHANGE_NOTE_BY_ID:
      const noteId = action.payload.note.id ?
        action.payload.note.id :
        uuidv1({
          node: [0x01, 0x23, 0x45, 0x67, 0x89, 0xab],
          clockseq: 0x1234,
          msecs: new Date().getTime(),
          nsecs: 5678
        })
      return {
        ...noteList,
        [noteId]: {
          ...action.payload.note,
          id: noteId,
          userId: action.payload.userId
        }
      }


    case NoteListActionType.DELETE_NOTE_BY_ID:
      const newNoteList = noteList;
      delete newNoteList[action.payload.noteId];
      return {
        ...newNoteList
      }

    case NoteListActionType.FDTUUID: {
      const newList = Object
        .values(noteList)
        .reduce((prev, curr) => {
          const newUUID = curr.id ? curr.id : uuidv1();
          const noteId = curr.id ? curr.id : curr.date;
          return {
            ...prev,
            [newUUID]: {
              id: newUUID,
              ...noteList[noteId],
              userId: action.payload.userId
            }
          }
        }, {});
      return newList;
    }
    default:
      return noteList;
  }
}
