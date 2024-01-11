import { URL, api } from "../../server/API";
import { logout } from '../../store/slices/userSlice'
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react'
import {Navigate} from "react-router-dom";

export function MainPage() {
    Navigate({to: '/play/2'})
    function handleClick() {

    }
    const dispatch = useDispatch()

    async function handleLogout() {
        dispatch(logout())
    }

    const [arr, setArr] = useState([1])




    return (<>
        <div onClick={handleClick}>
            HELLO
        </div>
        <div onClick={handleLogout}>LOGOUT</div>
            <button onClick={() => setArr([...arr, 1])}>SEND MESSAGE</button>
            {arr.map(value => {
                return <div>MESSAGE</div>
            })}
        </>

    )
}
export default MainPage
