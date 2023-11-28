import styles from './gameTypeTitle.module.scss'
const GameTypeTitle = ({time, type}) => {
    return (
        <button className={styles.title}>
            <div className={styles.center}>
                <div className={styles.time}> {time} </div>
                <div className={styles.type}> {type} </div>
            </div>
        </button>
    );
};

export default GameTypeTitle;