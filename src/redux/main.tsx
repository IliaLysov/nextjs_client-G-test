'use client'

import { useEffect } from "react"
import { addToCardPost, checkAuth } from "@/modules/auth"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { setauthPending } from "@/modules/auth"
import { cartSelector, favoriteSelector, setCart, setFavorite, userSelector } from "@/modules"
import { cartItemInterface } from "@/types/cart"
import { cartComparison, stringArrayComparison } from "@/utils/compare"

export default function Main({
    children,
  }: {
    children: React.ReactNode
  }) {
    const dispatch = useAppDispatch()

    const user = useAppSelector(userSelector)
    const cart = useAppSelector(cartSelector)
    const favorite = useAppSelector(favoriteSelector)
    
    useEffect(() => {
      // dispatch(setauthPending(true))
      dispatch(checkAuth())
    }, [])

    useEffect(() => {
      if (user.auth) {
        if (user.cart) {
          const userCart: cartItemInterface[] = user.cart
          const comparison = cartComparison(userCart, cart)
          !comparison && dispatch(setCart(userCart))
        }
        if (user.favorite) {
          const userFavorite: string[] = user.favorite
          const comparison = stringArrayComparison(userFavorite, favorite)
          !comparison && dispatch(setFavorite(userFavorite))
        }
      } else {
        const localCart: any = localStorage.getItem('localCart')
        localCart && dispatch(setCart(JSON.parse(localCart)))
        const localFavorite: any = localStorage.getItem('localFavorite')
        localFavorite && dispatch(setFavorite(JSON.parse(localFavorite)))
      }
    }, [user.auth])

    // useEffect(() => {
    //   if (user.auth) {
    //     if (user.cart) {
    //       const userCart: cartItemInterface[] = user.cart
    //       const comparison = cartComparison(userCart, cart)
    //       !comparison && dispatch(addToCardPost(cart))
    //     }
    //   }
    // }, [cart])

    return <div>{children}</div>
}