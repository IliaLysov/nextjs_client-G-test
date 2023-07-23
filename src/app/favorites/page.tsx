'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { manyProductsGet, cartProductSelector, userSelector } from '@/modules'
import styles from './page.module.scss'

export default function Favorites() {
    const dispatch = useAppDispatch()
    
    const user = useAppSelector(userSelector)
    
    useEffect(() => {
        if (user.auth) {
            if (user.favorite) {
                const userFavorite: string[] = user.favorite
                dispatch(manyProductsGet(userFavorite))
            }

        } else {
            const stringItemsArray = localStorage.getItem('localCart')
            if (stringItemsArray) {
                const idArray = JSON.parse(stringItemsArray)
                dispatch(manyProductsGet(idArray))
            }
        }
    }, [])

    const products = useAppSelector(cartProductSelector)

    return (
        <div className={styles.wrapper}>
            <h1>Favorites</h1>
            {products.map((item, i) => {
                return <div key={i}>{item.name}</div>
            })}
        </div>
    )
}