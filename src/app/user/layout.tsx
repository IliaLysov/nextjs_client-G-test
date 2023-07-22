'use client'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { userSelector, authPendingSelector } from '@/modules/auth'
import { setModal } from '@/modules/common'
import { ModalTypeEnum } from '@/types/modal'
import { useRouter } from 'next/navigation'
import styles from './page.module.scss'


export default function UserLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const router = useRouter()
    const dispatch = useAppDispatch()
    let auth = useAppSelector(userSelector).auth
    let authPending = useAppSelector(authPendingSelector)

    useEffect(() => {
        if (!auth && !authPending) {
            router.push('/')
            dispatch(setModal({status: true, type: ModalTypeEnum.LogIn}))
        }
    }, [auth, authPending])

    return (auth &&
      <div>{children}</div>
    )
  }