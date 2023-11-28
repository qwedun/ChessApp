import styles from './avatar.module.scss'
import shrek from '../../../assets/shrek.jpg'
const Avatar = ({...props}) => {
    return (
        <img {...props} className={styles.img} src={shrek} />
    );
};

export default Avatar