import {useLocation} from "react-router-dom";
import {WelcomeLayout} from "./WelcomeLayout/WelcomeLayout";
import {MainPageLayout} from "./MainPageLayout/MainPageLayout";
import { useSelector } from "react-redux";
import Preloader from "../../components/UI/Preloader/Preloader";

export const LayoutRouter = () => {
    const user = useSelector(state => state.user)


    const location = useLocation();

    if (user.isAuthLoading)
        return <Preloader/>

    if (location.pathname === '/login' || location.pathname === '/register')
        return <WelcomeLayout/>

    return <MainPageLayout/>
};