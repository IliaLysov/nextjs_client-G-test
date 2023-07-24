import styles from './styles.module.scss'
import CustomSlider from '../filter/slider'
import { Dispatch, SetStateAction, useState } from 'react'
import { FiltersInterface, PriceInterface } from '@/types/filter'
import { FiltersNameEnum } from '@/types/filter'
import { compareObjects } from '@/utils/compare'

export default function Filters({filters, newFilters, setNewFilters, update, appliedFilters, resetFilters}: {filters: FiltersInterface, newFilters: FiltersInterface, setNewFilters: Dispatch<SetStateAction<FiltersInterface | null>>, update: any, appliedFilters: FiltersInterface | null, resetFilters: any}) {

    const newFilterComparison = compareObjects(newFilters, appliedFilters)
    const filterComparison = compareObjects(filters, appliedFilters)

    // console.log('newFilterComparison', newFilterComparison)
    // console.log('filterComparison', filterComparison)
    // console.log('newFilters', newFilters)
    // console.log('appliedFilters', appliedFilters)
    // console.log('filters', filters)


    return (
        <div className={styles.wrapper}>
            {newFilters.price && <CustomSlider title='Цена' min={filters.price.min} max={filters.price.max} label={FiltersNameEnum.price} value={newFilters.price} setNewFilters={setNewFilters} />}

            {!newFilterComparison && <button className={styles.applyBtn} onClick={() => update()}>Применить фильтр</button>}
            {!filterComparison && <button className={styles.applyBtn} onClick={() => resetFilters()}>Сбросить фильтр</button>}
        </div>
    )
}