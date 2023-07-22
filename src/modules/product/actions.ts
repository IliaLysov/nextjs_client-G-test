import {createAction} from '@reduxjs/toolkit'
import { ProductInterface, ProductType } from '@/types/product'

export const setProducts = createAction<ProductInterface[]>('SET_PRODUCTS')
export const setProduct = createAction<ProductType>('SET_PRODUCT')
export const setCartProducts = createAction<ProductInterface[]>('SET_CART_PRODUCTS')