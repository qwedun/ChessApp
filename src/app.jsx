import { Routes, Route } from 'react-router-dom'
import { MainPage } from "./pages/MainPage/MainPage";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegisterPage } from './pages/RegisterPage/RegisterPage.jsx'
import { Layout } from "./pages/WelcomeLayout/WelcomeLayout";


export default function App ({children}) {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='register' element={<RegisterPage/>}/>
                <Route path='login' element={<LoginPage/>}/>
                <Route path='home' element={<MainPage/>}/>
            </Route>
        </Routes>
    )
}