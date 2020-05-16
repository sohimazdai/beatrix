import { api } from './api';

export class AppApi {
    static ping() {
        return api.post('ping');
    }
}
