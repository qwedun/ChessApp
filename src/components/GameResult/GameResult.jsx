import styles from './gameResult.module.scss';
import winner from '../../assets/winner.svg';
import checkmate from '../../assets/checkmate.svg';

const GameResult = ({result, reason, color}) => {

    const src = (result === 'win') ? winner : checkmate;
    const message = (result === 'win') ? 'You Won!' : color + ' Wins';
    const state = (result === 'win') ? styles.win : styles.lose

    return (
        <div className={styles.main}>
            <div className={`${styles.title} ${state}`}>
                <img className={styles.img} src={src}/>
                <div>
                    <div>{message}</div>
                    <div className={styles.reason}>by {reason}</div>
                </div>
            </div>
            <div className={styles.review}>Game Review</div>
            <div className={styles.wrapper}>
                <div className={styles.button}>Rematch</div>
                <div className={styles.button}>New 3 min</div>
            </div>
        </div>
    );
};

export default GameResult;