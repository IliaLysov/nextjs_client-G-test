import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setUser, setAuthErrorMessage, setauthPending } from './actions'
import { RootState } from '@/redux/store'
import { UserInterface } from '@/types/auth'


const user = createReducer({auth: false}, (builder) => {
    builder.addCase(setUser, (state, {payload}) => payload)
})

const errorMessage = createReducer('', (builder) => {
    builder.addCase(setAuthErrorMessage, (state, {payload}) => payload)
})

const authPending = createReducer(true, (builder) => {
    builder.addCase(setauthPending, (state, {payload}) => payload)
})


const userSelector = ({rootReducer: {auth: {user}}}: {rootReducer: {auth: {user: UserInterface}}}) => user
const errorMessageSelector = (state: RootState) => state.rootReducer.auth.errorMessage
const authPendingSelector = (state: RootState) => state.rootReducer.auth.authPending




export {userSelector, errorMessageSelector, authPendingSelector}
export default combineReducers({
    user,
    errorMessage,
    authPending
})
