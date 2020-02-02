import { IUserDiabetesProperties } from "../../../model/IUserDiabetesProperties";
import { UserDiabetesPropertiesAction } from "./UserDiabetesPropertiesAction";
import { UserDiabetesPropertiesActionType } from "./UserDiabetesPropertiesActionType";

export function userDiabetesPropertiesReducer(
  properties: IUserDiabetesProperties = {},
  action: UserDiabetesPropertiesAction
): IUserDiabetesProperties {
  switch (action.type) {
    case UserDiabetesPropertiesActionType.CHANGE: {
      return {
        ...properties,
        ...action.payload.properties
      }
    };

    default:
      return properties;
  }
}
