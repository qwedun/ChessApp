import axios from "axios";
import { URL, api } from "../../server/API";

function handleClick() {
    api.get(URL + '/hello')
        .then(res => console.log(res))
        .catch(res => console.log(res))
}

export function MainPage() {
    return (
        <div onClick={handleClick}>
            HELLO
        </div>
    )
}
export default MainPage
