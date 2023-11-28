import Avatar from "../Avatar/Avatar";
import styles from "./playerInfo.module.scss";

const InGamePlayerInfo = ({username, elo}) => {
    return (
        <div className={styles.info}>
            <Avatar width='48px' height='48px'/>
            <div className={styles.infoWrapper}>
                <span>{username}</span>
                <span>{elo}</span>
            </div>
        </div>
    );
};

export default InGamePlayerInfo;