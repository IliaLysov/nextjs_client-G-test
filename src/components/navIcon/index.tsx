
import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import Cart from '@/icons/Cart.svg'
import Favorites from '@/icons/Like.svg'


export default function NavIcon({nav, count}: {nav: string, count: number}) {

    let img
    switch (nav) {
        case 'cart':
            img = Cart
            break;
        case 'favorites':
            img = Favorites
            break;
        default:
            break;
    }

    return (
        <Link href={`/${nav}`} className={styles.wrapper}>
            <Image priority src={img} alt={nav} className={styles.icon}/>
            <div className={[styles.notification, count > 0 && styles.active].join(' ')}>{count}</div>
        </Link>
    )
}