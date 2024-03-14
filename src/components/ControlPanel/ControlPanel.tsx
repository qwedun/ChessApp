import styles from './controlPanel.module.scss'
import angleRight from '../../assets/angleRight.svg'
import angleLeft from '../../assets/angleLeft.svg'
import angleDoubleRight from '../../assets/angleDoubleRight.svg'
import angleDoubleLeft from '../../assets/angleDoubleLeft.svg'
import half from '../../assets/half.svg'
import leave from '../../assets/leave.svg'
import { useEffect, useState, FC } from "react";
import Board from "../../board/board";
import { FEN } from '../../board/FEN'
import { useCurrentPlayer } from "../../hooks/hooks";
import { IFirestoreData, BoardType } from "../../types/types";

interface ControlPanelProps {
    data: IFirestoreData[];
    setBoard: (board: BoardType) => void;
}

const ControlPanel: FC<ControlPanelProps> = ({data, setBoard}) => {

    const [index, setIndex] = useState(data.length - 1);
    const currentPlayer = useCurrentPlayer();

    useEffect(() => {
        setIndex(data.length - 1)
    }, [data]);

    const handleNext = () => {
        if (index + 1 > data.length - 1) return

        let board = FEN.createBoardFromFen(data[index + 1].FEN);
        if (currentPlayer === 'black') board = Board.makeOpposite(board);

        if (index + 1 !== data.length - 1) board.showable = true;
        setIndex(index + 1);
        setBoard(board);
    }

    const handlePrev = () => {
        if (index - 1 < 0) return

        let board = FEN.createBoardFromFen(data[index - 1].FEN);

        if (currentPlayer === 'black') board = Board.makeOpposite(board);

        board.showable = true;
        setIndex(index - 1);
        setBoard(board);
    }
    const handleEnd = () => {
        if (!data[0] || index === data.length - 1) return

        let board = FEN.createBoardFromFen(data[data.length - 1].FEN);

        if (currentPlayer === 'black') board = Board.makeOpposite(board);

        setIndex(data.length - 1);
        setBoard(board);
    }

    const handleStart = () => {
        if (!data[0] || index === 0) return
        let board = FEN.createBoardFromFen(data[0].FEN);

        if (currentPlayer === 'black') board = Board.makeOpposite(board);

        board.showable = true;
        setIndex(0);
        setBoard(board);
    }

    return (
        <div className={styles.main}>
            <div className={styles.flex}>
                <div className={styles.container}>
                    <img alt='draw' src={half}/>Draw
                </div>
                <div className={styles.container}>
                    <img alt='abort' src={leave}/>Abort
                </div>
            </div>
            <div>
                <img
                    className={styles.img}
                    alt='to start'
                    src={angleDoubleLeft}
                    onClick={handleStart}/>
                <img
                    className={styles.img}
                    alt='to previous'
                    src={angleLeft}
                    onClick={handlePrev}/>
                <img
                    className={styles.img}
                    alt='to next'
                    src={angleRight}
                    onClick={handleNext}/>
                <img
                    className={styles.img}
                    alt='to end'
                    src={angleDoubleRight}
                    onClick={handleEnd}/>
            </div>
        </div>
    );
};

export default ControlPanel;