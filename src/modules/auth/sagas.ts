import {call, takeEvery, put} from 'redux-saga/effects'
import { logInPost, registrationPost, checkAuth, logOutPost } from './sagaActions'
import {AuthService} from '@/services'
import { setAuthErrorMessage, setUser, setPending } from './'
import { setModal } from '../common'
import { ModalTypeEnum } from '@/types/modal'

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
        let response: any = yield call(AuthService.registration, {email, password, name})
        localStorage.setItem('token', response.data.accessToken)
        yield put(setUser({auth: true, ...response.data.user}))
        yield put(setModal({status: false, type: ModalTypeEnum.Empty}))
    } catch(e: any) {
        yield put(setAuthErrorMessage(e.response?.data?.message))
    }
}

function* checkAuthSaga(): Generator {
    try {
        if(localStorage.getItem('token')) {
            const response: any = yield call(AuthService.checkAuth)
            localStorage.setItem('token', response.data.accessToken)
            yield put(setUser({auth: true, ...response.data.user}))
            console.log(response)
        }
    } catch(e: any) {
        console.log(e)
    } finally {
        yield put(setPending(false))
        yield put(setModal({status: false, type: ModalTypeEnum.Empty}))
    }
}

function* logOutSaga(): Generator {
    try {
        const response: any = yield call(AuthService.logOut)
        console.log(response)
        localStorage.removeItem('token')
        yield put(setUser({auth: false}))
    } catch(e: any) {
        console.log(e)
    }
}

export function* authSaga() {
    yield takeEvery(logInPost.type, logInSaga)
    yield takeEvery(registrationPost.type, registrationSaga)
    yield takeEvery(checkAuth.type, checkAuthSaga)
    yield takeEvery(logOutPost.type, logOutSaga)
}