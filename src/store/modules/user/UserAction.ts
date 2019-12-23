import { IUser } from "../../../model/IUser";
import { UserActionType } from "./UserActionType";

export interface UserChangeAction {
    type: UserActionType.CHANGE,
    payload: {
        user: IUser
    }
}

export type UserAction = (
    UserChangeAction
)
