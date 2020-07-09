import { api } from './api';

export class ExportApi {
    static exportNotes(
        userId: string,
        titles: { [key: string]: string },
        from: number,
        to: number,
        stats: any,
    ) {
        return api.post('export', { userId, titles, from, to, stats });
    }
}
