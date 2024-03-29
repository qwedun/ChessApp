import styles from './gameResult.module.scss';
import winner from '../../assets/winner.svg';
import checkmate from '../../assets/checkmate.svg';
import { useAppSelector } from "../../hooks/hooks";
import { FC } from 'react'

const GameResult: FC = () => {
    const partyResult = useAppSelector(state => state.session.partyResult);
    const { result } = partyResult;

    let src, message, state;


    if (result === 'Win') {
        src = winner;
        message = 'You Won!';
        state = styles.win
    } else if (result === 'Lose') {
        src = checkmate;
        message = partyResult.winColor + ' Wins';
        state = styles.lose
    } else if (result === 'Stalemate') {
        message = 'Stalemate';
        state = styles.stalemate
    }

    return (
        <div className={styles.main}>
            <div className={`${styles.title} ${state}`}>
                <img className={styles.img} src={src} alt={result}/>
                <div>
                    <div>
                        {message}
                    </div>
                    <div className={styles.reason}>{partyResult.reason}</div>
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