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
    const origin = res.config;
    if (res.response.status === 401 && !origin.isRetry) {
        origin.isRetry = true;
        try {
            const response = await api.post('refresh-access-token', {
                access: localStorage.getItem('token'),
            })
            if (!response) return Promise.reject()
            localStorage.setItem('token', response.payload.data.access_token)
            return api.request(origin)
        } catch(err) {
            console.log(err)
        }
    }
})