import {useEffect, useRef, useState} from 'react';
import Chessboard from "../../board/chessboard";
import Board from "../../board/board";
import styles from './sessionPage.module.scss'
import Timer from '../../components/Timer/Timer'
import PlayerInfo from '../../components/UI/InGamePlayerInfo/InGamePlayerInfo'
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../../server/firestore";
import {FEN} from "../../board/FEN";
import {GameRules} from "../../board/gameRules";
import {playSound} from "../../helpers/helpers";
import check from "../../assets/sounds/move-check.mp3";
import move from "../../assets/sounds/move-self.mp3";
import castle from "../../assets/sounds/castle.mp3";
import capture from "../../assets/sounds/capture.mp3";
import notify from '../../assets/sounds/notify.mp3'
import GameResult from "../../components/GameResult/GameResult";
import SessionState from "../../components/SessionState/SessionState";
import axios from "axios";
const SessionPage = ({isOnline}) => {
    const colors = {
        b: 'black',
        w: 'white',
        black: 'white',
        white: 'black',
    }

    const [board, setBoard] = useState(Board.createBoard('black'));
    const [currentPlayer] = useState('black');
    const [currentTurn, setCurrentTurn] = useState('white');

    const [history, setHistory] = useState([]);
    const [data, setData] = useState([]);
    const [messages, setMessages] = useState([]);

    const [type, setType] = useState()

    const [gameState, setGameState] = useState({
        result: null,
        reason: null,
        winColor: null,
        show: false,
    });

    let posRefs
    if (isOnline) posRefs = collection(db, 'session')

    else posRefs = collection(db, 'single')
    const chatRefs = collection(db, 'chat');

    const queryPos = query(posRefs, orderBy('timestamp'))
    const queryChat = query(chatRefs, orderBy('timestamp'))

    useEffect(() => {
        onSnapshot(queryPos, snapshot => {
            const local = [];
            const data = [];
            snapshot.forEach(doc => {
                data.push({...doc.data()})
            })
            for (let i = 0; i < data.length; i += 2) {
                local.push(data.slice(i, i + 2))
            }

            setHistory(local)
            setData(data)

            if (data.length === 0) return
            setType(data[data.length - 1].type)

            const state = data[data.length - 1]

            const {turn} = FEN.getDataFromFen(state.FEN)
            const board = FEN.createBoardFromFen(state.FEN);

            if (currentPlayer === 'white')
                setBoard(Board.updateBoard(board, currentPlayer, true))
            else {
                const newBoard = Board.makeOpposite(board)
                setBoard(Board.updateBoard(newBoard, currentPlayer, true))
            }
            setCurrentTurn(colors[turn])
            console.log(state.FEN)
        })

        onSnapshot(queryChat, snapshot => {
            const data = [];
            snapshot.forEach(doc => {
                data.push({...doc.data()})
            })
            setMessages(data);
        })

    }, []);

    const oppositeKing = useRef(Board.findKing(board, colors[currentTurn]))
    const king = useRef(Board.findKing(board, currentPlayer));

    useEffect(() => {

        king.current = Board.findKing(board, currentPlayer);
        oppositeKing.current = Board.findKing(board, colors[currentPlayer]);

        if (data.length === 0) return
        const oppositeBoard = Board.makeOpposite(board);

        if (GameRules.isStalemate(board, currentTurn)) {
            setGameState({
                result: 'stalemate',
                reason: '',
                show: true,
            })
            playSound(notify);
        }
        if (GameRules.isStalemate(Board.updateBoard(oppositeBoard, colors[currentPlayer], true), colors[currentTurn])) {
            setGameState({
                result: 'stalemate',
                reason: '',
                show: true,
            })
            playSound(notify);
        }

        if (king.current.underCheck) {
            playSound(check)
            if (GameRules.isCheckMate(king.current, board)) {
                setGameState({
                    result: 'lose',
                    reason: 'by checkmate',
                    winColor: colors[currentPlayer],
                    show: true,
                });
                playSound(notify);
            }
        } else if (oppositeKing.current.underCheck) {
            playSound(check)
            const local = Board.makeOpposite(board);
            oppositeKing.current = Board.findKing(local, colors[currentPlayer]);
            if (GameRules.isCheckMate(oppositeKing.current, Board.updateBoard(local, colors[currentPlayer], isOnline))) {
                setGameState({
                    result: 'win',
                    reason: 'by checkmate',
                    show: true,
                });
                playSound(notify);
            }
        } else {
            if (type === 'move') playSound(move);
            else if (type === 'castle') playSound(castle);
            else playSound(capture);
        }
    }, [data]);

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.relative}>
                <div className={`${styles.flexContainer} ${styles.flexTop}`}>
                    <PlayerInfo username='bebra' elo='912390' board={board} color={colors[currentPlayer]}/>
                    <Timer currentPlayer={currentPlayer} currentTurn={currentTurn} color={colors[currentPlayer]} data={data} setGameState={setGameState}/>
                </div>
                {gameState.show &&
                    <GameResult
                        result={gameState.result}
                        reason={gameState.reason}
                        color={gameState.winColor}/>
                }
                <Chessboard
                    currentPlayer={currentPlayer}
                    board={board}
                    isOnline={isOnline}
                    currentTurn={currentTurn}
                    king={king}
                    data={data}
                />
                <div className={`${styles.flexContainer} ${styles.flexBottom}`}>
                    <PlayerInfo username='kek' elo='213123' board={board} color={currentPlayer}/>
                    <Timer currentPlayer={currentPlayer} currentTurn={currentTurn} color={currentPlayer} data={data} setGameState={setGameState}/>
                </div>
            </div>
            {<SessionState board={board} setBoard={setBoard}
                           history={history} data={data}
                           messages={messages} chatRefs={chatRefs}
                           currentPlayer={currentPlayer}
            />}
        </div>
    );
};

export default SessionPage