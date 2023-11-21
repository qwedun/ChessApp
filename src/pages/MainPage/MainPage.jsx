import axios from "axios";
import { URL, api } from "../../server/API";
import { logout } from '../../store/slices/userSlice'
import { useDispatch } from "react-redux";

function handleClick() {

    api.get(URL + '/hello')
        .then(res => console.log(res))
}


export function MainPage() {
    const dispatch = useDispatch()

    async function handleLogout() {
        dispatch(logout())
    }

    return (<>
        <div onClick={handleClick}>
            HELLO
        </div>
        <div onClick={handleLogout}>LOGOUT</div>
        </>
    )
}
export default MainPage
