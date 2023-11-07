import axios from "axios";

export const URL = 'https://tuka-qhrv.vercel.app'

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
}, error => {
    if (error.response.status === 401) {
        console.log(error.response.status)
    }
})