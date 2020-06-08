import { IUserDiabetesProperties, ShortInsulinType } from "../../../model/IUserDiabetesProperties";
import { UserDiabetesPropertiesAction } from "./UserDiabetesPropertiesAction";
import { UserDiabetesPropertiesActionType } from "./UserDiabetesPropertiesActionType";
import { Measures } from '../../../localisation/Measures';

export function userDiabetesPropertiesReducer(
  properties: IUserDiabetesProperties = {
    targetGlycemia: Measures.getNormalGlycemia(),
    shortInsulinType: ShortInsulinType.ULTRA_SHORT,
    glycemiaMeasuringType: Measures.getDefaultGlucoseMeasuringType(),
    carbsMeasuringType: Measures.getDefaultCarbsMeasuringType(),
    carbsUnitWeightType: Measures.getDefaultCarbsUnitWeightType(),
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
