import { api } from './api';
import { IUser } from '../model/IUser';
import { IUserPropertiesShedule } from '../model/IUserPropertiesShedule';
import { IUserDiabetesProperties } from '../model/IUserDiabetesProperties';

export class UserApi {
    static syncUser(user: IUser) {
        return api.post('user/sync', { user });
    }

    static getUserByInstallationId(installationId: string) {
        return api.post('user/installation', { installationId })
    }

    static clearInstallationId(userId: string) {
        return api.post('/user/installation/clear', { userId })
    }

    static updateShedule(userId: string, shedule: IUserPropertiesShedule) {
        return api.post('user/shedule', { userId, shedule })
    }

    static syncUserProperties(userId: string, properties: IUserDiabetesProperties, idsToConvert: string[]) {
        return api.post('/user/properties/sync', { userId, properties, idsToConvert })
    }
}
