import {createAction} from '@reduxjs/toolkit'
import { RegistrationInterface, LogInInterface } from '@/types/auth'



export const logInPost = createAction<LogInInterface>('LOG_IN_POST')
export const registrationPost = createAction<RegistrationInterface>('REGISTRATION_POST')
export const checkAuth = createAction('CHECK_AUTH')
export const logOutPost = createAction('LOG_OUT_POST')