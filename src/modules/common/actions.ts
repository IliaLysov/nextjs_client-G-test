import {createAction} from '@reduxjs/toolkit'
import { ModalInterface, ModalTypeEnum } from "@/types/modal"
import { cartItemInterface } from '@/types/cart'

export const setModal = createAction<ModalInterface>('SET_MODAL')
export const setCart = createAction<cartItemInterface[]>('SET_CART')