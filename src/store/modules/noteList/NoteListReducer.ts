import { INoteList } from "../../../model/INoteList";
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
        uuidv1()
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
      const newList: INoteList = Object
        .values(noteList)
        .reduce((prev, curr) => {
          let noteId;
          let noteIdToRewrite;
          if (curr.id) {
            noteId = curr.id;
            noteIdToRewrite = curr.id;
          } else {
            noteIdToRewrite = curr.date;
            noteId = uuidv1();
          }
          return {
            ...prev,
            [noteId]: {
              ...noteList[noteIdToRewrite],
              id: noteId,
              userId: action.payload.userId
            }
          }
        }, {} as INoteList);
      return newList;
    }
    default:
      return noteList;
  }
}
