import { IUserDiabetesProperties, ShortInsulinType, GlycemiaMeasuringType } from "../../../model/IUserDiabetesProperties";
import { UserDiabetesPropertiesAction } from "./UserDiabetesPropertiesAction";
import { UserDiabetesPropertiesActionType } from "./UserDiabetesPropertiesActionType";

export function userDiabetesPropertiesReducer(
  properties: IUserDiabetesProperties = {
    targetGlycemia: 6,
    shortInsulinType: ShortInsulinType.ULTRA_SHORT,
    glycemiaMeasuringType: GlycemiaMeasuringType.MMOL_L,
  },
  action: UserDiabetesPropertiesAction
): IUserDiabetesProperties {
  switch (action.type) {
    case UserDiabetesPropertiesActionType.CHANGE:
      return {
        ...properties,
        ...action.payload.properties
      };
    default:
      return properties;
  }
}
