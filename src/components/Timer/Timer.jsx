import styles from './timer.module.scss'
import {useEffect, useState} from "react";

const Timer = ({currentTurn, currentPlayer}) => {

    const [seconds, setSeconds] = useState(0)
    const [minutes, setMinutes] = useState(3)

    useEffect(() => {
        let timer;
        if (currentTurn === currentPlayer) {
            timer = setInterval(() => {
                setSeconds(prev => {
                    if (prev - 1 < 0) {
                        setMinutes(prev => prev - 1)
                        return 59
                    }
                    return prev - 1
                })
            }, 1000)
        }
        else clearInterval(timer)
        return () => clearInterval(timer)
    }, [currentTurn]);

    return (
        <div className={styles.timer}>
            {minutes}:{seconds < 10 ? '0' + seconds : seconds}
        </div>
    );
};

export default Timer;