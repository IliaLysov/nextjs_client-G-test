import {call, takeEvery, put, select} from 'redux-saga/effects'
import { logInPost, registrationPost, checkAuth, logOutPost, uploadAvatar, addToCardPost, addToFavoritePost } from './sagaActions'
import {AuthService} from '@/services'
import { setAuthErrorMessage, setUser, setauthPending } from './'
import { cartSelector, favoriteSelector, setModal } from '../common'
import { ModalTypeEnum } from '@/types/modal'
import { UserInterface } from '@/types/auth'
import { cartItemInterface } from '@/types/cart'

function* logInSaga(action: ReturnType<typeof logInPost>): Generator {
    try {
        const {email, password} = action.payload
        let response: any = yield call(AuthService.signIn, {email, password})
        localStorage.setItem('token', response.data.accessToken)
        yield put(setUser({auth: true, ...response.data.user}))
        yield put(setModal({status: false, type: ModalTypeEnum.Empty}))
    } catch(e: any) {
        yield put(setAuthErrorMessage(e.response?.data?.message))
    }
}

function* registrationSaga(action: ReturnType<typeof registrationPost>): Generator {
    try {
        const {email, password, name} = action.payload
        const cart: any = yield select(cartSelector)
        const favorite: any = yield select(favoriteSelector)
        let response: any = yield call(AuthService.registration, {email, password, name, cart, favorite})
        localStorage.setItem('token', response.data.accessToken)
        yield put(setUser({auth: true, ...response.data.user}))
        yield put(setModal({status: false, type: ModalTypeEnum.Empty}))
    } catch(e: any) {
        yield put(setAuthErrorMessage(e.response?.data?.message))
    }
}

function* checkAuthSaga(): Generator {
    try {
        yield put(setModal({status: true, type: ModalTypeEnum.Loading}))
        const token = yield call(() => {
            return localStorage.getItem('token')
        })
        
        if(token) {
            const response: any = yield call(AuthService.checkAuth)
            localStorage.setItem('token', response.data.accessToken)
            yield put(setUser({auth: true, ...response.data.user}))
        }
    } catch(e: any) {
        console.log(e)
    } finally {
        yield put(setModal({status: false, type: ModalTypeEnum.Empty}))
        yield put(setauthPending(false))
    }
}

function* logOutSaga(): Generator {
    try {
        yield call(AuthService.logOut)
        localStorage.removeItem('token')
        yield put(setUser({auth: false}))
    } catch(e: any) {
        console.log(e)
    }
}

function* uploadAvatarSaga(action: ReturnType<typeof uploadAvatar>): Generator {
    try {
        const formData: FormData = action.payload
        const response: any = yield call(AuthService.uploadAvatar, formData)
        yield put(setUser({auth: true, ...response.data}))
    } catch(e: any) {
        console.log(e)
    }
}

function* addToCardPostSaga(action: ReturnType<typeof addToCardPost>): Generator {
    try {
        const itemsArray: cartItemInterface[] = action.payload
        const response: any = yield call(AuthService.addToCart, itemsArray)
        const user = response.data
        yield put(setUser({auth: true, ...user}))
    } catch (e: any) {
        console.log('addToCardPostSaga', e)
    }
}

function* addToFavoritePostSaga(action: ReturnType<typeof addToFavoritePost>): Generator {
    try {
        const idArray: string[] = action.payload
        const response: any = yield call(AuthService.addToFavorite, idArray)
        const user = response.data
        yield put(setUser({auth: true, ...user}))
    } catch (e: any) {
        console.log('addToFavoritePostSaga', e)
    }
}

export function* authSaga() {
    yield takeEvery(logInPost.type, logInSaga)
    yield takeEvery(registrationPost.type, registrationSaga)
    yield takeEvery(checkAuth.type, checkAuthSaga)
    yield takeEvery(logOutPost.type, logOutSaga)
    yield takeEvery(uploadAvatar.type, uploadAvatarSaga)
    yield takeEvery(addToCardPost.type, addToCardPostSaga)
    yield takeEvery(addToFavoritePost.type, addToFavoritePostSaga)
}