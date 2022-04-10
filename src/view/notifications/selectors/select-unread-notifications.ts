import { createSelector } from "reselect";

import { IStorage } from "../../../model/IStorage";
import selectActiveNotificationsList from "./select-active-notifications-list";

export default createSelector(
    [
        (state: IStorage) => selectActiveNotificationsList(state),
        (state: IStorage) => state.notifications.seenList,
    ],
    (nfs, seenList) => nfs.filter((n) => !seenList.includes(n.id)),
)