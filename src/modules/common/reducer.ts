import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setCart, setFavorite, setModal } from './actions'
import { RootState } from '@/redux/store'
import { ModalInterface } from '@/types/modal'
import { cartItemInterface } from '@/types/cart'


const modal = createReducer(<ModalInterface>{status: false, type: ''}, (builder) => {
    builder.addCase(setModal, (state, {payload}) => payload)
})

const cart = createReducer(<cartItemInterface[]>[], (builder) => {
    builder.addCase(setCart, (state, {payload}) => payload)
})

const favorite = createReducer(<string[]>[], (builder) => {
    builder.addCase(setFavorite, (state, {payload}) => payload)
})

const modalSelector = (state: RootState) => state.rootReducer.common.modal
const cartSelector = (state: RootState) => state.rootReducer.common.cart
const favoriteSelector = (state: RootState) => state.rootReducer.common.favorite

export {modalSelector, cartSelector, favoriteSelector}
export default combineReducers({
    modal,
    cart,
    favorite
})