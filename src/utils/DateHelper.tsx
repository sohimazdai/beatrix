export class DateHelper {
    get today() {
        return new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime();
    }

    get yesterday() {
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

    static getPreviousMonthDate(date_: Date) {
        let date = date_;
        if (typeof date != 'string') {
            date = new Date(date)
        }
        return new Date(
            date.getFullYear(),
            date.getMonth() - 1,
            DateHelper.getMaxDateOfPreviousMonth(date)
        )
    }

    static getNextMonthDate(date_: Date | number) {
        let date = date_;
        if (typeof date != 'string') {
            date = new Date(date)
        }
        return new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            DateHelper.getMaxDateOfNextMonth(date)
        )
    }

    static getMaxDateOfNextMonth(date: Date) {
        return new Date(
            date.getFullYear(),
            date.getMonth() + 2,
            0
        ).getDate()
    }

    static getMaxDateOfPreviousMonth(date: Date) {
        return new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate()
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
}