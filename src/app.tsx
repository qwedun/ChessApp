import { Routes, Route } from 'react-router-dom';
import { lazy } from "react";
import { LayoutRouter } from "./pages/LayoutRouter/LayoutRouter";
import { useDispatch } from "react-redux";
import { checkAuth } from "./store/slices/userSlice";

const MainPage = lazy(() => import('./pages/MainPage/MainPage'));
const LoginForm = lazy(() => import('./components/forms/LoginForm'));
const RegisterForm = lazy(() => import('./components/forms/RegisterForm'));
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const ConfirmLoginPage = lazy(() => import('./pages/ConfirmLoginPage/ConfirmLoginPage'));
const SessionPage = lazy(() => import('./pages/SessionPage/SessionPage'));
const SessionPage2 = lazy(() => import('./pages/SessionPage/SessionPage2'));
const ProfilePage = lazy(() => import('./pages/ProfilePage/ProfilePage'));


export default function App () {

    const dispatch = useDispatch();

    //dispatch(checkAuth());

    return (
        <Routes>
            <Route path='/' element={<LayoutRouter/>}>
                <Route index element={<HomePage/>}/>
                <Route path='register' element={<RegisterForm/>}/>
                <Route path='login' element={<LoginForm/>}/>
                <Route path='login/confirm' element={<ConfirmLoginPage/>}/>
                <Route path='home' element={<HomePage/>}/>
                <Route path='board' element={<SessionPage isOnline={true}/>}/>
                <Route path='socials' element={<MainPage/>}/>
                <Route path='settings' element={<MainPage/>}/>
                <Route path='archive' element={<MainPage/>}/>
                <Route path='news' element={<MainPage/>}/>
                <Route path='play' element={<SessionPage isOnline={true}/>}/>
                <Route path='play/white' element={<SessionPage isOnline={true}/>}/>
                <Route path='play/black' element={<SessionPage2 isOnline={true}/>}/>
                <Route path='profile/:login' element={<ProfilePage/>}/>
            </Route>
        </Routes>
    )
}