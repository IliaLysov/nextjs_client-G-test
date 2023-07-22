'use client'

import { useEffect } from "react"
import { addToCardPost, checkAuth } from "@/modules/auth"
import { useAppDispatch, useAppSelector } from "@/hooks/redux"
import { setauthPending } from "@/modules/auth"
import { cartSelector, setCart, userSelector } from "@/modules"
import { cartItemInterface } from "@/types/cart"
import { cartComparison } from "@/utils/compare"

export default function Main({
    children,
  }: {
    children: React.ReactNode
  }) {
    const dispatch = useAppDispatch()

    const user = useAppSelector(userSelector)
    const cart = useAppSelector(cartSelector)
    
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
      } else {
        const localCart: any = localStorage.getItem('localCart')
        localCart && dispatch(setCart(JSON.parse(localCart)))
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