import { useEffect, useRef, useState, FC } from 'react';
import Chessboard from "../../board/chessboard";
import Board from "../../board/board";
import styles from './sessionPage.module.scss'
import Timer from '../../components/Timer/Timer'
import PlayerInfo from '../../components/UI/InGamePlayerInfo/InGamePlayerInfo'
import {collection, getDocs, onSnapshot, orderBy, query, writeBatch} from "firebase/firestore";
import { db } from "../../server/firestore";
import { FEN } from "../../board/FEN";
import { GameRules } from "../../board/gameRules";
import { playSound } from "../../helpers/helpers";
import check from "../../assets/sounds/move-check.mp3";
import move from "../../assets/sounds/move-self.mp3";
import castle from "../../assets/sounds/castle.mp3";
import capture from "../../assets/sounds/capture.mp3";
import notify from '../../assets/sounds/notify.mp3'
import GameResult from "../../components/GameResult/GameResult";
import SessionState from "../../components/SessionState/SessionState";
import { setResult, setCurrentPlayer } from "../../store/slices/sessionSlice";
import King from "../../board/figures/king";
import { COLORS } from "../../constants/constants";
import GameSearch from "../../components/GameSearch/GameSearch";
import {useAppDispatch, useAppSelector, useCurrentPlayer} from "../../hooks/hooks";
import { IFirestoreData } from "../../types/types";

const SessionPage: FC<{isOnline: boolean}> = ({isOnline}) => {
    const dispatch = useAppDispatch();
    dispatch(setCurrentPlayer('black'))

    const login = useAppSelector(state => state.user.login)
    const sessionState = useAppSelector(state => state.session);

    const [board, setBoard] = useState(Board.createBoard('black'));
    const [currentTurn, setCurrentTurn] = useState('white');
    const [data, setData] = useState<IFirestoreData[]>([]);
    const [type, setType] = useState('');
    const [showGameSearch, setShowGameSearch] = useState(true);

    const currentPlayer = useCurrentPlayer();


    let posRefs = collection(db, 'session')

    const queryPos = query(posRefs, orderBy('server_timestamp'));

    useEffect(() => {
        onSnapshot(queryPos, snapshot => {
            const data: IFirestoreData[] = [];
            snapshot.forEach(doc => {
                data.push({...doc.data()} as IFirestoreData)
            })

            setData(data);

            if (data.length === 0){
                setBoard(Board.createBoard(currentPlayer))
                return
            }
            setType(data[data.length - 1].type);

            const state = data[data.length - 1];

            const {turn} = FEN.getDataFromFen(state.FEN);
            let board = FEN.createBoardFromFen(state.FEN);
            if (currentPlayer === 'black') board = Board.makeOpposite(board);
            setBoard(Board.updateBoard(board, currentPlayer))

            setCurrentTurn(COLORS[turn])
        })
    }, []);

    const oppositeKing = useRef(Board.findKing(board, COLORS[currentTurn]))
    const king = useRef(Board.findKing(board, currentPlayer));

    useEffect(() => {
        if (!data[data.length - 1]?.server_timestamp) return
        king.current = Board.findKing(board, currentPlayer);
        oppositeKing.current = Board.findKing(board, COLORS[currentPlayer]);

        if (data.length === 0) return
        const oppositeBoard = Board.makeOpposite(board);

        if (GameRules.isStalemate(board, currentTurn) ||
            GameRules.isStalemate(Board.updateBoard(oppositeBoard, COLORS[currentPlayer]), currentTurn)) {
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
                    winColor: COLORS[currentPlayer],
                    show: true,
                }));
                playSound(notify);
            }
        } else if (oppositeKing.current.underCheck) {
            playSound(check)
            const local = Board.makeOpposite(board);
            oppositeKing.current = Board.findKing(local, COLORS[currentPlayer]);
            if (GameRules.isCheckMate(oppositeKing.current, Board.updateBoard(local, COLORS[currentPlayer]))) {
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
    async function resetBoard() {
        try {
            const snapshot = await getDocs(posRefs);
            const batch = writeBatch(db);
            snapshot.forEach(doc => {
                batch.delete(doc.ref);
            })
            await batch.commit();
        } catch(err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.mainWrapper}>
            <div className={styles.relative}>
                <button onClick={resetBoard}>Сбросить доску</button>
                <div className={`${styles.flexContainer} ${styles.flexTop}`}>
                    <PlayerInfo username='enemy' elo='810' board={board} color={COLORS[currentPlayer]}/>
                    <Timer currentTurn={currentTurn} color={COLORS[currentPlayer]} data={data}/>
                </div>
                {sessionState.partyResult.result && <GameResult/>}
                <Chessboard
                    setShowGameSearch={setShowGameSearch}
                    board={board}
                    isOnline={isOnline}
                    currentTurn={currentTurn}
                    king={king}
                    data={data}
                />
                <div className={`${styles.flexContainer} ${styles.flexBottom}`}>
                    <PlayerInfo username={login!} elo='800' board={board} color={currentPlayer}/>
                    <Timer currentTurn={currentTurn} color={currentPlayer} data={data}/>
                </div>
            </div>
            {showGameSearch && <GameSearch data={data} setBoard={setBoard} sessionState={sessionState.partyResult.result}/>}
            {!showGameSearch && <SessionState setBoard={setBoard} data={data}/>}
        </div>
    );
};

export default SessionPage