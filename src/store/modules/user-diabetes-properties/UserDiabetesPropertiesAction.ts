import { IUserDiabetesProperties } from "../../../model/IUserDiabetesProperties";
import { UserDiabetesPropertiesActionType } from "./UserDiabetesPropertiesActionType";

export interface UserDiabetesPropertiesChangeAction {
    type: UserDiabetesPropertiesActionType.CHANGE,
    payload: {
        properties: IUserDiabetesProperties
    }
}

export type UserDiabetesPropertiesAction = (
    UserDiabetesPropertiesChangeAction 
)
