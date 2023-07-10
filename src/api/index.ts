import axios from 'axios'

export const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api`

const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    headers: {'Content-Type': 'application/json'}
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})

$api.interceptors.response.use((config) => {
    return config
}, (async error => {
    const originRequest = error.config
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originRequest._isRetry = true
        try {
            const response = await axios.get(`${API_URL}/auth/refresh`, {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken)
            return $api.request(originRequest)
        } catch (e) {
            console.log('Не авторизован')
        }
    }
    throw error
}))

export default $api