import { combineReducers } from "redux"
import auth from "./auth"
import common from "./common"
import product from "./product"

export * from './auth'
export * from './common'
export * from './product'
export default combineReducers({
    auth,
    common,
    product
})