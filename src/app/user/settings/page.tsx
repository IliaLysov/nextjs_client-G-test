
'use client'
import styles from './page.module.scss'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { userSelector, uploadAvatar } from '@/modules'
import Image from 'next/image'
import userImg from '@/images/user-default.png'

export default function Settings() {
    const user = useAppSelector(userSelector)
    const dispatch = useAppDispatch()

    const avatarHandleChange = async (e: any) => {
        const formData: any = new FormData()
        formData.append('avatar', e.target.files[0])

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value)
        // }
        dispatch(uploadAvatar(formData))
    }

    console.log(user)
    return (
        <div className={styles.wrapper}>
            <h1>Settings page</h1>
            <input type='file' name="avatar" id="avatar" className={styles.avatarInput} onChange={avatarHandleChange}/>
            <label htmlFor="avatar">
                <div className={styles.avatar}>
                    {
                        user.avatar ? 
                        <img src={user.avatar.Location} alt="user" className={styles.userImg}/>
                        :
                        <Image src={userImg} alt="user" height='100' width='100' priority={true} className={styles.userImg} loading='eager'/>
                    }
                </div>
            </label>
        </div>
    )
}