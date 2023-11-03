import styles from './avatar.module.scss'
import shrek from '../../assets/shrek.jpg'
export const Avatar = () => {
    return (
        <div className={styles.imgWrapper}>
            <img className={styles.img} src={shrek} width='64px' height='64px'/>
        </div>
    );
};