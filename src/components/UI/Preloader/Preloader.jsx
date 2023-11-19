import styles from './preloader.module.scss'
const Preloader = () => {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loader}></div>
        </div>
    );
};

export default Preloader;