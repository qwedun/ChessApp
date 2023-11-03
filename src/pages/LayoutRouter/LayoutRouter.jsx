import {useLocation} from "react-router-dom";
import {WelcomeLayout} from "./WelcomeLayout/WelcomeLayout";
import {MainPageLayout} from "./MainPageLayout/MainPageLayout";

export const LayoutRouter = () => {

    const location = useLocation()

    if (location.pathname === '/login' || location.pathname === '/register')
        return <WelcomeLayout/>

    return <MainPageLayout/>
};