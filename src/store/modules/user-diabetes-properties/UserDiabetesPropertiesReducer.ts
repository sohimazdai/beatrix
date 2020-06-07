import { IUserDiabetesProperties, ShortInsulinType, GlycemiaMeasuringType } from "../../../model/IUserDiabetesProperties";
import { UserDiabetesPropertiesAction } from "./UserDiabetesPropertiesAction";
import { UserDiabetesPropertiesActionType } from "./UserDiabetesPropertiesActionType";
import { Measures } from '../../../localisation/Measures';

export function userDiabetesPropertiesReducer(
  properties: IUserDiabetesProperties = {
    targetGlycemia: Measures.getNormalGlycemia(),
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
