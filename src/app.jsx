import { Routes, Route } from 'react-router-dom'
import { MainPage } from "./pages/MainPage/MainPage";
import LoginForm from "./components/forms/LoginForm";
import { Layout } from "./pages/WelcomeLayout/WelcomeLayout";
import RegisterForm from "./components/forms/RegisterForm";


export default function App () {
    return (
        <Routes>
            <Route path='/' element={<Layout/>}>
                <Route path='register' element={<RegisterForm/>}/>
                <Route path='login' element={<LoginForm/>}/>
                <Route path='home' element={<MainPage/>}/>
            </Route>
        </Routes>
    )
}