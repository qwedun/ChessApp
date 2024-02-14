import { useState } from 'react';
import styles from './profileInfo.module.scss'

const ProfileInfo = ({src, text, children}) => {
    const [showInfo, setShowInfo] = useState(styles.static);

    return (
        <div className={styles.wrapper}>
            <div className={styles.imgWrapper}
                onMouseEnter={() => setShowInfo(styles.show)}
                onMouseLeave={() => setShowInfo(styles.hide)}
            >
                <img alt={children} src={src} width='32px'/>

            </div>
            <div>{children}</div>
            <div className={showInfo}><span>{text}</span></div>
        </div>
    );
};

export default ProfileInfo;