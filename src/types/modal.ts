export enum ModalTypeEnum {
    Empty = '',
    LogIn = 'LOGIN',
    Registration = 'REGISTRATION',
    Loading = 'LOADING',
    ItemForm = 'ITEM_FORM',
    Success = 'SUCCESS',
    Error = 'ERROR'
}

export type ModalType = ModalTypeEnum[keyof ModalTypeEnum]


export interface ModalInterface {
    status: boolean,
    type: ModalType,
    data?: any
}



