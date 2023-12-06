import {useEffect, useState, useRef} from 'react'
import Cell from './cell.js'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./board";
import Figure from "./figures/figure";
import {GameRules} from "./gameRules";
import {collection, addDoc} from "firebase/firestore";
import {db} from "../server/firestore";
import PawnPassedMenu from "../components/PawnPassedMenu/PawnPassedMenu";
import {playSound} from "../helpers/helpers";
import move from '../assets/sounds/move-self.mp3'

export default function Chessboard({board, isOnline, currentPlayer, currentTurn}) {

    const [currentFigure, setCurrentFigure] = useState();
    const [pawnPassed, setPawnPassed] = useState(null);
    const [pawnIndex, setPawnIndex] = useState(null);

    const king = useRef(Board.findKing(board, currentTurn));

    let posRefs
    if (isOnline) posRefs = collection(db, 'session')
    else posRefs = collection(db, 'single')

    const handleSubmit = async(board) => {
        await addDoc(posRefs, {
            board: JSON.stringify(board),
            currentPlayer: currentPlayer,
            turn: currentTurn,
            timestamp: Date.now(),
            currentFigure: JSON.stringify(currentFigure),
        })
    }

    useEffect(() => {
        king.current = Board.findKing(board, currentTurn);
        if (king.current.underCheck) {
            GameRules.isCheckMate(king.current, board);
            GameRules.isStalemate(board, currentTurn);
        }
    }, [board]);

    useEffect(() => {
        Figure.createFigureFromName(board, pawnPassed, pawnIndex, currentPlayer);
        setPawnIndex(null);
        if (pawnIndex) handleSubmit(board)
    }, [pawnPassed]);


    function handleClick(figure) {
        if (board.showable) return

        if (figure.underAttack || figure.canMove) {
            GameRules.moveFigures(board, currentFigure, figure, king.current);
            if (!GameRules.isPawnPassed(board, isOnline, currentPlayer, setPawnIndex))
                handleSubmit(board);
        }

        Board.removeTitles(board)
        setCurrentFigure(figure)

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
                style={{display: 'flex', width: '560px', flexWrap: 'wrap', height: '560px', position: 'relative'}}>
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