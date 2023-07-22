'use client'

import styles from './page.module.scss'
import Link from 'next/link'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { userSelector } from '@/modules'

export default function User() {
    const user = useAppSelector(userSelector)
    console.log(user)

    return (
        <div className={styles.wrapper}>
            <h1>User page</h1>
            <div className={styles.items}>
                {user.seller && <Link href='/user/products' className={styles.item}>Ваши товары</Link>}
            </div>
        </div>
    )
}