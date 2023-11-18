import axios from "axios";

export const URL = 'https://api-jmjs.vercel.app'

export const api = axios.create({
    withCredentials: true,
    baseURL: URL
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

api.interceptors.response.use(config => {
    return config
}, e => {
    if (e.response.status === 401) {
        try {
            const response = api.post('/api/token/refresh', {
                access: localStorage.getItem('token')
            }).then(res => {
                console.log(res)
            })
        } catch (e) {
            console.log(e)
        }
    }
}