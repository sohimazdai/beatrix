import { SortType } from '../model/IExport';
import { api } from './api';

export class ExportApi {
    static exportNotes(
        userId: string,
        titles: { [key: string]: string },
        from: number,
        to: number,
        stats: any,
        timezoneOffset: number,
        locale: string,
        dateSort: SortType
    ) {
        return api.post(
            'export',
            { userId, titles, from, to, stats, timezoneOffset, locale, dateSort }
        );
    }

    static finishExport(userId: string) {
        return api.post('export/unlink', { userId });
    }
}
