import {createAction} from '@reduxjs/toolkit'
import { UserInterface } from '@/types/auth'


export const setUser = createAction<UserInterface>('SET_USER')
export const setAuthErrorMessage = createAction<string>('SET_AUTH_ERROR_MESSAGE')
export const setauthPending = createAction<boolean>('SET_authPending')