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
import { useSelector } from "react-redux";
import { useCurrentPlayer } from "../hooks/hooks";

export default function Chessboard({board, isOnline, currentTurn, king, data}) {

    const [currentFigure, setCurrentFigure] = useState();
    const [passedPawn, setPassedPawn] = useState(null);
    const [createdFigure, setCreatedFigure] = useState(null);
    const currentPlayer = useCurrentPlayer();

    const type = useRef();
    const posRefs = collection(db, 'session')

    const handleSubmit = async(board, currentFigure, isAttacked) => {
        const whiteBoard = currentPlayer === 'black' ? Board.makeOpposite(board) : board;
        await addDoc(posRefs, {
            FEN: FEN.createFenString(whiteBoard, currentTurn, data, currentFigure, isAttacked),
            timestamp: Date.now(),
            currentFigure: JSON.stringify(currentFigure),
            type: type.current,
        })
    }

    useEffect(() => {
        if (createdFigure) Figure.createFigureFromName(board, createdFigure, passedPawn.x, currentPlayer);
        setPassedPawn(null)
        if (passedPawn) handleSubmit(board, currentFigure)
    }, [createdFigure]);

    useEffect(() => {
        setCurrentFigure(passedPawn)
    }, [passedPawn]);

    function handleClick(figure) {
        if (board.showable) return

        if (!passedPawn) setCurrentFigure(figure)

        if (figure.underAttack || figure.canMove) {
            GameRules.moveFigures(board, currentFigure, figure, type);
            if (figure.y === 0 && currentFigure?.name === 'pawn') {
                setPassedPawn(currentFigure)
            }
            else handleSubmit(board, currentFigure, figure.underAttack);
        }
        Board.removeTitles(board)

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
                {passedPawn && <PawnPassedMenu
                    currentFigure={currentFigure}
                    passedPawn={passedPawn}
                    setPassedPawn={setPassedPawn}
                    setCreatedFigure={setCreatedFigure}
                    setCurrentFigure={setCurrentFigure}
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