export interface CredentialBody {
    username: string
    password: string
}

export interface CreateUserBody {
    name: string
    username: string
    password: string
    email: string
}

export interface ChangePasswordBody {
    id: number
    oldPassword: string
    newPassword: string
}

export interface ResetPasswordBody {
    id: number
    password: string
}