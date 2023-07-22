import styles from './page.module.scss'

import { Items } from '@/components'
import { ProductOwnerTypeEnum } from '@/types/product'


export default function Products() {


    return (
        <div className={styles.wrapper}>
            <h1>Products page</h1>
            <Items type={ProductOwnerTypeEnum.Owner}/>
        </div>
    )
}