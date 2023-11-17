import styles from './cell.module.scss'
import { useDrag, useDrop } from "react-dnd";
import { memo } from "react";

export default function Cell({cellColor, figure, currentFigure, currentTurn, handleClick}) {
    const [, drag] = useDrag(() => ({
        type: 'title',
    }))

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'title',
        canDrop: () => figure.canMove || figure.underAttack,
        drop: () => handleClick(figure),
        collect: monitor => ({
            isOver: !!monitor.isOver()
        })
    }), [currentFigure])

    return (
        <div key={Math.random()}
             className={`${styles.title} ${cellColor === 'black' ? styles.black : styles.white} ${isOver ? styles.isOver : null}`}
             ref={drop}
             onMouseDown={() => handleClick(figure)}>
            {figure.canMove && <div className={styles.canMove}></div>}
            {figure.underAttack && <div className = {styles.underAttack}></div>}
            {figure.src && <img
                ref={drag}
                className={`${styles.img} ${figure.color === currentTurn ? styles.draggable : null}`}
                src={require("" + figure.src)}
                alt="piece"/>}
        </div>
    )
}

