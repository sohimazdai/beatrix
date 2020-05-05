export interface IUser {
    name?: string
    id?: string
    email?: string
    authType?: AuthType

    loading?: boolean
    error?: any

    isAuthed?: boolean
    isPendingVerification?: boolean
}

export enum AuthType {
    GOOGLE = "google",
}
