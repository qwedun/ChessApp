import styles from './cell.module.scss'
import { MutableRefObject, FC, useRef } from 'react'
import { IFigure } from "../types/types";

interface ICellProps {
    cellColor: string;
    setImgRef: (value: MutableRefObject<any> | null) => void;
    boardRef: MutableRefObject<any>;
    imgRefer: MutableRefObject<HTMLImageElement> | null;
    figure: IFigure;
    handleClick: (figure: IFigure) => void;
    currentPlayer: string;
}

const Cell: FC<ICellProps> = ({cellColor, setImgRef, boardRef, imgRefer, figure, handleClick, currentPlayer}) => {

    const imgRef = useRef<HTMLImageElement>(null);

    const onMouseDown = () => {
        if (figure.color !== currentPlayer || !figure.color) return
        setImgRef(imgRef)
        handleClick(figure);
    }

    const onMouseUp = () => {
        boardRef.current.style.cursor = 'default';
        handleClick(figure);
        setImgRef(null);
    }

    const style = (imgRefer ? styles.grabbing : figure.color === currentPlayer ? styles.draggable : '')

    return (
        <div key={Math.random()}
             className={`${cellColor === 'black' ? styles.black : styles.white} ${style}`}
             onMouseUp={onMouseUp}
             onMouseDown={onMouseDown}>
            {figure.canMove && <div className={styles.canMove}></div>}
            {figure.underAttack && <div className = {styles.underAttack}></div>}
            {figure.src &&
                <img ref={imgRef}
                     width='70px'
                     height='70px'
                     className={`${styles.img}`}
                     src={require('.' + figure.src)}
                     alt="piece"/>
            }
        </div>
    )
}

export default Cell