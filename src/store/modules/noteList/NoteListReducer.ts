import { INoteList } from "../../../model/INoteList";
import { NoteListActionType } from "./NoteListActionType";
import { NoteListChangeNoteByIdAction } from "./NoteListAction";
import { NoteListToArraySelector } from "../../selector/NoteListToArraySelector";

export function noteListReducer(
  noteList: INoteList = {},
  action: NoteListChangeNoteByIdAction
) {
  switch (action.type) {
    case NoteListActionType.CHANGE_NOTE_BY_ID:
      const mapped: number[] = noteList.notes ?
        NoteListToArraySelector.makeArraySortedByTime(action.payload, noteList.notes) :
        [action.payload.date];
      return {
        ...noteList,
        notes: {
          ...noteList.notes,
          [action.payload.date]: action.payload
        },
        mappedNotes: mapped
      };
    default:
      return noteList;
  }
}
