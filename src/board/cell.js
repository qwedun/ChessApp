import React from 'react';
import Board from './board.js'
import styles from './cell.module.scss'
import Title from './figures/title.js'
import Figure from "./figures/figure.js";
import King from './figures/king.js'



function Cell({src, cellColor, setBoard, figure, board, currentFigure, changeCurrentFigure, setCurrentTurn, currentTurn}) {
    const style = {
        backgroundColor: cellColor,
        width: "80px",
        height: "80px",
        position: 'relative'
    }
    function handleClick(e) {
        const currentKing   = Board.findKing(board, currentTurn)

        if (board[figure.y][figure.x].underAttack || board[figure.y][figure.x].canMove) {
            Figure.moveFigures(currentFigure, figure, board);
            Board.changeTurn(currentTurn, setCurrentTurn);
        }


        setBoard(Board.updateBoard(board, currentTurn));
        // setBoard(Board.updateStateBoard(board,
        //    currentTurn === 'black' ? 'white' : 'black', boardState, false))

        console.log(board)

        if (currentKing.underCheck) {
            if (board.attackingFiguresCount > 1) {
                if (King.isKingCantMove(board, currentKing))
                    alert("LOSE")
            }
            else {
                if (King.isKingCantMove(board, currentKing) && King.isKingCantBeDefended(board, currentKing))
                    alert("LOSE")
            }
            console.log(King.isKingCantMove(board, currentKing), King.isKingCantBeDefended(board, currentKing))
        }

        changeCurrentFigure(figure)

        if (figure.name && figure.color !== currentTurn) return



        if (board.attackingFiguresCount > 1) {
            if (figure.name === 'king') figure.checkMoves?.(board, false, currentKing.underCheck, true);
            else return;
        }
        else figure.checkMoves?.(board, false, currentKing.underCheck, true);

    }

    return (
        <div key={Math.random()}
            onClick = {handleClick}
            style={style}>
            {src && <img style={{padding: '5px'}} src={require("" + src)} alt="piece"/>}
            {figure.canMove && <div className={styles.canMove}></div>}
            {figure.underAttack && <div className = {styles.underAttack}></div>}
        </div>
    )
}
export default Cell;