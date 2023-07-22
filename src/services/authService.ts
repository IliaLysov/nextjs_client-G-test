import $api from "@/api";
import { LogInInterface, RegistrationInterface } from "@/types/auth";
import { cartItemInterface } from "@/types/cart";


export default class AuthService {
    static async signIn({email, password}: LogInInterface) {
        return await $api.post('/auth/login', {email, password})
    }

    static async registration({email, password, name, cart}: RegistrationInterface) {
        return await $api.post('/auth/registration', {email, password, name, surname: 'test', cart })
    }

    static async checkAuth() {
        return await $api.get('/auth/refresh', {withCredentials: true})
    }

    static async logOut() {
        return await $api.post('/auth/logout')
    }

    static async uploadAvatar(data: FormData) {
        return await $api.post('/auth/avatar',  data, {headers: {'Content-Type': "multipart/form-data"}})
    }

    static async addToCart(array: cartItemInterface[]) {
        return await $api.post('/auth/addToCart', array)
    }
}