import Board from './board.js'
import styles from './cell.module.scss'
import {GameRules} from "./gameRules";
import {useDispatch} from "react-redux";
import {setArray} from "../store/slices/historySlice";
import {memo} from "react";


export default memo(function Cell({src, cellColor, setBoard, figure, board, currentFigure, setCurrentFigure, setCurrentTurn, currentPlayer, currentTurn}) {
    const style = {
        backgroundColor: cellColor,
        width: "80px",
        height: "80px",
        position: 'relative'
    }
    const dispatch = useDispatch();
    if (!figure.name) console.log(figure)



    const handleDragStart = (e, currentFigure) => {
    }
    const  handleDragDrop = (e) => {
        e.preventDefault()
        if (figure.underAttack || figure.canMove) {
            GameRules.moveFigures(board, currentFigure, figure)
            Board.changeTurn(currentTurn, setCurrentTurn);
            dispatch(setArray(board.slice()))
        }
        setBoard(Board.updateBoard(board, currentTurn, currentPlayer))
    }
    const handleDragEnter = (e) => {

    }

    const handleDragLeave = (e) => {

    }

    const handleDragOver = (e) => {
        e.preventDefault();
        e.target.classList.add(styles.yellow)
    }

    function handleClick(e) {
        const currentKing   = Board.findKing(board, currentTurn)


        if (figure.underAttack || figure.canMove) {
            GameRules.moveFigures(board, currentFigure, figure)
            Board.changeTurn(currentTurn, setCurrentTurn);
            dispatch(setArray(board.slice()))
        }
        setBoard(Board.updateBoard(board, currentTurn, currentPlayer));
        console.log('render')

        GameRules.isCheckMate(currentKing, board)
        GameRules.isStalemate(board, currentTurn)



        setCurrentFigure(figure)



        if (figure.name && figure.color !== currentTurn) return

        if (board.attackingFiguresCount > 1) {
            if (figure.name === 'king') figure.checkMoves?.(board, false, currentKing.underCheck, true);
            else return;
        }
        else figure.checkMoves?.(board, false, currentKing.underCheck, true, currentPlayer);
    }

    return (
        <div key={Math.random()}
             draggable={!!figure.name}
             onDragStart={e => handleDragStart(e, currentFigure)}
             onDragEnter={handleDragEnter}
             onDragOver={handleDragOver}
             onDragLeave={handleDragLeave}
             onDrop={handleDragDrop}
             onMouseDown = {handleClick}
             style={style}>
            {src && <img
                style={{padding: '5px'}}
                src={require("" + src)}
                alt="piece"/>}
            {figure.canMove && <div className={styles.canMove}></div>}
            {figure.underAttack && <div className = {styles.underAttack}></div>}
        </div>
    )
}, (prevProps, nextProps) => {

})
