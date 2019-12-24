export class DateHelper {
    static today() {
        return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
    }

    static yesterday() {
        return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() - 1).getTime();
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
                return 'января';
            case 1:
                return 'февраля';
            case 2:
                return 'марта';
            case 3:
                return 'апреля';
            case 4:
                return 'мая';
            case 5:
                return 'июня';
            case 6:
                return 'июля';
            case 7:
                return 'августа';
            case 8:
                return 'сентября';
            case 9:
                return 'октября';
            case 10:
                return 'ноября';
            case 11:
                return 'декабря';
            default:
                console.warn('12 month is ... ? I think it is error')
        }
    }

    static getMonthStringCommon(m: number) {
        switch (m) {
            case 0:
                return 'Январь';
            case 1:
                return 'Февраль';
            case 2:
                return 'Март';
            case 3:
                return 'Апрель';
            case 4:
                return 'Май';
            case 5:
                return 'Июнь';
            case 6:
                return 'Июль';
            case 7:
                return 'Август';
            case 8:
                return 'Сентябрь';
            case 9:
                return 'Октябрь';
            case 10:
                return 'Ноябрь';
            case 11:
                return 'Декабрь';
            default:
                console.warn('12 month is ... ? I think it is error')
        }
    }

    static getMonthStringCommonShort(m: number) {
        switch (m) {
            case 0:
                return 'Янв';
            case 1:
                return 'Фев';
            case 2:
                return 'Март';
            case 3:
                return 'Апр';
            case 4:
                return 'Май';
            case 5:
                return 'Июнь';
            case 6:
                return 'Июль';
            case 7:
                return 'Авг';
            case 8:
                return 'Сент';
            case 9:
                return 'Окт';
            case 10:
                return 'Нояб';
            case 11:
                return 'Дек';
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
}