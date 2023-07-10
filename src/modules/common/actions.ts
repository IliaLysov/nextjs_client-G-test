import {createAction} from '@reduxjs/toolkit'
import { ModalInterface, ModalTypeEnum } from "@/types/modal"

export const setModal = createAction<ModalInterface>('SET_MODAL')