// 'use client'

import styles from './styles.module.scss'
// import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import Like from '@/icons/Like.svg'
import filledLike from '@/icons/filledLike.svg'
import Image from 'next/image'

export default function Item({item, profile, handleCart, inCart, handleFavorite, inFavorite}: {item: any, profile: any, handleCart: any, inCart: boolean, handleFavorite: any, inFavorite: boolean}) {


    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {item.images[0]?.Location &&
                <div className={styles.imageWrapper}>
                    <img src={item.images[0].Location} alt="plant" className={styles.image} />
                    <div className={styles.favorite} onClick={e => {e.stopPropagation(); handleFavorite(item)}}>
                        {
                            inFavorite ?
                            <Image priority src={filledLike} alt='like' className={styles.like}/>
                            :
                            <Image priority src={Like} alt='like' className={styles.like}/>
                        }
                    </div>
                    <div className={styles.sellerAvatarWrapper} onClick={e => {e.stopPropagation(); profile(item.sellerName)}}>
                        {
                            item.sellerAvatar ?
                            <img src={item.sellerAvatar} alt="seller" className={styles.sellerAvatar} />
                            :
                            <div className={styles.sellerFirstLetter}>{item.sellerName.charAt(0)}</div>
                        }
                    </div>
                </div>
                }
                <div className={styles.name}>{item.name}</div>
                <div className={styles.seller}>{item.sellerName}</div>
            </div>
            <div className={[styles.orderWrapper, inCart && styles.active].join(' ')}  onClick={e => {e.stopPropagation(); inCart && handleCart(item)}}>
                <div className={styles.price}>{`${item.price} ₽`}</div>
                <button className={styles.button} onClick={() => {!inCart && handleCart(item)}}></button>
            </div>
        </div>
    )
}