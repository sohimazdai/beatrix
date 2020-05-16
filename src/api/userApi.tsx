import { api } from './api';
import { IUser } from '../model/IUser';
import { IUserPropertiesShedule } from '../model/IUserPropertiesShedule';

export class UserApi {
    static syncUser(user: IUser) {
        return api.post('user/sync', user)
    }

    static updateShedule(userId: string, shedule: IUserPropertiesShedule) {
        return api.post('user/shedule', {userId, shedule})
    }
}
