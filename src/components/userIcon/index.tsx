'use client'

import { useState, useEffect, useRef } from 'react'
import styles from './styles.module.scss'
import userImg from '@/images/user-default.png'
import Image from 'next/image'
 
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { userSelector } from '@/modules/auth'
import { setModal } from '@/modules/common'
import { ModalType, ModalTypeEnum } from '@/types/modal'
import NotAuthDropdownMenu from './notAuthDropdownMenu'
import AuthDropdownMenu from './authDropdownMenu'


export default function UserIcon() {

    const dispatch = useAppDispatch()

    const [menuStatus, setMenuStatus] = useState(false)

    const auth = useAppSelector(userSelector).auth

    const menuRef = useRef<HTMLDivElement>(null)
    const userRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node) && !userRef.current?.contains(event.target as Node)) {
                setMenuStatus(false)
            }}
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {document.removeEventListener('mousedown', handleOutsideClick)}
    }, [])

    const modalHandler = (type: ModalType) => {
        dispatch(setModal({status: true, type: type}))
        setMenuStatus(false)
    }

    const menu = () => {
        if (auth) {
            return <AuthDropdownMenu menuRef={menuRef} setMenuStatus={setMenuStatus}/>
        } else {
            return <NotAuthDropdownMenu menuRef={menuRef} modalHandler={modalHandler}/>
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.user} onClick={() => setMenuStatus(!menuStatus)} ref={userRef}>
                <Image src={userImg} alt="user" className={styles.userImg} loading='eager'/>
            </div>
            {menuStatus && menu()}
        </div>
    )
}