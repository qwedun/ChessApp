import styles from './mainPage.module.scss'
import {Aside} from "../../../components/Aside";
import {Outlet} from "react-router-dom";

export const MainPageLayout = () => {
    return (
        <div className={styles.wrapper}>
            <Aside/>
            <div className={styles.right}>
                <Outlet/>
            </div>
        </div>
    );
};
