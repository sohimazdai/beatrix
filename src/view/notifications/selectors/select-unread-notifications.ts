import { createSelector } from "reselect";
import { IStorage } from "../../../model/IStorage";

export default createSelector(
    [
        (state: IStorage) => state.notifications,
    ],
    (nfs) => nfs.list.filter((n) => !nfs.seenList.includes(n.id)),
)