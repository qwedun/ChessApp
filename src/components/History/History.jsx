import styles from './history.module.scss'
import HistoryString from "./HistoryString";
import HistoryTime from "./HistoryTime";
import { FEN } from "../../board/FEN";

const History = ({data, setBoard}) => {
    const history = [];

    for (let i = 0; i < data.length; i += 2) {
        history.push(data.slice(i, i + 2))
    }
    return (
        <div className={styles.history}>
            {history.map((data, index) => {
                const style = (index % 2 === 0 ? styles.light : styles.dark)
                return (
                    <div className={`${style} ${styles.container}`}>{index + 1 + '.'}
                        {data.map((value, i, array) => {
                            let prevData
                            if (index !== 0 || i === 1)
                                prevData = array[i - 1] || history[index - 1][1];
                            return (<>
                                <HistoryString data={value}
                                               onClick={() => setBoard(FEN.createBoardFromFen(value.FEN))}/>
                                <HistoryTime data={value} prevData={prevData}/>
                            </>)
                        })}
                    </div>
                )
            })}
        </div>
    );
};

export default History;