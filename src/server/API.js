import axios from "axios";

export const URL = 'https://shiferchess.ru'

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
    if (res.response.status === 401 && !origin.retrying) {
        origin.retrying = true;
        try {
            const response = await api.post('refresh-access-token');
            localStorage.setItem('token', response.data.access_token)
        } catch(e) {
            return Promise.reject(e)
        }
        return await api.request(origin);
    }
    return Promise.reject(res)

})