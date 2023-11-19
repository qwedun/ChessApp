import axios from "axios";
import { URL, api } from "../../server/API";

function handleClick() {
    api.get(URL + '/hello')
        .then(res => console.log(res))
}

async function handleLogout() {
    const res = await api.post('/api/v1/logout')
    console.log(res)
}

export function MainPage() {
    return (
        <div onClick={handleClick}>
            HELLO
            <div onClick={handleLogout}>LOGOUT</div>
        </div>
    )
}
export default MainPage
