import { Routes, Route } from 'react-router-dom'
import {lazy} from "react";
import {LayoutRouter} from "./pages/LayoutRouter/LayoutRouter";
import {useEffect} from "react";

const MainPage = lazy(() => import('./pages/MainPage/MainPage'))
const GamePage = lazy(() => import('./pages/GamePage/GamePage'))
const LoginForm = lazy(() => import('./components/forms/LoginForm'))
const RegisterForm = lazy(() => import('./components/forms/RegisterForm'))
const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const PlayPage = lazy(() => import('./pages/PlayPage/PlayPage'))

export default function App () {

    useEffect(() => {
        console.log('effect')
    }, [])

    return (
        <Routes>
            <Route path='/' element={<LayoutRouter/>}>
                <Route path='register' element={<RegisterForm/>}/>
                <Route path='login' element={<LoginForm/>}/>
                <Route path='home' element={<HomePage/>}/>
                <Route path='board' element={<GamePage/>}/>
                <Route path='socials' element={<MainPage/>}/>
                <Route path='settings' element={<MainPage/>}/>
                <Route path='archive' element={<MainPage/>}/>
                <Route path='news' element={<MainPage/>}/>
                <Route path='play' element={<PlayPage/>}/>
            </Route>
        </Routes>
    )
}