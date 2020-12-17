import { i18nGet } from '../localisation/Translate';

export class DateHelper {
    static today() {
        return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
    }

    static yesterday() {
        return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).getTime();
    }

    static getDiffBetweenInHours(old: number, actual: number) {
        return (actual - old) / 1000 / 60 / 60;
    }

    static getPreviousMonthNumber(date_: Date | number) {
        let date = date_;
        if (typeof date != 'string') {
            date = new Date(date)
        }
        return new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            1
        ).getTime()
    }

    static getDifferentMonthDate(date_: Date | number, diff: number) {
        let date = date_;
        if (typeof date != 'string') {
            date = new Date(date)
        }
        return new Date(
            date.getFullYear(),
            date.getMonth() + diff,
            DateHelper.getMaxDateOfDifferentMonth(date, diff)
        )
    }

    static getMaxDateOfDifferentMonth(date: Date, diff: number) {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1 + diff,
            0
        ).getDate()
    }

    static getDiffWeek(date: Date, diff: number) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + diff * 7
        )
    }

    static getDiffDate(date: Date, diff: number) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            date.getDate() + diff
        )
            .getTime()
    }

    static getDiffMonth(date: Date, diff: number) {
        return new Date(
            date.getFullYear(),
            date.getMonth() + diff,
            date.getDate()
        ).getTime()
    }

    static getWeekNumber() {
        return 14;
    }


    static getMonthStringPossesive(m: number) {
        switch (m) {
            case 0:
                return i18nGet('january');
            case 1:
                return i18nGet('february');
            case 2:
                return i18nGet('march');
            case 3:
                return i18nGet('april');
            case 4:
                return i18nGet('may');
            case 5:
                return i18nGet('june');
            case 6:
                return i18nGet('july');
            case 7:
                return i18nGet('august');
            case 8:
                return i18nGet('september');
            case 9:
                return i18nGet('october');
            case 10:
                return i18nGet('november');
            case 11:
                return i18nGet('december');
            default:
                console.warn('12 month is ... ? I think it is error')
        }
    }

    static getMonthStringCommon(m: number) {
        switch (m) {
            case 0:
                return i18nGet('january_capital_infinitive');
            case 1:
                return i18nGet('february_capital_infinitive');
            case 2:
                return i18nGet('march_capital_infinitive');
            case 3:
                return i18nGet('april_capital_infinitive');
            case 4:
                return i18nGet('may_capital_infinitive');
            case 5:
                return i18nGet('june_capital_infinitive');
            case 6:
                return i18nGet('july_capital_infinitive');
            case 7:
                return i18nGet('august_capital_infinitive');
            case 8:
                return i18nGet('september_capital_infinitive');
            case 9:
                return i18nGet('october_capital_infinitive');
            case 10:
                return i18nGet('november_capital_infinitive');
            case 11:
                return i18nGet('december_capital_infinitive');
            default:
                console.warn('12 month is ... ? I think it is error')
        }
    }

    static getMonthStringCommonShort(m: number) {
        switch (m) {
            case 0:
                return i18nGet('january_capital_short');
            case 1:
                return i18nGet('february_capital_short');
            case 2:
                return i18nGet('march_capital_short');
            case 3:
                return i18nGet('april_capital_short');
            case 4:
                return i18nGet('may_capital_short');
            case 5:
                return i18nGet('june_capital_short');
            case 6:
                return i18nGet('july_capital_short');
            case 7:
                return i18nGet('august_capital_short');
            case 8:
                return i18nGet('september_capital_short');
            case 9:
                return i18nGet('october_capital_short');
            case 10:
                return i18nGet('november_capital_short');
            case 11:
                return i18nGet('december_capital_short');
            default:
                console.warn('12 month is ... ? I think it is error')
        }
    }

    static getCurrentThreeMonthMonths(date: Date): number[] {
        switch (date.getMonth()) {
            case 0:
            case 1:
            case 11:
                return [-1, 0, 1];
            case 2:
            case 3:
            case 4:
                return [2, 3, 4];
            case 5:
            case 6:
            case 7:
                return [5, 6, 7];
            default:
                return [8, 9, 10];
        }
    }

    static makeDateWithMonthAsString(date: Date) {
        return '' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' +
            DateHelper.getMonthStringPossesive(date.getMonth()) + ' ' +
            date.getFullYear()
    }

    static makeDateWithMonthAsNumber(date: Date) {
        return '' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + '.' +
            ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '.' +
            date.getFullYear()
    }

    static makeTimewithDateWithMonthAsString(date: Date) {
        const hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
        const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
        return '' + hours + ":" + minutes + "  " +
            (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' +
            DateHelper.getMonthStringPossesive(date.getMonth()) + ' ' +
            date.getFullYear()
    }
}
