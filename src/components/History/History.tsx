import styles from './history.module.scss'
import HistoryString from "./HistoryString";
import HistoryTime from "./HistoryTime";
import { FEN } from "../../board/FEN";
import { FC } from 'react'
import { IFirestoreData, BoardType } from "../../types/types";
import { useCurrentPlayer } from "../../hooks/hooks";
import Board from "../../board/board";

interface HistoryProps {
    data: IFirestoreData[];
    setBoard: (board: BoardType) => void;
}

const History: FC<HistoryProps> = ({data, setBoard}) => {
    const history: IFirestoreData[][] = [];
    const currentPlayer = useCurrentPlayer();

    for (let i = 0; i < data.length; i += 2) {
        history.push(data.slice(i, i + 2))
    }

    const onClick = (fen: string) => {
        if (currentPlayer === 'black')
            setBoard(Board.makeOpposite(FEN.createBoardFromFen(fen)));
        else setBoard(FEN.createBoardFromFen(fen))
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
                                               handleClick={() => onClick(value.FEN)}/>
                                <HistoryTime data={value}
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