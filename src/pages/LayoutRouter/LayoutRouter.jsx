import {Navigate, useLocation} from "react-router-dom";
import {WelcomeLayout} from "./WelcomeLayout/WelcomeLayout";
import {MainPageLayout} from "./MainPageLayout/MainPageLayout";
import { useSelector } from "react-redux";
import Preloader from "../../components/UI/Preloader/Preloader";

export const LayoutRouter = () => {
    const user = useSelector(state => state.user)


    const location = useLocation()
    const path = location.pathname
    if (user.isAuthLoading)
        return <Preloader/>

    if (path === '/login' || path === '/register') {
        if (user.isAuth) return <Navigate to='/home' replace={true}/>
        if (user.canConfirmLogin) return <Navigate to='/login/confirm' replace={true}/>
        return <WelcomeLayout/>
    } else if (path === '/login/confirm') {
        if (user.isAuth) return <Navigate to='/home' replace={true}/>
        if (!user.canConfirmLogin) return <Navigate to='/login' replace={true}/>
        return <WelcomeLayout/>
    } else {
            if (!user.isAuth) return <Navigate to='/login' replace={true}/>
        return <MainPageLayout/>
    }
};