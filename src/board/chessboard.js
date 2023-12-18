import {useEffect, useState, useRef} from 'react'
import Cell from './cell.js'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./board";
import Figure from "./figures/figure";
import { GameRules } from "./gameRules";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../server/firestore";
import PawnPassedMenu from "../components/PawnPassedMenu/PawnPassedMenu";
import { FEN } from "./FEN";


export default function Chessboard({board, isOnline, currentPlayer, currentTurn, king, data}) {

    const [currentFigure, setCurrentFigure] = useState();
    const [pawnPassed, setPawnPassed] = useState(null);
    const [pawnIndex, setPawnIndex] = useState(null);

    const type = useRef();
    const posRefs = collection(db, 'session')

    const handleSubmit = async(board, currentFigure, isAttacked) => {
        const whiteBoard = currentPlayer === 'black' ? Board.makeOpposite(board) : board;
        await addDoc(posRefs, {
            FEN: FEN.createFenString(whiteBoard, currentTurn, data, currentFigure, isAttacked),
            timestamp: Date.now(),
            currentFigure: JSON.stringify(currentFigure),
            type: type.current
        })
    }

    useEffect(() => {
        if (pawnPassed) Figure.createFigureFromName(board, pawnPassed.figure, pawnIndex, currentPlayer);
        setPawnIndex(null);
        if (pawnIndex || pawnIndex === 0) handleSubmit(board)
    }, [pawnPassed]);


    function handleClick(figure) {
        if (board.showable) return

        if (figure.underAttack || figure.canMove) {
            GameRules.moveFigures(board, currentFigure, figure, type);
            if (!GameRules.isPawnPassed(board, isOnline, currentPlayer, setPawnIndex))
                handleSubmit(board, currentFigure, figure.underAttack);
        }
        Board.removeTitles(board)
        if (!pawnIndex) setCurrentFigure(figure)

        if (isOnline)
            if (figure.color !== currentPlayer || currentTurn !== currentPlayer)
                return

        if (!isOnline)
            if (figure.color !== currentTurn) return

        if (board.attackingFiguresCount > 1) {
            if (figure.name === 'king') figure.checkMoves(board, false, king.current.underCheck, true);
            else return;
        }
        else figure.checkMoves(board, false, king.current.underCheck, true, currentPlayer);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div
                style={{display: 'flex', width: '584px', flexWrap: 'wrap', height: '584px', position: 'relative', border: '12px solid #222222'}}>
                {pawnIndex && <PawnPassedMenu
                    currentPlayer={currentPlayer}
                    pawnPassed={pawnPassed}
                    setPawnPassed={setPawnPassed}
                    pawnIndex={pawnIndex}
                />}
                {board.map((value, yIndex) => (
                    value.map((item, xIndex) => {
                        return (
                            <Cell
                                handleClick={handleClick}
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