import styles from './timer.module.scss'
import {useEffect, useState} from "react";
import {FEN} from "../../board/FEN";
import clock0 from '../../assets/clock-0000.svg'
import clock1 from '../../assets/clock-0100.svg'
import clock2 from '../../assets/clock-0300.svg'
import clock3 from '../../assets/clock-0500.svg'
import clock4 from '../../assets/clock-0030.svg'
import clock5 from '../../assets/clock-0700.svg'
import clock6 from '../../assets/clock-0900.svg'
import clock7 from '../../assets/clock-1100.svg'


const Timer = ({currentTurn, color, data, setGameState, currentPlayer}) => {

    const [blackTime, setBlackTime] = useState({
        minutes: 3,
        seconds: 0,
    })

    const [whiteTime, setWhiteTime] = useState({
        minutes: 3,
        seconds: 0,
    })
    const [index, setIndex] = useState(0);
    const clock = [clock0, clock1, clock2, clock3, clock4, clock5, clock6, clock7];

    useEffect(() => {
        if (!data[data.length -3]) return

        let blackTimer = 0, whiteTimer = 0;

        data.forEach((value, index) => {
            const {turn} = FEN.getDataFromFen(value.FEN);
            if (!data[index - 2]) return

            if (turn === 'b') whiteTimer += value.timestamp - data[index - 1].timestamp;
            else blackTimer += value.timestamp - data[index - 1].timestamp;
        })

        if (currentTurn === 'black') blackTimer += Date.now() - data[data.length - 1].timestamp;
        else whiteTimer += Date.now() - data[data.length - 1].timestamp;

        blackTimer = 180000 - blackTimer;
        whiteTimer = 180000 - whiteTimer;

        const blackMinutes = Math.floor(blackTimer / 60000);
        const whiteMinutes = Math.floor(whiteTimer / 60000);

        const blackSeconds = ((blackTimer % 60000) / 1000).toFixed(0)
        const whiteSeconds = ((whiteTimer % 60000) / 1000).toFixed(0)

        setBlackTime({
            minutes: blackMinutes < 0 ? 0 : blackMinutes,
            seconds: blackSeconds < 0 ? 0 : blackSeconds,
        });

        setWhiteTime({
            minutes: whiteMinutes < 0 ? 0 : whiteMinutes,
            seconds: whiteSeconds < 0 ? 0 : whiteSeconds,
        });

        let timer;
        if (currentTurn === color) {
            let setTime;
            color === 'black'? setTime = setBlackTime : setTime = setWhiteTime;
            timer = setInterval(() => {
                setIndex(prev => prev + 1 < 8 ? prev + 1 : 0);

                setTime(prev => {
                    if (prev.seconds - 1 < 0 && prev.minutes <= 0) {
                        clearInterval(timer);
                        return {seconds: 0, minutes: 0}
                    }
                    if (prev.seconds - 1 < 0) return {minutes: prev.minutes - 1, seconds: 59}
                    return {...prev, seconds: prev.seconds - 1}
                })
            }, 1000)
        }
        else clearInterval(timer)
        return ()   => clearInterval(timer)

    }, [data]);

    useEffect(() => {
        if (!(whiteTime.seconds <= 0 && whiteTime.minutes <= 0)) return;

        if (currentPlayer === 'white')
            setGameState({
                result: 'lose',
                reason: 'by timeout',
                show: true,
                winColor: 'Black',
            })
        else
            setGameState({
                result: 'win',
                reason: 'by timeout',
                show: true,
            })

    }, [whiteTime]);

    useEffect(() => {
        if (!(blackTime.seconds <= 0 && blackTime.minutes <= 0)) return;

        if (currentPlayer === 'black')
            setGameState({
                result: 'lose',
                reason: 'by timeout',
                show: true,
                winColor: 'White',
            })
        else
            setGameState({
                result: 'win',
                reason: 'by timeout',
                show: true,
            })
    }, [blackTime]);


    const blackTimeString = `${blackTime.minutes}:${blackTime.seconds < 10 ? '0' + blackTime.seconds : blackTime.seconds}`
    const whiteTimeString = `${whiteTime.minutes}:${whiteTime.seconds < 10 ? '0' + whiteTime.seconds : whiteTime.seconds}`

    const style = (currentTurn === color ? styles.active : null);

    return (
        <div className={`${styles.timer} ${style}`}>
            <img alt='clock' src={clock[index]}/>
            {color === 'black' ? blackTimeString : whiteTimeString}
        </div>
    );
};

export default Timer;