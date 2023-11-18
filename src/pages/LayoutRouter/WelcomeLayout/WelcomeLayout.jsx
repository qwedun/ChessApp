import styles from "./Layout.module.scss";
import {Outlet} from "react-router-dom";
import {useSelector} from "react-redux";
import {ErrorPopUp} from "../../../components/UI/ErrorPopUp/ErrorPopUp";
import {Suspense} from "react";

export const WelcomeLayout = () => {

    const user = useSelector(state => state.user)

    return (
        <div className={styles.wrapper}>
            <ErrorPopUp>{user.error}</ErrorPopUp>
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