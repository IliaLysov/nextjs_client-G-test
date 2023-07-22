import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setProducts, setProduct, setCartProducts } from './actions'
import { ProductInterface, ProductType } from '@/types/product'
import { RootState } from '@/redux/store'


const products = createReducer(<ProductInterface[]>[], (builder) => {
    builder.addCase(setProducts, (state, {payload}) => payload)
})

const product = createReducer(<ProductType>null, (builder) => {
    builder.addCase(setProduct, (state, {payload}) => payload)
})

const cartProducts = createReducer(<ProductInterface[]>[], (builder) => {
    builder.addCase(setCartProducts, (state, {payload}) => payload)
})

const productsSelector = (state: RootState) => state.rootReducer.product.products
const productSelector = (state: RootState) =>  state.rootReducer.product.product
const cartProductSelector = (state: RootState) =>  state.rootReducer.product.cartProducts

export { productsSelector, productSelector, cartProductSelector}
export default combineReducers({
    products,
    product,
    cartProducts
})