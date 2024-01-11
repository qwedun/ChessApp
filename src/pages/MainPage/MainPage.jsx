import { URL, api } from "../../server/API";
import { logout } from '../../store/slices/userSlice'
import { useDispatch } from "react-redux";
import { useState, useEffect } from 'react'
import {Navigate} from "react-router-dom";

export function MainPage() {
    const dispatch = useDispatch()

    async function handleLogout() {
        dispatch(logout())
    }

    const [arr, setArr] = useState([1])




    return (<>
        <div>
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
