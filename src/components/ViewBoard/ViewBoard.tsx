import styles from './viewBoard.module.scss'
import { BoardType } from "../../types/types";
import { FC } from "react";
interface ViewBoardProps {
    board: BoardType
}

const ViewBoard: FC<ViewBoardProps> = ({board}) => {
    return (
        <div className={styles.chessboard}>
            {board.map((row, yIndex) => {
                return row.map((figure, xIndex) => {
                    const cellColor = ((xIndex + yIndex) % 2) ? styles.black : styles.white;
                    return (
                        <div className={cellColor}>
                            {figure.src &&
                                <img
                                    className={styles.img}
                                    src={require('../../board' + figure.src)}
                                    alt={figure.color + figure.name}/>}
                        </div>
                    )
                })
            })}
        </div>
    );
};

export default ViewBoard;