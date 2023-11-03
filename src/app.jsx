import { Routes, Route } from 'react-router-dom'
import { MainPage } from "./pages/MainPage/MainPage";
import LoginForm from "./components/forms/LoginForm";
import {LayoutRouter} from "./pages/LayoutRouter/LayoutRouter";
import RegisterForm from "./components/forms/RegisterForm";
import Chessboard from "./board/chessboard";


export default function App () {
    return (
        <Routes>
            <Route path='/' element={<LayoutRouter/>}>
                <Route path='register' element={<RegisterForm/>}/>
                <Route path='login' element={<LoginForm/>}/>
                <Route path='home' element={<MainPage/>}/>
                <Route path='board' element={<Chessboard/>}/>
                <Route path='socials' element={<MainPage/>}/>
                <Route path='settings' element={<MainPage/>}/>
            </Route>
        </Routes>
    )
}