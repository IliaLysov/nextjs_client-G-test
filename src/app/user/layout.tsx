'use client'

// import styles from './page.module.scss'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { userSelector, pendingSelector } from '@/modules/auth'
import { setModal } from '@/modules/common'
import { ModalTypeEnum } from '@/types/modal'
import { useRouter } from 'next/navigation'

export default function UserLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    const router = useRouter()
    const dispatch = useAppDispatch()
    let auth = useAppSelector(userSelector).auth
    let pending = useAppSelector(pendingSelector)

    useEffect(() => {
        if (!auth && !pending) {
            router.push('/')
            dispatch(setModal({status: true, type: ModalTypeEnum.LogIn}))
        }
    }, [auth, pending])



    return (auth ?
      <div>{children}</div>
      : null
    )
  }