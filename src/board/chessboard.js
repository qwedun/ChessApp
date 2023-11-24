import {useEffect, useState, useRef} from 'react'
import Cell from './cell.js'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./board";
import {GameRules} from "./gameRules";
import {setArray} from "../store/slices/historySlice";
import {useDispatch} from "react-redux";
import { db } from "../server/firestore";
import { addDoc, collection, onSnapshot, query, limit, orderBy, where} from 'firebase/firestore'

export default function Chessboard({board, setBoard, isOnline}) {

    const [currentFigure, setCurrentFigure] = useState()
    const [currentTurn, setCurrentTurn] = useState('white')
    const [currentPlayer] = useState('white')
    let [turn, setTurn] = useState(0)

    const posRefs = collection(db, 'session')

    const handleSubmit = async(figure) => {
        setTurn(++turn)
        await addDoc(posRefs, {
            startPos: JSON.stringify(currentFigure),
            endPos: JSON.stringify(figure),
            room: 'qwedun',
            turn: turn,
        })
    }

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
        const queryPos = query(posRefs, where('turn', '>', turn))
        onSnapshot(queryPos, (snapshot) => {
            setTurn(++turn)
            setCurrentTurn(colors[currentTurn])
            const figures = [];
            snapshot.forEach(doc => {
                figures.push({...doc.data()})
            })
            if (figures.length === 0) return
            console.log(figures, turn)
            const startPOS = Board.createFigureFromJson(JSON.parse(figures[0].endPos))
            const endPOS = Board.createFigureFromJson(JSON.parse(figures[0].startPos))
            const copy = Board.cloneBoard(board)
            copy[startPOS.y][startPOS.x] = endPOS;
            copy[endPOS.y][endPOS.x] = startPOS;
            setBoard(Board.updateBoard(copy, colors[currentTurn], currentPlayer))
        })
    }, [currentTurn]);
    function handleClick(figure) {
        if (figure.underAttack || figure.canMove) {
            handleSubmit(figure).then(res => console.log(res))
            GameRules.moveFigures(board, currentFigure, figure, king.current)
            dispatch(setArray(board.slice()))
            Board.changeTurn(currentTurn, setCurrentTurn)
            setBoard(Board.updateBoard(board, colors[currentTurn], currentPlayer))
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