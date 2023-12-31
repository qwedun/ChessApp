import { Routes, Route } from 'react-router-dom'
import { lazy } from "react";
import { LayoutRouter } from "./pages/LayoutRouter/LayoutRouter";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/slices/userSlice";

const MainPage = lazy(() => import('./pages/MainPage/MainPage'))
const GamePage = lazy(() => import('./pages/GamePage/GamePage'))
const LoginForm = lazy(() => import('./components/forms/LoginForm'))
const RegisterForm = lazy(() => import('./components/forms/RegisterForm'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const PlayPage = lazy(() => import('./pages/PlayPage/PlayPage'))
const ConfirmLoginPage = lazy(() => import('./pages/ConfirmLoginPage/ConfirmLoginPage'))
const SessionPage = lazy(() => import('./pages/SessionPage/SessionPage'))
const SessionPage2 = lazy(() => import('./pages/SessionPage/SessionPage2'))


export default function App () {

    const dispatch = useDispatch()

    dispatch(checkAuth())

    return (
        <Routes>
            <Route path='/' element={<LayoutRouter/>}>
                <Route index element={<HomePage/>}/>
                <Route path='register' element={<RegisterForm/>}/>
                <Route path='login' element={<LoginForm/>}/>
                <Route path='login/confirm' element={<ConfirmLoginPage/>}/>
                <Route path='home' element={<HomePage/>}/>
                <Route path='board' element={<GamePage isOnline={false}/>}/>
                <Route path='socials' element={<MainPage/>}/>
                <Route path='settings' element={<MainPage/>}/>
                <Route path='archive' element={<MainPage/>}/>
                <Route path='news' element={<MainPage/>}/>
                <Route path='play' element={<PlayPage/>}/>
                <Route path='play/1' element={<SessionPage isOnline={true}/>}/>
                <Route path='play/2' element={<SessionPage2 isOnline={true}/>}/>
            </Route>
        </Routes>
    )
}