import styles from './preloader.module.scss'
import { FC } from 'react';
const Preloader: FC = () => {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default Preloader;