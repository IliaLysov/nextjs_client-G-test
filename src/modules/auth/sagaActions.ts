import {createAction} from '@reduxjs/toolkit'
import { RegistrationInterface, LogInInterface } from '@/types/auth'
import { cartItemInterface } from "@/types/cart";



export const logInPost = createAction<LogInInterface>('LOG_IN_POST')
export const registrationPost = createAction<RegistrationInterface>('REGISTRATION_POST')
export const checkAuth = createAction('CHECK_AUTH')
export const logOutPost = createAction('LOG_OUT_POST')
export const uploadAvatar = createAction<FormData>('UPLOAD_AVATAR')

export const addToCardPost = createAction<cartItemInterface[]>('ADD_TO_CARD_POST')
