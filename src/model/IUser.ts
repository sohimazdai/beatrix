export interface IUser {
    name?: string
    id?: string
    email?: string

    loading?: boolean
    error?: any

    isAuthed?: boolean
    isPendingVerification?: boolean
}
