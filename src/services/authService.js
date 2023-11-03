import { api } from "../server/API";

export class authService {

    static async login(email, password) {
        await api.post('/login', {email:email, password:password})
    }
    static async register(email, password) {
        await api.post('/register', {email:email, password: password});
    }
    static async logout() {
        await api.post('/logout')
    }
}