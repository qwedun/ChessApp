import styles from './mainPage.module.scss'
import {Aside} from "../../../components/Aside";
import {Outlet} from "react-router-dom";
import {Suspense} from "react";

export const MainPageLayout = () => {
    return (
        <div className={styles.wrapper}>
            <Aside/>
            <div className={styles.right}>
                <Suspense fallback={<p>LOADING</p>}>
                    <Outlet/>
                </Suspense>
            </div>
        </div>
    );
};