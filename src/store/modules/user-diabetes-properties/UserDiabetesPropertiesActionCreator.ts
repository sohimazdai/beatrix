import { IUserDiabetesProperties } from "../../../model/IUserDiabetesProperties";
import { UserDiabetesPropertiesActionType } from "./UserDiabetesPropertiesActionType";
import { UserDiabetesPropertiesChangeAction } from "./UserDiabetesPropertiesAction";

export function createUserDiabetesPropertiesChangeAction(properties: IUserDiabetesProperties): UserDiabetesPropertiesChangeAction {
    return {
        type: UserDiabetesPropertiesActionType.CHANGE,
        payload: {
            properties
        }
    }
}
