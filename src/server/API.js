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
}, async res => {
    if (res.response.status === 401) {
        try {
            const response = await api.post('api/v1/login', {
                access: localStorage.getItem('token'),
            })
            localStorage.setItem('token', response.data.access_token)
        } catch(err) {
            console.log(err)
        }
    }
})