import styles from './timer.module.scss'
import {useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResult } from "../../store/slices/sessionSlice";
import { useCurrentPlayer } from "../../hooks/hooks";
import {FEN} from "../../board/FEN";
import clock0 from '../../assets/clock-0000.svg'
import clock1 from '../../assets/clock-0100.svg'
import clock2 from '../../assets/clock-0300.svg'
import clock3 from '../../assets/clock-0500.svg'
import clock4 from '../../assets/clock-0030.svg'
import clock5 from '../../assets/clock-0700.svg'
import clock6 from '../../assets/clock-0900.svg'
import clock7 from '../../assets/clock-1100.svg'


const Timer = ({currentTurn, color, data}) => {
    const sessionState = useSelector(state => state.sessionState.partyResult);
    const dispatch = useDispatch();
    const currentPlayer = useCurrentPlayer();


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
    const timerRef = useRef()

    useEffect(() => {
        if (!data[data.length -3]) return

        let blackTimer = 0, whiteTimer = 0;

        data.forEach((value, index) => {
            const {turn} = FEN.getDataFromFen(value.FEN);
            if (!data[index - 2]) return

            if (turn === 'b') whiteTimer += value.timestamp - data[index - 1].timestamp;
            else blackTimer += value.timestamp - data[index - 1].timestamp;
        })

        if (currentTurn === 'black' && !sessionState.result) blackTimer += Date.now() - data[data.length - 1].timestamp;
        else if (!sessionState.result) whiteTimer += Date.now() - data[data.length - 1].timestamp;

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

        if (currentTurn === color) {
            let setTime;
            color === 'black'? setTime = setBlackTime : setTime = setWhiteTime;
            timerRef.current = setInterval(() => {
                setIndex(prev => prev + 1 < 8 ? prev + 1 : 0);

                setTime(prev => {
                    if (prev.seconds - 1 < 0 && prev.minutes <= 0) {
                        clearInterval(timerRef.current);
                        return {seconds: 0, minutes: 0}
                    }
                    if (prev.seconds - 1 < 0) return {minutes: prev.minutes - 1, seconds: 59}
                    return {...prev, seconds: prev.seconds - 1}
                })
            }, 1000)
        }
        else clearInterval(timerRef.current)
        return ()   => clearInterval(timerRef.current)

    }, [data, sessionState.result]);

    useEffect(() => {
        if (!(whiteTime.seconds <= 0 && whiteTime.minutes <= 0)) return;

        if (currentPlayer === 'white')
            dispatch(setResult({
                result: 'Lose',
                reason: 'by timeout',
                show: true,
                winColor: 'Black',
            }))
        else
            dispatch(setResult({
                result: 'Win',
                reason: 'by timeout',
                show: true,
            }))

    }, [whiteTime]);

    useEffect(() => {
        if (!(blackTime.seconds <= 0 && blackTime.minutes <= 0)) return;

        if (currentPlayer === 'black')
            dispatch(setResult({
                result: 'Lose',
                reason: 'by timeout',
                show: true,
                winColor: 'White',
            }))
        else
            dispatch(setResult({
                result: 'Win',
                reason: 'by timeout',
                show: true,
            }))
    }, [blackTime]);

    useEffect(() => {
        if (!data[data.length -3]) return
        clearInterval(timerRef.current);

        const turn = FEN.getDataFromFen(data[data.length - 1].FEN);
        console.log(turn)

    }, [sessionState.result]);


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