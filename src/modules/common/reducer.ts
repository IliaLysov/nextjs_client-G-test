import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setCart, setModal } from './actions'
import { RootState } from '@/redux/store'
import { ModalInterface } from '@/types/modal'
import { cartItemInterface } from '@/types/cart'


const modal = createReducer(<ModalInterface>{status: false, type: ''}, (builder) => {
    builder.addCase(setModal, (state, {payload}) => payload)
})

const cart = createReducer(<cartItemInterface[]>[], (builder) => {
    builder.addCase(setCart, (state, {payload}) => payload)
})

const modalSelector = (state: RootState) => state.rootReducer.common.modal
const cartSelector = (state: RootState) => state.rootReducer.common.cart

export {modalSelector, cartSelector}
export default combineReducers({
    modal,
    cart
})