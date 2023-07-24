'use client'

import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { allProductsGet, productsSelector, setProducts, setProduct, ownProductsGet, setModal, modalSelector, userSelector, setCart, cartSelector, addToCardPost, favoriteSelector, setFavorite, addToFavoritePost, filtersSelector, appliedFiltersSelector, setAppliedFilters } from '@/modules'
import { useRouter } from 'next/navigation'
import { ProductOwnerTypeEnum } from '@/types/product'
import { ModalTypeEnum } from '@/types/modal'
import { Item } from '@/components'
import { cartItemInterface } from '@/types/cart'
import { cartComparison, compareObjects, stringArrayComparison } from '@/utils/compare'
import { Filters } from '@/components'
import { FiltersInterface } from '@/types/filter'


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
    const favorite = useAppSelector(favoriteSelector)

    //filters-----------------------------------------------

    const initialFilters: FiltersInterface | null = useAppSelector(filtersSelector)
    const appliedFilters: FiltersInterface | null = useAppSelector(appliedFiltersSelector)
    const [newFilters, setNewFilters] = useState<FiltersInterface | null>(null)

    useEffect(() => {
        if (appliedFilters) {
            setNewFilters(appliedFilters)
        } else {
            if (initialFilters) {
                setNewFilters(initialFilters)
                dispatch(setAppliedFilters(initialFilters))
            }
        }
    }, [initialFilters])

    const updateItemsByFilters = () => {
        dispatch(get({skip: 0, appliedFilters: newFilters, sort: {}}))
    }

    const resetFilters = () => {
        dispatch(get({skip: 0, appliedFilters: null, sort: {}}))
        initialFilters && dispatch(setAppliedFilters(null))
        if (initialFilters) {
            setNewFilters(initialFilters)
        }
    }

    useEffect(() => {
        setLimit(initialLimit)
        setItems(newItems)
    }, [appliedFilters])

    //-----------------------------------------------
        
    useEffect(() => {
        items.length === 0 && dispatch(get({skip: 0, appliedFilters: null, sort: {}}))
        return () => {
            dispatch(setProducts([]))
        }
    }, [])

    useEffect(() => {
        items.length === 0 ? setItems(newItems) :
        limit > items.length && items.length % initialLimit === 0 && setItems([...items, ...newItems])

        // limit > items.length && items.length % initialLimit === 0 ? setItems([...items, ...newItems]) :
        // setItems(newItems)

    }, [newItems])

    // console.log('newItems in items', newItems)
    // console.log('items in items', items)

    useEffect(() => {
        setItems(newItems)
    }, [modal])

    const showMore = () => {
        dispatch(get({skip: limit, appliedFilters: appliedFilters, sort: {}}))
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
        const existance = cart.some((obj: cartItemInterface) => obj.id === item._id)
        const newCart = existance ? cart.filter(el => el.id !== item._id) : [...cart, {id: item._id, count: 1}]
        dispatch(setCart(newCart))
        if (user.auth) {
            if (user.cart) {
                const userCart: cartItemInterface[] = user.cart
                const comparison = cartComparison(userCart, newCart)
                !comparison && dispatch(addToCardPost(newCart))
            } else {
                dispatch(addToCardPost(newCart))
            }
        } else {
            dispatch(setCart(newCart))
            const localCart = JSON.stringify(newCart)
            localStorage.setItem('localCart', localCart)
        }
    }

    const handleFavorite = (item: any) => {
        const existance = favorite.some((id: string) => id === item._id)
        const newFavorite = existance ? favorite.filter(el => el !== item._id) : [...favorite, item._id]
        dispatch(setFavorite(newFavorite))
        if (user.auth) {
            if (user.favorite) {
                const userFavorite: string[] = user.favorite
                const comparison = stringArrayComparison(userFavorite, newFavorite)
                !comparison && dispatch(addToFavoritePost(newFavorite))
            } else {
                dispatch(addToFavoritePost(newFavorite))
            }
        } else {
            dispatch(setFavorite(newFavorite))
            const localFavorite = JSON.stringify(newFavorite)
            localStorage.setItem('localFavorite', localFavorite)
        }
    }

    return (
        <>
            {initialFilters && newFilters && <Filters filters={initialFilters} newFilters={newFilters} setNewFilters={setNewFilters} update={updateItemsByFilters} appliedFilters={appliedFilters} resetFilters={resetFilters}/>}
            <div className={styles.items}>
                {type === ProductOwnerTypeEnum.Owner && <div className={styles.item} onClick={() => dispatch(setModal({status: true, type: ModalTypeEnum.ItemForm}))}>+</div>}
                {items.map((item: any, idx: number) => {
                    const cartExistance = cart.some((obj: cartItemInterface) => obj.id === item._id)
                    const favoriteExistance = favorite.includes(item._id)
                    return <li key={idx} onClick={() => linkTo(item)}>
                        <Item item={item} profile={moveToProfile} handleCart={handleCart} inCart={cartExistance} handleFavorite={handleFavorite} inFavorite={favoriteExistance}/>
                    </li>})}
                {items.length === limit && <button onClick={() => showMore()}>Больше</button>}
            </div>
        </>
    )
}