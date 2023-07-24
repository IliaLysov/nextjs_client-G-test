import { cartItemInterface } from '@/types/cart'
import { FiltersInterface } from '@/types/filter'
import {createAction} from '@reduxjs/toolkit'

export const productPost = createAction<FormData>('PRODUCT_POST')
export const allProductsGet = createAction<{skip: number, appliedFilters: FiltersInterface | null, sort: any}>('ALL_PRODUCT_GET')
export const ownProductsGet = createAction<{skip: number, appliedFilters: FiltersInterface | null, sort: any}>('OWN_PRODUCTS_GET')
export const deleteProductPost = createAction<string>('DELETE_PRODUCT_POST')
export const updateProductPost = createAction<FormData>('UPDATE_PRODUCT_POST')

export const oneProductGet = createAction<string>('OWN_PRODUCT_GET')
export const manyProductsGet = createAction<string[]>('MANY_PRODUCTS_GET')