import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setUser, setAuthErrorMessage, setPending } from './actions'
import { RootState } from '@/redux/store'




const user = createReducer({auth: false}, (builder) => {
    builder.addCase(setUser, (state, {payload}) => payload)
})

const errorMessage = createReducer('', (builder) => {
    builder.addCase(setAuthErrorMessage, (state, {payload}) => payload)
})

const pending = createReducer(false, (builder) => {
    builder.addCase(setPending, (state, {payload}) => payload)
})



const userSelector = (state: RootState) => state.rootReducer.auth.user
const errorMessageSelector = (state: RootState) => state.rootReducer.auth.errorMessage
const pendingSelector = (state: RootState) => state.rootReducer.auth.pending




export {userSelector, errorMessageSelector, pendingSelector}
export default combineReducers({
    user,
    errorMessage,
    pending
})