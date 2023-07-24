import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setProducts, setProduct, setCartProducts, setFilters, setAppliedFilters } from './actions'
import { ProductInterface, ProductType } from '@/types/product'
import { RootState } from '@/redux/store'
import { FiltersInterface } from '@/types/filter'


const products = createReducer(<ProductInterface[]>[], (builder) => {
    builder.addCase(setProducts, (state, {payload}) => payload)
})

const product = createReducer(<ProductType>null, (builder) => {
    builder.addCase(setProduct, (state, {payload}) => payload)
})

const filters = createReducer(<FiltersInterface | null>null, (builder) => {
    builder.addCase(setFilters, (state, {payload}) => payload)
})

const cartProducts = createReducer(<ProductInterface[]>[], (builder) => {
    builder.addCase(setCartProducts, (state, {payload}) => payload)
})

const appliedFilters = createReducer(<FiltersInterface | null>null, (builder) => {
    builder.addCase(setAppliedFilters, (state, {payload}) => payload)
})

const productsSelector = (state: RootState) => state.rootReducer.product.products
const productSelector = (state: RootState) =>  state.rootReducer.product.product
const filtersSelector = (state: RootState) => state.rootReducer.product.filters
const cartProductSelector = (state: RootState) =>  state.rootReducer.product.cartProducts
const appliedFiltersSelector = (state: RootState) => state.rootReducer.product.appliedFilters

export { productsSelector, productSelector, cartProductSelector, filtersSelector, appliedFiltersSelector}
export default combineReducers({
    products,
    product,
    filters,
    cartProducts,
    appliedFilters
})