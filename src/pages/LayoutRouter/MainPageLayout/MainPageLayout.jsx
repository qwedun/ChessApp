import styles from './mainPage.module.scss'
import {Aside} from "../../../components/Aside/Aside";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";

export const MainPageLayout = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.left}>
                <Aside/>
            </div>
            <div className={styles.right}>
                <Suspense>
                    <Outlet/>
                </Suspense>
            </div>
        </div>
    );
};
