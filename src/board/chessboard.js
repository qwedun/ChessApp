import {memo} from 'react';
import { useState } from 'react'
import Cell from './cell.js'
export default memo(function Chessboard({board, setBoard}) {

    const [currentFigure, setCurrentFigure] = useState()
    const [currentTurn, setCurrentTurn] = useState('white')
    const [currentPlayer, setCurrentPlayer] = useState('white')
    console.log(32123)


    return (
        <div style={{display: 'flex', width: '640px', flexWrap: 'wrap', height: '640px'}}>
            {board?.map((value, yIndex) => (
                value.map((item, xIndex) => {
                    return (
                        <Cell
                            currentTurn={currentTurn}
                            setCurrentTurn = {setCurrentTurn}
                            currentFigure={currentFigure}
                            setCurrentFigure = {setCurrentFigure}
                            setBoard={setBoard}
                            figure = {item}
                            board = {board}
                            cellColor = {((xIndex + yIndex) % 2) ? 'DimGray' : 'white'}
                            currentPlayer = {currentPlayer}
                            src={item.src}>
                        </Cell>
                    )
                })
            ))}
        </div>
    )
}, (prevProps, nextProps) => {

})

