'use client'

import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { allProductsGet, productsSelector, setProducts, setProduct, ownProductsGet, setModal, modalSelector, userSelector, setCart, cartSelector, addToCardPost } from '@/modules'
import { useRouter } from 'next/navigation'
import { ProductOwnerTypeEnum } from '@/types/product'
import { ModalTypeEnum } from '@/types/modal'
import { Item } from '@/components'
import { cartItemInterface } from '@/types/cart'
import { cartComparison } from '@/utils/compare'

export default function Items({type}: {type: string}) {
    const router = useRouter()
    const initialLimit = 10
    const [items, setItems] = useState<any[]>([])
    const [limit, setLimit] = useState<number>(initialLimit)
    const dispatch: any = useAppDispatch()

    let get: any

    if (type === ProductOwnerTypeEnum.General) {
        get = allProductsGet
    } else if (type === ProductOwnerTypeEnum.Owner) {
        get = ownProductsGet
    } else {
        console.error('Invalid items type')
    }

    
    let newItems = useAppSelector(productsSelector)
    let modal = useAppSelector(modalSelector)
    const user = useAppSelector(userSelector)
    const cart = useAppSelector(cartSelector)
    
    useEffect(() => {
        items.length === 0 && dispatch(get({skip: 0, filter: {}, sort: {}}))
        return () => {
            dispatch(setProducts([]))
        }
    }, [])

    useEffect(() => {
        limit > items.length && items.length % initialLimit === 0 && setItems([...items, ...newItems])

    }, [newItems])

    useEffect(() => {
        setItems(newItems)
    }, [modal])

    const showMore = () => {
        dispatch(get({skip: limit, filter: {}, sort: {}}))
        setLimit(prev => items.length === limit ? prev + initialLimit : prev)
    }

    const linkTo = (item: any) => {
        if (type === ProductOwnerTypeEnum.General) {
            dispatch(setProduct(item))
            const {name, _id} = item 
            const link = name.toLocaleLowerCase().split(' ').join('-') + `-${_id}`
            router.push(`/catalog/${link}`)
        } else if (type === ProductOwnerTypeEnum.Owner) {
            dispatch(setModal({status: true, type: ModalTypeEnum.ItemForm, data: item}))
        } else {
            console.error('Invalid items type')
        }
    }

    const moveToProfile = (name: string) => {
        router.push(`/${name}`)
    }

    const handleCart = (item: any) => {
        if (user.auth) {
            const existance = cart.some((obj: cartItemInterface) => obj.id === item._id)

            if (!existance) {
                const newCart = [...cart, {id: item._id, count: 1}]
                dispatch(setCart(newCart))
                if (user.cart) {
                    const userCart: cartItemInterface[] = user.cart
                    const comparison = cartComparison(userCart, newCart)
                    !comparison && dispatch(addToCardPost(newCart))
                } else {
                    dispatch(addToCardPost(newCart))
                }
            } else {
                const newCart = cart.filter(el => el.id !== item._id)
                dispatch(setCart(newCart))
                if (user.cart) {
                    const userCart: cartItemInterface[] = user.cart
                    const comparison = cartComparison(userCart, newCart)
                    !comparison && dispatch(addToCardPost(newCart))
                } else {
                    dispatch(addToCardPost(newCart))
                }
            }

        } else {
            const existance = cart.some((obj: cartItemInterface) => obj.id === item._id)

            if (!existance) {
                const newCart = [...cart, {id: item._id, count: 1}]
                dispatch(setCart(newCart))
                const localCart = JSON.stringify(newCart)
                localStorage.setItem('localCart', localCart)
            } else {
                const newCart = cart.filter(el => el.id !== item._id)
                dispatch(setCart(newCart))
                const localCart = JSON.stringify(newCart)
                localStorage.setItem('localCart', localCart)
            }
        }

    }

    return (
        <>
            <div className={styles.items}>
                {type === ProductOwnerTypeEnum.Owner && <div className={styles.item} onClick={() => dispatch(setModal({status: true, type: ModalTypeEnum.ItemForm}))}>+</div>}
                {items.map((item: any, idx: number) => {
                    const existance = cart.some((obj: cartItemInterface) => obj.id === item._id)
                    return <li key={idx} onClick={() => linkTo(item)}>
                        <Item item={item} profile={moveToProfile} handleCart={handleCart} inCart={existance}/>
                    </li>})}
            </div>
            {items.length === limit && <button onClick={() => showMore()}>Больше</button>}
        </>
    )
}