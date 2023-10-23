import { CommonData } from "../CommonData"

export class UserModel {
    employeeName: string
    userName: string
    role: UserRole
    status: UserStatus
    password: string
}

export enum UserRole {
    admin ='Admin',
    ess = 'ESS'
}
export enum UserStatus {
    enabled = 'Enabled',
    disabled = 'Disabled'
}