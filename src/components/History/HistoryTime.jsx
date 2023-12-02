import styles from './historyTime.module.scss'

const HistoryTime = ({data, prevData}) => {
    let milliseconds, seconds, minutes, time, ratio
    const rapid = 180000;
    const figureColor = JSON.parse(data.currentFigure).color
    const color = (figureColor === 'white' ? '#eceed4' : '#222222')

    if (prevData?.timestamp && data.timestamp) {
        const diff = data.timestamp - prevData.timestamp;
        const date = new Date(diff);
        seconds = date.getSeconds();
        milliseconds = Math.round(date.getMilliseconds()/10);
        minutes = date.getMinutes();
        ratio = (diff / rapid * 100) > 100 ? '100%' : diff / rapid * 100 + '%';
        seconds = (seconds < 10 ? '0' + seconds : seconds);
        milliseconds = (milliseconds < 10 ? '0' + milliseconds : milliseconds)
        time = (minutes ? minutes + ':' + seconds + '.' + milliseconds : seconds + '.' + milliseconds);
    }
    return (
        <div>
            <div className={styles.bar}>
                <div className={styles.progress} style={{width: ratio, backgroundColor: color}}></div>
            </div>
            {time}
        </div>
    );
};

export default HistoryTime;