'use client'

import React from 'react';
import styles from './styles.module.scss'
import { ModalTypeEnum, ModalType } from '@/types/modal';


export default function NotAuthDropdownMenu({menuRef, modalHandler}: {menuRef: React.ForwardedRef<HTMLDivElement>, modalHandler: (type: ModalType) => void}) {

    return (
        <div className={styles.menu} ref={menuRef}>
            <div className={styles.menuItem} onClick={() => modalHandler(ModalTypeEnum.LogIn)}>Войти</div>
            <div className={styles.menuItem} onClick={() => modalHandler(ModalTypeEnum.Registration)}>Зарегистрироваться</div>
        </div>
    )
}