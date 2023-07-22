'use client'

import styles from './styles.module.scss'
import {Navigation, UserIcon, NavIcon} from '@/components'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { cartSelector } from '@/modules'

export default function Header() {
    // const [cartNot, setCartNot] = useState<number>(0)
    
    const cart = useAppSelector(cartSelector)

    // useEffect(() => {
    //     setCartNot(cart.length)
    // }, [cart])

    return (
        <header className={styles.wrapper}>
            <Link href='/' className={styles.logo}>GARDENER</Link>
            <nav className={styles.navigation}>
                <Navigation link={{href: '/', name: 'Главная'}}/>
                <Navigation link={{href: '/catalog', name: 'Каталог'}}/>
            </nav>
            <div className={styles.side}>
                <NavIcon nav='cart' count={cart.length}/>
                <UserIcon />
            </div>
        </header>
    )
}
