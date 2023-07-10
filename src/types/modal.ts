export enum ModalTypeEnum {
    Empty = '',
    LogIn = 'LOGIN',
    Registration = 'REGISTRATION',
    Loading = 'LOADING'
}

export type ModalType = ModalTypeEnum[keyof ModalTypeEnum]

export interface ModalInterface {
    status: boolean,
    type: ModalType
}



