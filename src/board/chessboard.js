import React from 'react';
import { useState } from 'react'
import Board from './board'
import Cell from './cell.js'
function Chessboard(){

    const [board, setBoard] = useState(Board.createBoard('white'))
    const [currentFigure, setCurrentFigure] = useState()
    const [currentTurn, setCurrentTurn] = useState('white')
    const [currentPlayer, setCurrentPlayer] = useState('black')

    return board.map((value, yIndex) => (
        <div
            key={Math.random()}
            style={{display: 'flex'}}>
            {value.map((item, xIndex) => {
                return (
                    <Cell
                        currentTurn={currentTurn}
                        setCurrentTurn = {setCurrentTurn}
                        currentFigure={currentFigure}
                        changeCurrentFigure = {setCurrentFigure}
                        setBoard={setBoard}
                        figure = {item}
                        board = {board}
                        cellColor = {((xIndex + yIndex) % 2) ? 'DimGray' : 'white'}
                        currentPlayer = {currentPlayer}
                        src={item.src}>
                    </Cell>
                )
            })}
        </div>
    ))
}

export default Chessboard