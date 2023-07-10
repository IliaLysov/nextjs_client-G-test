import $api from "@/api";
import { LogInInterface, RegistrationInterface } from "@/types/auth";


export default class AuthService {
    static async signIn({email, password}: LogInInterface) {
        return await $api.post('/auth/login', {email, password})
    }

    static async registration({email, password, name}: RegistrationInterface) {
        return await $api.post('/auth/registration', {email, password, name, surname: 'test'})
    }

    static async checkAuth() {
        return await $api.get('/auth/refresh', {withCredentials: true})
    }

    static async logOut() {
        return await $api.post('/auth/logout')
    }
}