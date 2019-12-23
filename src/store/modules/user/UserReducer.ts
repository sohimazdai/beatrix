import { IUser } from "../../../model/IUser";
import { UserActionType } from "./UserActionType";
import { UserAction } from "./UserAction";

export function userReducer(
  user: IUser = {},
  action: UserAction
): IUser {
  switch (action.type) {
    case UserActionType.CHANGE: {
      return {
        ...user,
        ...action.payload.user
      }
    };

    default:
      return user;
  }
}
