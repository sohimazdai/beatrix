export type INotification = {
    id: string,
    versionFrom: string,
    versionTo: string,
    isForAllUsers: boolean,
    regionsToShow: string[],
    title: string,
    text: string,
    createdAt: Date,
}

export type INotificationsList = {
    list: INotification[]
    seenList: string[],
};