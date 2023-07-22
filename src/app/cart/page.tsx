'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { manyProductsGet, cartProductSelector, userSelector } from '@/modules'
import styles from './page.module.scss'
import { cartItemInterface } from '@/types/cart'

export default function Cart() {
    const dispatch = useAppDispatch()
    
    const user = useAppSelector(userSelector)
    
    useEffect(() => {
        if (user.auth) {
            if (user.cart) {
                const userCart: cartItemInterface[] = user.cart
                const idArray = userCart.map((e: cartItemInterface) => e.id)
                dispatch(manyProductsGet(idArray))
            }

        } else {
            const stringItemsArray = localStorage.getItem('localCart')
            if (stringItemsArray) {
                const itemsArray = JSON.parse(stringItemsArray)
                const idArray = itemsArray.map((e: cartItemInterface) => e.id)
                dispatch(manyProductsGet(idArray))
            }
        }
    }, [])

    const products = useAppSelector(cartProductSelector)

    return (
        <div className={styles.wrapper}>
            <h1>Cart</h1>
            {products.map((item, i) => {
                return <div key={i}>{item.name}</div>
            })}
        </div>
    )
}