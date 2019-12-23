import { IUser } from "../../../model/IUser";
import { UserActionType } from "./UserActionType";
import { UserChangeAction } from "./UserAction";

export function createUserChangeAction(user: IUser): UserChangeAction {
    return {
        type: UserActionType.CHANGE,
        payload: {
            user
        }
    }
}
