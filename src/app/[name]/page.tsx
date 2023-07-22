'use client'

import styles from './page.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { productSelector, oneProductGet } from '@/modules'
import { useEffect } from 'react'

export default function Profile({params: {name}}: {params: {name: string}}) {
    const dispatch = useAppDispatch()
    // const item = useAppSelector(productSelector)

    // useEffect(() => {
    //     if (!item) {
    //         const arr = id.split('-')
    //         const currentId = arr.pop()
    //         if (typeof currentId === 'string') {
    //             dispatch(oneProductGet(currentId))
    //         }
    //     }
    // }, [])

    return (
        <div className={styles.wrapper}>
            <h1>Profile page</h1>
            <h2>{name}</h2>
        </div>
    )
}