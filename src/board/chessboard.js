import { playSound } from "../helpers/helpers";
import {useEffect, useState, useRef} from 'react'
import Cell from './cell.js'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./board";
import {GameRules} from "./gameRules";
import {setArray} from "../store/slices/historySlice";
import {useDispatch} from "react-redux";
import capture from "../assets/sounds/capture.mp3";
import move from '../assets/sounds/move-self.mp3'
import check from '../assets/sounds/move-check.mp3'

export default function Chessboard({board, setBoard}) {

    const [currentFigure, setCurrentFigure] = useState()
    const [currentTurn, setCurrentTurn] = useState('white')
    const [currentPlayer] = useState('white')

    const colors = {
        black: 'white',
        white: 'black'
    }

    const dispatch = useDispatch()

    const king = useRef(Board.findKing(board, currentTurn))

    useEffect(() => {
        king.current = Board.findKing(board, currentTurn)
        if (king.current.underCheck) {
            GameRules.isCheckMate(king.current, board)
            GameRules.isStalemate(board, currentTurn)
        }
    }, [board, currentTurn]);

    function handleClick(figure) {
        if (figure.underAttack || figure.canMove) {
            GameRules.moveFigures(board, currentFigure, figure, king.current)
            dispatch(setArray(board.slice()))
            Board.changeTurn(currentTurn, setCurrentTurn)
            setBoard(Board.updateBoard(board, colors[currentTurn], currentPlayer))
        }
        Board.removeTitles(board)

        setCurrentFigure(figure)

        if (figure.name && figure.color !== currentTurn) return

        if (board.attackingFiguresCount > 1) {
            if (figure.name === 'king') figure.checkMoves?.(board, false, king.current.underCheck, true);
            else return;
        }
        else figure.checkMoves?.(board, false, king.current.underCheck, true, currentPlayer);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{display: 'flex', width: '640px', flexWrap: 'wrap', height: '640px', position: 'relative'}}>
                {board.map((value, yIndex) => (
                    value.map((item, xIndex) => {
                        return (
                            <Cell
                                handleClick={handleClick}
                                currentTurn={currentTurn}
                                currentFigure={currentFigure}
                                figure = {item}
                                cellColor = {((xIndex + yIndex) % 2) ? 'black' : 'white'}>
                            </Cell>
                        )
                    })
                ))}
            </div>
        </DndProvider>
    )
}