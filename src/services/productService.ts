import $api from "@/api";

export default class ProductsService {
    static async uploadOne(data: FormData) {
        return await $api.post('/products/upload', data, {headers: {'Content-Type': "multipart/form-data"}})
    }

    static async getAll(skip: number, filter: any, sort: any) {
        return await $api.post('/products/all', {skip, filter, sort})
    }

    static async getOwn(skip: number, filter: any, sort: any) {
        return await $api.post('/products/own', {skip, filter, sort})
    }

    static async deleteOne(id: string) {
        return await $api.post('/products/delete', {id})
    }

    static async updateOne(data: FormData) {
        return await $api.patch('/products/update', data, {headers: {'Content-Type': "multipart/form-data"}})
    }

    static async getOne(id: string) {
        return await $api.post('/products/one', {id})
    }

    static async getMany(array: string[]) {
        return await $api.post('/products/many', array)
    }
}