import { cartItemInterface } from "./cart"

export interface LogInInterface {
    email: string
    password: string
}

export interface RegistrationInterface {
    name: string
    email: string
    password: string
    cart?: cartItemInterface[]
    favorite?: string[]
}

export enum AuthorizationEnum {
    email = 'email',
    name = 'name',
    password = 'password'
}

export interface UserInterface {
    auth: boolean,
    id?: string,
    email?: string,
    name?: string,
    surname?: string
    isActivated?: boolean,
    seller?: boolean,
    avatar?: {
        Bucket: string,
        ETag: string,
        Key: string,
        Location: string
    }
    cart?: cartItemInterface[],
    favorite?: string[]
}