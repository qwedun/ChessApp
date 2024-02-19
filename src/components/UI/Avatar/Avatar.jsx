import styles from './avatar.module.scss'
import pawnPicture from '../../../assets/pawnProfile.png'
const Avatar = ({...props}) => {
    return (
        <img {...props} className={styles.img} src={pawnPicture} />
    );
};

export default Avatar