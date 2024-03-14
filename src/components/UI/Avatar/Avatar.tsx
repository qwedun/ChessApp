import styles from './avatar.module.scss'
import pawnPicture from '../../../assets/pawnProfile.png'
import { FC } from 'react'
const Avatar:FC<any> = ({...props}) => {
    return (
        <img alt='avatar' {...props} className={styles.img} src={pawnPicture} />
    );
};

export default Avatar