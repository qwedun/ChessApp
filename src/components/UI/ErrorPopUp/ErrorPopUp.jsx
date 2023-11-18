import styles from './errorPopUp.module.scss'
import { useSelector } from "react-redux";

export const ErrorPopUp = () => {
    const user = useSelector(state => state.user)
    let state;

    if (user.error === 0) state = styles.hidden;

    else if (user.error) state = styles.active;

    else state = styles.disable;

    return (
        <div className={state}>
            error
        </div>
    );
};

