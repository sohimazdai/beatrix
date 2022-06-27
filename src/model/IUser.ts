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

    isNeedToShowOnboarding?: boolean

    registeredOn?: Date
    reviewRequested?: boolean
    needToRequestReview?: boolean
    
    noteListSize?: number;
    earliestNoteDate?: number;
    noteListCurrentOffset?: number;
}

export enum AuthType {
    GOOGLE = "google",
}
