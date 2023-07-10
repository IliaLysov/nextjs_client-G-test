import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'
import rootReducer from '@/modules'
import { authSaga } from "@/modules/auth";

const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

export const store = configureStore({
    reducer: {
        rootReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(middleware)
})

sagaMiddleware.run(authSaga)


export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>