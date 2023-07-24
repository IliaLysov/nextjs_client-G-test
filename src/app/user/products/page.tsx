import styles from './page.module.scss'

import { Items } from '@/components'
import { ProductOwnerTypeEnum } from '@/types/product'



export default function Products() {


    return (
        <div className={styles.wrapper}>
            <Items type={ProductOwnerTypeEnum.Owner}/>
        </div>
    )
}