import styles from './timer.module.scss'
import {useEffect, useState, useRef} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setResult } from "../../store/slices/sessionSlice";
import { useCurrentPlayer } from "../../hooks/hooks";
import {FEN} from "../../board/FEN";
import { CLOCK } from "../../constants/constants";


const Timer = ({currentTurn, color, data}) => {

    const sessionState = useSelector(state => state.sessionState.partyResult);
    const dispatch = useDispatch();
    const currentPlayer = useCurrentPlayer();

    const [blackTime, setBlackTime] = useState(180)
    const [whiteTime, setWhiteTime] = useState(180)

    const [index, setIndex] = useState(0);
    const timerRef = useRef()

    useEffect(() => {
        if (!data[data.length - 2]) return

        let blackTimer = 180000, whiteTimer = 180000;

        data.forEach((value, index) => {
            const {turn} = FEN.getDataFromFen(value.FEN);
            if (!data[index - 1]) return

            if (turn === 'b') whiteTimer -= value.timestamp - data[index - 1].timestamp;
            else blackTimer -= value.timestamp - data[index - 1].timestamp;
        })


        if (currentTurn === 'black' && !sessionState.result) blackTimer -= Date.now() - data[data.length - 1].timestamp;
        else if (!sessionState.result) whiteTimer -= Date.now() - data[data.length - 1].timestamp;

        setBlackTime(Math.floor(blackTimer / 1000));
        setWhiteTime(Math.floor(whiteTimer / 1000));

        if (currentTurn === 'white') {
            if (sessionState.reason === 'by timeout') setWhiteTime(0)
        } else if (sessionState.reason === 'by timeout') setBlackTime(0);

        if (blackTimer < 0 || whiteTimer < 0)
            return

        if (currentTurn === color) {
            let setTime;
            color === 'black'? setTime = setBlackTime : setTime = setWhiteTime;
            timerRef.current = setInterval(() => {
                setIndex(prev => prev + 1 < 8 ? prev + 1 : 0);
                setTime(prev => {
                    if (prev - 1 > 0) return prev - 1
                    clearInterval(timerRef.current)
                    return 0;
                });
            }, 1000)
        }
        else clearInterval(timerRef.current)
        return ()   => clearInterval(timerRef.current)

    }, [data, sessionState.result]);

    useEffect(() => {
        if (whiteTime > 0) return;

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
                winColor: 'White',
            }))
    }, [whiteTime]);

    useEffect(() => {
        if (blackTime > 0) return;

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
                winColor: 'Black'
            }))
    }, [blackTime]);

    useEffect(() => {
        if (!data[0]) return
        clearInterval(timerRef.current)
    }, [sessionState.result]);

    const blackTimeString = `${Math.floor(blackTime / 60)}:${blackTime % 60 < 10 ? '0' + blackTime % 60 : blackTime % 60}`
    const whiteTimeString = `${Math.floor(whiteTime / 60)}:${whiteTime % 60 < 10 ? '0' + whiteTime % 60 : whiteTime % 60}`

    const style = (currentTurn === color ? styles.active : null);

    return (
        <div className={`${styles.timer} ${style}`}>
            <img alt='clock' src={CLOCK[index]}/>
            {color === 'black' ? blackTimeString : whiteTimeString}
        </div>
    );
};

export default Timer;