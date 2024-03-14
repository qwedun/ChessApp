import styles from './historyTime.module.scss'
import { FEN } from "../../board/FEN";
import { FC } from 'react'
import { IFirestoreData } from "../../types/types";

interface HistoryTimeProps {
    data: IFirestoreData;
    prevData: IFirestoreData | undefined;
}

const HistoryTime: FC<HistoryTimeProps> = ({data, prevData}) => {
    if (!prevData || !data.currentFigure) return

    let milliseconds, seconds, minutes, time, ratio
    const rapid = 180000;
    const figureColor = JSON.parse(data.currentFigure).color
    const color = (figureColor === 'white' ? '#d4d3d3' : 'black')
    let style;

    const {turn} = FEN.getDataFromFen(data.FEN);
    if (turn === 'w') {
        style = styles.black;
    } else style = styles.white

    if (prevData?.timestamp && data.timestamp) {
        const diff = data.timestamp - prevData.timestamp;
        const date = new Date(diff);
        seconds = date.getSeconds();
        milliseconds = Math.round(date.getMilliseconds()/10);
        minutes = date.getMinutes();
        ratio = (diff / rapid * 100) > 100 ? '100%' : diff / rapid * 100 + '%';
        milliseconds = (milliseconds < 10 ? '0' + milliseconds : String(milliseconds).slice(0, -1))
        time = (minutes ? minutes + ':' + seconds + '.' + milliseconds : seconds + '.' + milliseconds);
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.bar}>
                <div className={`${styles.progress} ${style}`} style={{width: ratio, backgroundColor: color}}>
                    <span className={styles.time}>{time}</span>
                </div>
            </div>
        </div>
    );
};

export default HistoryTime;