import { IUserDiabetesPropertiesDayTimeValue } from "../model/IUserDiabetesProperties";

export class RangeChecker {
    static checkAvailableRangesForShedule(shedule: {[id: string]: IUserDiabetesPropertiesDayTimeValue}): IUserDiabetesPropertiesDayTimeValue[]{
        let ranges: IUserDiabetesPropertiesDayTimeValue[] = [];
        let currentSince = null;
        Object.values(shedule)
            .sort((a, b) => a.since - b.since)
            .map((range, index) => {
                if (range.since === 0 && !currentSince) {
                    currentSince = 0;
                } else if (range.since !== 0 && !currentSince) {

                }
            })
        return ranges;
    }
}
