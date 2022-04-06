export type INotification = {
    id: string,
    versionAndroidFrom: string,
    versionAndroidTo: string,
    versionIOsFrom: string,
    versionIOsTo: string,
    isForAllUsers: boolean,
    title: string,
    text: string,
    createdAt: Date,
}

export type INotificationsList = {
    list: INotification[]
    seenList: string[],
};