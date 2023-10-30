import styles from "../MainPage/MainPage.module.scss";
import {Outlet} from "react-router-dom";
import { useLocation } from "react-router-dom";

const Layout = () => {
    const location = useLocation();
    if (location.pathname === '/login' || location.pathname === '/register')
        return (
            <div className={styles.wrapper}>
                <div className={styles.logoWrapper}>
                    <img alt="Logo" src={require("../../assets/logo.png")}/> <span className={styles.title}>САНЯ ЛОХ ОБЪЕЛСЯ БЛОХ</span>
                </div>
                <div className={styles.main}>
                    <div className={styles.container}>
                        <div className={styles.smallCircle}></div>
                        <div className={styles.bigCircle}></div>
                        <img alt ="ChessboardImage" src={require("../../assets/chessboard.png")} />
                    </div>  
                    <div>
                        <Outlet/>
                    </div>
                </div>
                <footer>FOOTER</footer>
            </div>
        );
    return <div>MEM</div>
};

export { Layout };