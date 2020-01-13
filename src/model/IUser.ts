export interface IUser {
    name?: string,
    id?: string,
    email?: string,

    loading?: boolean

    isAuthed?: boolean
    isPendingVerification?: boolean
}