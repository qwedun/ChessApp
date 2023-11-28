import { api, URL } from "../server/API";
import axios from "axios";

export class authService {
    static async login(email, password) {
        return await axios.post(`${URL}/api/v1/login`, {email:email, password:password}, {withCredentials: true})
    }
    static async register(email, password) {
        return await axios.post(`${URL}/api/v1/register`, {email:email, password: password});
    }
    static async logout() {
        return await api.post('/api/v1/logout')
    }
    static async confirmLogin(login) {
        return await api.put('/userlogin', {login: login})
    }
    static async checkAuth() {
        return await api.post('/authuser')
    }
}