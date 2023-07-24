import { call, takeEvery, put } from 'redux-saga/effects'
import { productPost, ownProductsGet, deleteProductPost, updateProductPost, allProductsGet, oneProductGet, manyProductsGet } from './sagaActions'
import { ProductsService } from '@/services'
import { setProducts, setProduct, setCartProducts, setFilters, setAppliedFilters } from './actions'
import { ProductInterface, ProductType } from '@/types/product'
import { setModal } from '../common'
import { ModalTypeEnum } from '@/types/modal'
import { cartItemInterface } from '@/types/cart'
import { FiltersInterface } from '@/types/filter'

function* productPostSaga(action: ReturnType<typeof productPost>): Generator {
    try {
        const data = action.payload
        const response = yield call(ProductsService.uploadOne, data)
        yield put(ownProductsGet({skip: 0, appliedFilters: null, sort: {}}))
        yield put(setModal({status: true, type: ModalTypeEnum.Success, data: 'Товар успешно добавлен'}))
    } catch(e: any) {
        yield put(setModal({status: true, type: ModalTypeEnum.Error, data: 'Не удалось добавить товар'}))
        console.log('product productPostSaga', e)
        console.log('product productPostSaga', e.response?.data?.message)
    }
}

function* ownProductsGetSaga(action: ReturnType<typeof ownProductsGet>): Generator {
    try {
        const {skip, appliedFilters, sort} = action.payload
        const response: any = yield call(ProductsService.getOwn, skip, appliedFilters, sort)
        const products: ProductInterface[] = response.data.products
        const filters: FiltersInterface = response.data.filters
        yield put(setProducts(products))
        yield put(setFilters(filters))
        if (appliedFilters) {
            yield put(setAppliedFilters(appliedFilters))
        }
    } catch (e: any) {
        console.log('product ownProductsGetSaga', e)
        console.log('product ownProductsGetSaga', e.response?.data?.message)
    }
}

function* allProductsGetSaga(action: ReturnType<typeof allProductsGet>): Generator {
    try {
        const {skip, appliedFilters, sort} = action.payload
        const response: any = yield call(ProductsService.getAll, skip, appliedFilters, sort)
        const products: ProductInterface[] = response.data.products
        const filters: FiltersInterface = response.data.filters
        yield put(setProducts(products))
        yield put(setFilters(filters))
        if (appliedFilters) {
            yield put(setAppliedFilters(appliedFilters))
        }
    } catch (e: any) {
        console.log('product allProductsGetSaga', e)
        console.log('product allProductsGetSaga', e.response?.data?.message)
    }
}

function* deleteProductPostSaga(action: ReturnType<typeof deleteProductPost>): Generator {
    try {
        const id = action.payload
        yield call(ProductsService.deleteOne, id)
        yield put(ownProductsGet({skip: 0, appliedFilters: null, sort: {}}))
        yield put(setModal({status: true, type: ModalTypeEnum.Success, data: 'Товар успешно удален'}))
    } catch (e: any) {
        yield put(setModal({status: true, type: ModalTypeEnum.Error, data: 'Не удалось удалить товар'}))
        console.log('product deleteProductPostSaga', e)
        console.log('product deleteProductPostSaga', e.response?.data?.message)
    }
}

function* updateProductPostSaga(action: ReturnType<typeof updateProductPost>): Generator {
    try {
        const data = action.payload
        const response = yield call(ProductsService.updateOne, data)
        yield put(ownProductsGet({skip: 0, appliedFilters: null, sort: {}}))
        yield put(setModal({status: true, type: ModalTypeEnum.Success, data: 'Товар успешно обновлен'}))
    } catch (e: any) {
        yield put(setModal({status: true, type: ModalTypeEnum.Error, data: 'Не удалось обновить товар'}))
        console.log('product updateProductPostSaga', e)
        console.log('product updateProductPostSaga', e.response?.data?.message)
    }
}

function* oneProductGetSaga(action: ReturnType<typeof oneProductGet>): Generator {
    try {
        yield put(setModal({status: true, type: ModalTypeEnum.Loading}))
        const id = action.payload
        const response: any = yield call(ProductsService.getOne, id)
        const item: ProductType = response.data
        yield put(setProduct(item))
    } catch (e: any) {
        console.log('product oneProductGetSaga', e)
    } finally {
        yield put(setModal({status: false, type: ModalTypeEnum.Empty}))
    }
}

function* manyProductsGetSaga(action: ReturnType<typeof manyProductsGet>): Generator {
    try {
        const idArray: string[] = action.payload
        const response: any = yield call(ProductsService.getMany, idArray)
        const products: ProductInterface[] = response.data
        yield put(setCartProducts(products))
    } catch (e: any) {
        console.log('manyProductsGetSaga', e)
    }
}


export function* productSaga() {
    yield takeEvery(productPost.type, productPostSaga)
    yield takeEvery(ownProductsGet.type, ownProductsGetSaga)
    yield takeEvery(allProductsGet.type, allProductsGetSaga)
    yield takeEvery(deleteProductPost.type, deleteProductPostSaga)
    yield takeEvery(updateProductPost.type, updateProductPostSaga)
    yield takeEvery(oneProductGet.type, oneProductGetSaga)
    yield takeEvery(manyProductsGet.type, manyProductsGetSaga)
}