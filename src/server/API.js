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
}, async e => {
    console.log(e)
    if (e.response.status === 401) {
        try {
            const response = await api.post('/api/token/refresh', {
                access: localStorage.getItem('token')
            })
            console.log(response)
        } catch (err) {
            console.log(err)
        }
    }
})