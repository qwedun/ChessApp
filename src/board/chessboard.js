import React from 'react';
import { useState } from 'react'
import Board from './board'
import Cell from './cell.js'
function Chessboard(){

    const [board, setBoard] = useState(Board.createBoard())
    const [currentFigure, setCurrentFigure] = useState()
    const [currentTurn, setCurrentTurn] = useState('white')

        return board.map((value, yIndex) => (
            <div
                key={Math.random()}
                style={{display: 'flex'}}>
                {value.map((item, xIndex) => {

                    if ((xIndex + yIndex) % 2 === 1) return (
                        <Cell
                            currentTurn={currentTurn}
                            setCurrentTurn = {setCurrentTurn}
                            currentFigure={currentFigure}
                            changeCurrentFigure = {setCurrentFigure}
                            setBoard={setBoard}
                            figure = {item}
                            board = {board}
                            cellColor = "DimGray"
                            src={item.src}>
                        </Cell>
                    )
                        return (
                            <Cell
                                currentTurn={currentTurn}
                                setCurrentTurn = {setCurrentTurn}
                                currentFigure={currentFigure}
                                changeCurrentFigure = {setCurrentFigure}
                                setBoard={setBoard}
                                figure = {item}
                                board = {board}
                                cellColor = "white"
                                src={item.src}>

                            </Cell>
                        )
                    })}
             </div>
        ))
}

export default Chessboard