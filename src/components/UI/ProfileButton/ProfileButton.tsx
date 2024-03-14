import styles from './profileButton.module.scss'
import { FC } from 'react';

interface ProfileButtonProps {
    imgSrc: string;
    text: string;
}

const ProfileButton: FC<ProfileButtonProps> = ({imgSrc, text}) => {
    return (
        <div className={styles.button}>
            <img alt={text} src={imgSrc}/>
            <div>
                {text}
            </div>
        </div>
    );
};

export default ProfileButton;