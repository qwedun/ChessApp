import styles from "./Layout.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import {Suspense} from "react";

export const WelcomeLayout = () => {

    return (
        <div className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                <img alt="Logo" src={require("../../../assets/logo.png")}/> <span className={styles.title}>SHIFERCHESS</span>
            </div>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.smallCircle}></div>
                    <div className={styles.bigCircle}></div>
                    <img width='390px' height='390px' alt ="ChessboardImage" src={require("../../../assets/chessboard.png")} />
                </div>
                <div className={styles.rightWrapper}>
                    <Suspense>
                        <Outlet/>
                    </Suspense>
                </div>
            </div>
            <div></div>
        </div>
    );
};