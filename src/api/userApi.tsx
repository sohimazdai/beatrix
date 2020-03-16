import { api } from './api';
import { IUser } from '../model/IUser';

export class UserApi {
    static syncUser(user: IUser) {
        return api.axios.post('user/sync', user)
    }

    static getUser(userId: string) {
        return api.axios.get('user', { params: { userId } })
    }
}
