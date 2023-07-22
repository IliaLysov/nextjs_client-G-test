import styles from './page.module.scss'
import { Items } from '@/components'
import { ProductOwnerTypeEnum } from '@/types/product'

export default function Catalog() {
    return (
        <div className={styles.wrapper}>
            <h1>Catalog page</h1>
            <Items type={ProductOwnerTypeEnum.General} />
        </div>
    )
}