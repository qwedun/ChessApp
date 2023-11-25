import {useEffect, useState, useRef} from 'react'
import Cell from './cell.js'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./board";
import {GameRules} from "./gameRules";
import {setArray} from "../store/slices/historySlice";
import {useDispatch} from "react-redux";
import {collection, limit, onSnapshot, orderBy, query, addDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../server/firestore";

export default function Chessboard({board, setBoard, isOnline}) {

    const [currentFigure, setCurrentFigure] = useState()
    const [currentTurn, setCurrentTurn] = useState('white')
    const [currentPlayer] = useState('white')

    const colors = {
        black: 'white',
        white: 'black'
    }

    const dispatch = useDispatch()

    const king = useRef(Board.findKing(board, currentTurn))

    const posRefs = collection(db, 'session')

    useEffect(() => {
        const queryPos = query(posRefs, orderBy('timestamp', 'desc'), limit(1))
        onSnapshot(queryPos, (snapshot) => {
            const data = [];
            snapshot.forEach(doc => {
                data.push({...doc.data()})
            })
            if (data.length === 0) return
            const board = Board.createBoardFromJSON(JSON.parse(data[0].board))
            setBoard(board)
        })
    }, []);

    const handleSubmit = async(board) => {
        await addDoc(posRefs, {
            board: JSON.stringify(board),
            timestamp: serverTimestamp(),
        })
    }

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