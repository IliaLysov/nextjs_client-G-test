'use client'

import React, {useState, useEffect} from 'react'
import styles from './styles.module.scss'

import { LogInInterface, AuthorizationEnum } from '@/types/auth'

import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { logInPost, errorMessageSelector, setAuthErrorMessage, userSelector } from '@/modules/auth'

export default function LogIn() {
    const [formValues, setFormValues] = useState<LogInInterface>({[AuthorizationEnum.email]: '', [AuthorizationEnum.password]: ''})

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(setAuthErrorMessage(''))
    }, [])

    const user = useAppSelector(userSelector)

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = event.target
        setFormValues((prevValues) => ({...prevValues, [name]: value}))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(logInPost(formValues))
    }

    return (
        <div className={styles.wrapper}>
            <h2>Вход</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputWrapper}>
                    <label htmlFor="email">Почта</label>
                    <input type="email" id={AuthorizationEnum.email} name={AuthorizationEnum.email} value={formValues[AuthorizationEnum.email]} onChange={handleChange}/>
                </div>
                <div className={styles.inputWrapper}>
                    <label htmlFor="password">Пароль</label>
                    <input type="password" id={AuthorizationEnum.password} name={AuthorizationEnum.password} value={formValues[AuthorizationEnum.password]} onChange={handleChange}/>
                </div>
                <button type='submit'>Войти</button>
            </form>
            <div className={styles.error}>{useAppSelector(errorMessageSelector)}</div>
        </div>
    )
}