import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setModal } from './actions'
import { RootState } from '@/redux/store'


const modal = createReducer({status: false, type: ''}, (builder) => {
    builder.addCase(setModal, (state, {payload}) => payload)
})

const modalSelector = (state: RootState) => state.rootReducer.common.modal

export {modalSelector}
export default combineReducers({
    modal
})