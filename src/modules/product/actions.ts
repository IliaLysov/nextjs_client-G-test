import {createAction} from '@reduxjs/toolkit'
import { ProductInterface, ProductType } from '@/types/product'
import { FiltersInterface } from '@/types/filter'

export const setProducts = createAction<ProductInterface[]>('SET_PRODUCTS')
export const setProduct = createAction<ProductType>('SET_PRODUCT')
export const setFilters = createAction<FiltersInterface>('SET_FILTERS')
export const setCartProducts = createAction<ProductInterface[]>('SET_CART_PRODUCTS')

export const setAppliedFilters = createAction<FiltersInterface | null>('SET_APPLIED_FILTERS')