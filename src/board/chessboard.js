import {useEffect, useState, useRef} from 'react'
import Cell from './cell.js'
import Board from "./board";
import Figure from "./figures/figure";
import { GameRules } from "./gameRules";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../server/firestore";
import PawnPassedMenu from "../components/PawnPassedMenu/PawnPassedMenu";
import { FEN } from "./FEN";
import { useCurrentPlayer } from "../hooks/hooks";
import styles from './chessboard.module.scss'

export default function Chessboard({setShowGameSearch, board, isOnline, currentTurn, king, data}) {

    const boardRef = useRef();
    const [currentFigure, setCurrentFigure] = useState();
    const [passedPawn, setPassedPawn] = useState(null);
    const [createdFigure, setCreatedFigure] = useState(null);
    const [imgRef, setImgRef] = useState(null)
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
            server_timestamp: serverTimestamp(),
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
        setShowGameSearch(false);

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

    const move = (e, imgRef) => {
        e.preventDefault()
        const rect = boardRef?.current.getBoundingClientRect();
        boardRef.current.style.cursor = 'grabbing';
        imgRef.current.style.position = 'absolute';
        imgRef.current.style.left = e.clientX - rect.left  - imgRef.current.width + 'px';
        imgRef.current.style.top = e.clientY - rect.top - imgRef.current.height + 'px';
    }

    return (
        <div className={styles.chessboard}
             ref={boardRef}
             onMouseMove={imgRef ? (e) => move(e, imgRef) : null}>
            {passedPawn && <PawnPassedMenu
                currentFigure={currentFigure}
                passedPawn={passedPawn}
                setPassedPawn={setPassedPawn}
                setCreatedFigure={setCreatedFigure}
                setCurrentFigure={setCurrentFigure}
            />}
            {board.map((row, yIndex) => (
                row.map((figure, xIndex) => {
                    return (
                        <Cell
                            imgRefer={imgRef}
                            boardRef={boardRef}
                            currentPlayer={currentPlayer}
                            setImgRef={setImgRef}
                            handleClick={handleClick}
                            figure = {figure}
                            cellColor = {((xIndex + yIndex) % 2) ? 'black' : 'white'}>
                        </Cell>
                    )
                })
            ))}
        </div>
    )
}