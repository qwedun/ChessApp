import { api, URL } from "../server/API";
import axios from "axios";
import {setIsAuth} from "../store/slices/userSlice";

export class authService {
    static async login(email, password) {
        return await axios.post(`${URL}/api/v1/login`, {email:email, password:password}, {withCredentials: true})
    }
    static async register(email, password) {
        return await axios.post(`${URL}/api/v1/register`, {email:email, password: password});
    }
    static async logout() {
        return await api.post('/logout')
    }

    static async isAuth() {
        try {
            const response = await axios.get(URL + '/refresh', {withCredentials: true})
            localStorage.setItem('token', response.data.accessToken);
            setIsAuth();
            return response;
        } catch(e) {
        }
    }
}