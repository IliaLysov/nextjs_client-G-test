import styles from './styles.module.scss'
import {Navigation, UserIcon} from '@/components'
import Link from 'next/link'

export default function Header() {

    return (
        <header className={styles.wrapper}>
            <Link href='/' className={styles.logo}>GARDENER</Link>
            <nav className={styles.navigation}>
                <Navigation link={{href: '/', name: 'Главная'}}/>
                <Navigation link={{href: '/catalog', name: 'Каталог'}}/>
            </nav>
            <UserIcon />
        </header>
    )
}
