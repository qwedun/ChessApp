import styles from './errorPopUp.module.scss'
import { useSelector } from "react-redux";

export const ErrorPopUp = ({children}) => {
    return (
        <div className={styles.active}>
            {children}
        </div>
    );
};

