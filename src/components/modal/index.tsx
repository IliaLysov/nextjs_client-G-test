'use client'

import React from 'react'
import styles from './styles.module.scss'
import {LogIn, Registration, ItemForm} from '@/components'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setModal, modalSelector } from '@/modules/common'
import { ModalTypeEnum } from '@/types/modal'


export default function ModalWindow() {
    const dispatch = useAppDispatch()
    const selectedModal = useAppSelector(modalSelector)

    const modalHandler = (event: React.MouseEvent<HTMLDivElement>) => {
      if (selectedModal.type !== ModalTypeEnum.Loading) {
        dispatch(setModal({status: false, type: ModalTypeEnum.Empty}))
      }
    }

    const content = () => {
      switch (selectedModal.type) {
        case ModalTypeEnum.LogIn:
          return <LogIn/>
        case ModalTypeEnum.Registration:
          return <Registration/>
        case ModalTypeEnum.ItemForm:
          return <ItemForm currentItem={selectedModal.data}/>
        case ModalTypeEnum.Success:
          return <div>
                  <div className={styles.success}>{selectedModal.data}</div>
                  <button onClick={() => dispatch(setModal({status: false, type: ModalTypeEnum.Empty}))}>Ок</button>
                </div>
        case ModalTypeEnum.Error:
          return <div>
                  <div className={styles.error}>{selectedModal.data}</div>
                  <button onClick={() => dispatch(setModal({status: false, type: ModalTypeEnum.Empty}))}>Ок</button>
                </div>
        case ModalTypeEnum.Loading:
          return <div>Loading...</div>
        default:
          return <div>Empty</div>
      }
    }

    return (selectedModal.status &&
      <div className={styles.wrapper} onClick={modalHandler}>
        <div className={styles.content} onClick={(event: React.MouseEvent<HTMLDivElement>) => event.stopPropagation()}>
          {content()}
        </div>
      </div>
    )
  }