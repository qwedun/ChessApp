import axios from "axios";
import { URL, api } from "../../server/API";

function handleClick() {
    api.get(URL + '/hello')
        .then(res => console.log(res))
}

async function handleLogout() {
    const res = await axios.post(URL + '/api/v1/logout', {
        headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
        withCredentials: true,
    })
    localStorage.removeItem('token')
    console.log(res)
}

export function MainPage() {
    return (<>
        <div onClick={handleClick}>
            HELLO
        </div>
        <div onClick={handleLogout}>LOGOUT</div>
        </>
    )
}
export default MainPage
