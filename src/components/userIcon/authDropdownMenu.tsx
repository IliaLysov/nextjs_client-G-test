'use client'

import React from 'react';
import styles from './styles.module.scss'
import { useAppDispatch } from '@/hooks/redux'
import { logOutPost } from '@/modules/auth'
import Link from 'next/link'



export default function AuthDropdownMenu({menuRef, setMenuStatus}: {menuRef: React.ForwardedRef<HTMLDivElement>, setMenuStatus: (action: boolean) => void}) {
    const dispatch = useAppDispatch()

    return (
        <div className={styles.menu} ref={menuRef}>
            <Link href='/user' className={styles.menuItem} onClick={() => setMenuStatus(false)}>Профиль</Link>
            <div className={styles.menuItem} onClick={() => {dispatch(logOutPost()); setMenuStatus(false)}}>Выйти</div>
        </div>
    )
}