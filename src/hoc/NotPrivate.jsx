import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const NotPrivate = ({children}) => {

    const location = useLocation();

    const state = useSelector(state => state.user)

    if (state.isAuth)
        return <Navigate to={'/home'} state={{from: location.pathname}} replace/>

    return children
};