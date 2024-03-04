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
import { useSelector, useDispatch } from "react-redux";
import { setResult, setCurrentPlayer } from "../../store/slices/sessionSlice";
import King from "../../board/figures/king";
import { colors } from "../../constants/constants";
import GameSearch from "../../components/GameSearch/GameSearch";
import LinkCreateModal from "../../components/LinkCreateModal/LinkCreateModal";
import {Link} from "react-router-dom";
import gameAnalysis from "../../components/GameAnalysis/GameAnalysis";
import GameAnalysis from "../../components/GameAnalysis/GameAnalysis";
const SessionPage = ({isOnline}) => {
    const dispatch = useDispatch();
    const login = useSelector(state => state.user.login)

    const [board, setBoard] = useState(Board.createBoard('white'));
    const [currentTurn, setCurrentTurn] = useState('white');
    const [data, setData] = useState([]);
    const [messages, setMessages] = useState([]);
    const [type, setType] = useState();
    const [showGameSearch, setShowGameSearch] = useState(true);
    dispatch(setCurrentPlayer('white'))

    const sessionState = useSelector(state => state.sessionState);
    const currentPlayer = sessionState.currentPlayer;

    let posRefs
    if (isOnline) posRefs = collection(db, 'session')

    else posRefs = collection(db, 'single')
    const chatRefs = collection(db, 'chat');

    const queryPos = query(posRefs, orderBy('server_timestamp'));
    const queryChat = query(chatRefs, orderBy('timestamp'));

    useEffect(() => {
        onSnapshot(queryPos, snapshot => {
            const data = [];
            snapshot.forEach(doc => {
                data.push({...doc.data()})
            })

            setData(data);

            if (data.length === 0) return
            setType(data[data.length - 1].type);

            const state = data[data.length - 1];

            const {turn} = FEN.getDataFromFen(state.FEN);
            let board = FEN.createBoardFromFen(state.FEN);
            if (currentPlayer === 'black') board = Board.makeOpposite(board);
            setBoard(Board.updateBoard(board, currentPlayer, true))

            setCurrentTurn(colors[turn])
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
        if (!data[data.length - 1]?.server_timestamp) return
        king.current = Board.findKing(board, currentPlayer);
            oppositeKing.current = Board.findKing(board, colors[currentPlayer]);

        if (data.length === 0) return
        const oppositeBoard = Board.makeOpposite(board);

        if (GameRules.isStalemate(board, currentTurn) ||
            GameRules.isStalemate(Board.updateBoard(oppositeBoard, colors[currentPlayer], true), currentTurn)) {
            dispatch(setResult({
                result: 'Stalemate',
                reason: '',
                show: true,
            }))
        }

        if (king.current.underCheck) {
            playSound(check)
            if (GameRules.isCheckMate(king.current, board)) {
                dispatch(setResult({
                    result: 'Lose',
                    reason: 'by checkmate',
                    winColor: colors[currentPlayer],
                    show: true,
                }));
                playSound(notify);
            }
        } else if (oppositeKing.current.underCheck) {
            playSound(check)
            const local = Board.makeOpposite(board);
            oppositeKing.current = Board.findKing(local, colors[currentPlayer]);
            if (GameRules.isCheckMate(oppositeKing.current, Board.updateBoard(local, colors[currentPlayer], isOnline))) {
                dispatch(setResult({
                    result: 'Win',
                    reason: 'by checkmate',
                    show: true,
                }));
                playSound(notify);
            }
        } else {
            if (type === 'move') playSound(move);
            else if (type === 'castle') playSound(castle);
            else playSound(capture);
        }

        King.isKingCanCastle(king.current, currentPlayer, board, isOnline, data)

    }, [data]);

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.relative}>
                <div className={`${styles.flexContainer} ${styles.flexTop}`}>
                    <PlayerInfo username='enemy' elo='810' board={board} color={colors[currentPlayer]}/>
                    <Timer currentTurn={currentTurn} color={colors[currentPlayer]} data={data}/>
                </div>
                {sessionState.partyResult.show && <GameResult/>}
                <Chessboard
                    setShowGameSearch={setShowGameSearch}
                    board={board}
                    isOnline={isOnline}
                    currentTurn={currentTurn}
                    king={king}
                    data={data}
                />
                <div className={`${styles.flexContainer} ${styles.flexBottom}`}>
                    <PlayerInfo username={login} elo='800' board={board} color={currentPlayer}/>
                    <Timer currentTurn={currentTurn} color={currentPlayer} data={data}/>
                </div>
            </div>
            {showGameSearch && <GameSearch data={data} setBoard={setBoard} sessionState={sessionState.partyResult.result}/>}
            {!showGameSearch && <SessionState board={board} setBoard={setBoard}
                          data={data} messages={messages}
                          chatRefs={chatRefs}/>}
        </div>
    );
};

export default SessionPage