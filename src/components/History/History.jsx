import styles from './history.module.scss'
import HistoryString from "./HistoryString";
import HistoryTime from "./HistoryTime";
const History = ({history, currentPlayer}) => {
    return (
        <div className={styles.history}>
            {history.map((data, index) => {
                const style = (index % 2 === 0 ? styles.light : styles.dark)
                return (
                    <div className={`${style} ${styles.container}`}>{index + 1 + '.'}
                        {data.map((data, i, array) => {
                            let prevData
                            if (index !== 0 || i === 1)
                                prevData = array[i - 1] || history[index - 1][1];
                            return (<>
                                <div className={styles.flex}>
                                    <HistoryString
                                        data={data}
                                        prevData={prevData}
                                        currentPlayer={currentPlayer}/>
                                </div>
                                <HistoryTime
                                    data={data}
                                    prevData={prevData}/>
                            </>)
                        })}
                    </div>
                )
            })}
        </div>
    );
};

export default History;