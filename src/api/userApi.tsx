import { api } from './api';
import { IUser } from '../model/IUser';
import { IUserPropertiesShedule } from '../model/IUserPropertiesShedule';

export class UserApi {
    static syncUser(user: IUser) {
        return api.axios.post('user/sync', user)
    }

    static getUser(userId: string) {
        return api.axios.get('user', { params: { userId } })
    }

    static updateShedule(userId: string, shedule: IUserPropertiesShedule) {
        return api.axios.post('user/shedule', {userId, shedule})
    }
}
