import { api } from './api';

export class NotificationsApi {
    static getNotifications(userId: string) {
        return api.post('notifications/get', { userId });
    }

    static setSeenNotifications(userId: string, notificationIds: string[]) {
        return api.post('notifications/seen', { userId, notificationIds });
    }
}
