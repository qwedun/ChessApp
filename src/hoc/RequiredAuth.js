import {useLocation, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";

export const RequiredAuth = ({children}) => {
    const location = useLocation();
    const state = useSelector(state => state.user)
    if (!state.isAuth)
        return <Navigate to={'/archive'} state={{from: location.pathname}}/>

    return children
};