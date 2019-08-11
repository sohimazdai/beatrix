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
      const mapped = NoteListToArraySelector.makeArraySortedByTime(noteList);
      return {
        ...noteList,
        notes: {
          ...noteList.notes,
          [action.payload.id]: action.payload
        },
        mappedNotes: mapped
      };
    default:
      return noteList;
  }
}
