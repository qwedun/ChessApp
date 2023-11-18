import styles from "./Layout.module.scss";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {Suspense, useEffect} from "react";

export const WelcomeLayout = () => {



    return (
        <div className={styles.wrapper}>
            <div className={styles.logoWrapper}>
                <img alt="Logo" src={require("../../../assets/logo.png")}/> <span className={styles.title}>САНЯ ЛОХ ОБЪЕЛСЯ БЛОХ</span>
            </div>
            <div className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.smallCircle}></div>
                    <div className={styles.bigCircle}></div>
                    <img alt ="ChessboardImage" src={require("../../../assets/chessboard.png")} />
                </div>
                <div className={styles.rightWrapper}>
                    <Suspense fallback={<p>LOADING</p>}>
                        <Outlet/>
                    </Suspense>
                </div>
            </div>
            <footer>FOOTER</footer>
        </div>
    );
};