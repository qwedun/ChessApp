import { Routes, Route } from 'react-router-dom'
import {lazy} from "react";
import {LayoutRouter} from "./pages/LayoutRouter/LayoutRouter";
import {RequiredAuth} from "./hoc/RequiredAuth";
import {useEffect} from "react";
import {authService} from "./services/authService";

const MainPage = lazy(() => import('./pages/MainPage/MainPage'))
const LoginForm = lazy(() => import('./components/forms/LoginForm'))
const RegisterForm = lazy(() => import('./components/forms/RegisterForm'))
const Chessboard = lazy(() => import('./board/chessboard'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))

export default function App () {

    useEffect(() => {
        if (localStorage.getItem('token'))
            authService.isAuth()
    }, []);

    return (
        <Routes>
            <Route path='/' element={<LayoutRouter/>}>
                <Route path='register' element={<RegisterForm/>}/>
                <Route path='login' element={<LoginForm/>}/>
                <Route path='home' element={<HomePage/>}/>
                <Route path='board' element={<Chessboard/>}/>
                <Route path='socials' element={<MainPage/>}/>
                <Route path='settings' element={<MainPage/>}/>
                <Route path='archive' element={<MainPage/>}/>
                <Route path='news' element={<MainPage/>}/>
                <Route path='play' element={<MainPage/>}/>
            </Route>
        </Routes>
    )
}