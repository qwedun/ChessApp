import React, {useEffect, useState, useRef, FC, MutableRefObject} from 'react'
import Cell from './cell'
import Board from "./board";
import Figure from "./figures/figure";
import { GameRules } from "./gameRules";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../server/firestore";
import PawnPassedMenu from "../components/PawnPassedMenu/PawnPassedMenu";
import { FEN } from "./FEN";
import { useCurrentPlayer } from "../hooks/hooks";
import styles from './chessboard.module.scss'
import {BoardType, IFigure, IFirestoreData} from "../types/types";

interface IChessboardProps {
    setShowGameSearch: (value: boolean) => void;
    board: BoardType;
    isOnline: boolean;
    currentTurn: string;
    king: MutableRefObject<IFigure>;
    data: IFirestoreData[];
}

const Chessboard: FC<IChessboardProps> = ({setShowGameSearch, board, isOnline, currentTurn, king, data}) => {

    const boardRef = useRef<HTMLDivElement>(document.createElement('div'));
    const [currentFigure, setCurrentFigure] = useState<IFigure | null>(null);
    const [passedPawn, setPassedPawn] = useState<IFigure | null>(null);
    const [createdFigure, setCreatedFigure] = useState<string>('');
    const [imgRef, setImgRef] = useState<MutableRefObject<HTMLImageElement> | null>(null)
    const currentPlayer = useCurrentPlayer();

    const type = useRef<string>('');
    const posRefs = collection(db, 'session');

    const handleSubmit = async(board: BoardType, currentFigure: IFigure, isAttacked: boolean) => {
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
        if (createdFigure) Figure.createFigureFromName(board, createdFigure, passedPawn!.x, currentPlayer);
        setPassedPawn(null)
        if (passedPawn) handleSubmit(board, currentFigure!, false)
    }, [createdFigure]);

    useEffect(() => {
        setCurrentFigure(passedPawn)
    }, [passedPawn]);

    function handleClick(figure: IFigure) {
        if (board.showable) return
        setShowGameSearch(false);

        if (!passedPawn) setCurrentFigure(figure)

        if (figure.underAttack || figure.canMove) {
            GameRules.moveFigures(board, currentFigure!, figure, type);
            if (figure.y === 0 && currentFigure?.name === 'pawn') {
                setPassedPawn(currentFigure)
            }
            else handleSubmit(board, currentFigure!, figure.underAttack || false);
        }
        Board.removeTitles(board)

        if (isOnline)
            if (figure.color !== currentPlayer || currentTurn !== currentPlayer)
                return

        if (!isOnline)
            if (figure.color !== currentTurn) return

        if (board.attackingFiguresCount && board.attackingFiguresCount > 1) {
            if (figure.name === 'king') figure.checkMoves?.(board, false, king.current.underCheck || false, true);
        }
        else figure.checkMoves?.(board, false, king.current.underCheck || false, true, currentPlayer);
    }

    const move = (e: React.MouseEvent<Element, MouseEvent>, imgRef: MutableRefObject<HTMLImageElement>) => {
        e.preventDefault()
        const rect = boardRef.current.getBoundingClientRect();
        boardRef.current.style.cursor = 'grabbing';
        imgRef.current.style.position = 'absolute';
        imgRef.current.style.left = e.clientX - rect.left  - imgRef.current.width + 'px';
        imgRef.current.style.top = e.clientY - rect.top - imgRef.current.height + 'px';
    }

    return (
        <div className={styles.chessboard}
             ref={boardRef}
             onMouseMove={imgRef ? (e) => move(e, imgRef) : undefined}>
            {passedPawn && <PawnPassedMenu
                passedPawn={passedPawn}
                setCreatedFigure={setCreatedFigure}
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
                            cellColor = {((xIndex + yIndex) % 2) ? 'black' : 'white'}
                        />
                    )
                })
            ))}
        </div>
    )
}

export default Chessboard