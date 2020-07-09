export interface IUser {
    name?: string
    id?: string
    email?: string
    authType?: AuthType

    installationId?: string

    loading?: boolean
    installationLoading?: boolean
    syncLoading?: boolean
    exportLoading?: boolean
    error?: any

    isAuthed?: boolean
    isPendingVerification?: boolean
}

export enum AuthType {
    GOOGLE = "google",
}
