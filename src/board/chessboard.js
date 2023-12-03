import {useEffect, useState, useRef} from 'react'
import Cell from './cell.js'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./board";
import {GameRules} from "./gameRules";
import {setArray} from "../store/slices/historySlice";
import {useDispatch} from "react-redux";
import {collection, limit, onSnapshot, orderBy, query, addDoc} from "firebase/firestore";
import {db} from "../server/firestore";

export default function Chessboard({board, setBoard, isOnline, currentPlayer, currentTurn, setCurrentTurn}) {

    const [currentFigure, setCurrentFigure] = useState()

    const colors = {
        black: 'white',
        white: 'black'
    }

    const dispatch = useDispatch()

    const king = useRef(Board.findKing(board, currentTurn))

    let posRefs
    if (isOnline) posRefs = collection(db, 'session')
    else posRefs = collection(db, 'single')

    useEffect(() => {
        const queryPos = query(posRefs, orderBy('timestamp', 'desc'), limit(1))
        onSnapshot(queryPos, (snapshot) => {
            const data = [];
            snapshot.forEach(doc => {
                data.push({...doc.data()})
            })
            if (data.length === 0) return
            const board = Board.createBoardFromJSON(JSON.parse(data[0].board))
            if (currentPlayer === data[0].currentPlayer)
                setBoard(Board.updateBoard(board, currentPlayer, currentPlayer, true))
            else {
                const newBoard = Board.makeOpposite(board)
                setBoard(Board.updateBoard(newBoard, currentPlayer, currentPlayer, true))
            }
            setCurrentTurn(colors[data[0].turn])
        })
    }, []);

    const handleSubmit = async(board) => {
        await addDoc(posRefs, {
            board: JSON.stringify(board),
            currentPlayer: currentPlayer,
            turn: currentTurn,
            timestamp: Date.now(),
            currentFigure: JSON.stringify(currentFigure)
        })
    }

    useEffect(() => {
        king.current = Board.findKing(board, currentTurn);
        if (king.current.underCheck) {
            GameRules.isCheckMate(king.current, board);
            GameRules.isStalemate(board, currentTurn);
        }
    }, [board]);

    function handleClick(figure) {
        console.log(board)
        if (board.showable) return
        if (figure.underAttack || figure.canMove) {
            GameRules.moveFigures(board, currentFigure, figure, king.current)
            dispatch(setArray(board.slice()))
            handleSubmit(board)
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
                style={{display: 'flex', width: '480px', flexWrap: 'wrap', height: '480px', position: 'relative'}}>
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