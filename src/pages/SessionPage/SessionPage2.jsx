import {useEffect, useState} from 'react';
import Chessboard from "../../board/chessboard";
import History from "../../components/History/History";
import Board from "../../board/board";
import styles from './sessionPage.module.scss'
import Timer from '../../components/Timer/Timer'
import PlayerInfo from '../../components/UI/InGamePlayerInfo/InGamePlayerInfo'
import {collection, onSnapshot, orderBy, query} from "firebase/firestore";
import {db} from "../../server/firestore";
import ControlPanel from "../../components/ControlPanel/ControlPanel";
import SessionChat from "../../components/SessionChat/SessionChat";
const SessionPage = ({isOnline}) => {
    const colors = {
        black: 'white',
        white: 'black'
    }

    const [board, setBoard] = useState(Board.createBoard('black'));
    const [currentPlayer] = useState('black');
    const [currentTurn, setCurrentTurn] = useState('white');
    const [history, setHistory] = useState([]);
    const [data, setData] = useState([]);
    const [messages, setMessages] = useState([]);
    const [type, setType] = useState()

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
            const board = Board.createBoardFromJSON(JSON.parse(data[data.length - 1].board))
            if (currentPlayer === data[data.length - 1].currentPlayer)
                setBoard(Board.updateBoard(board, currentPlayer, currentPlayer, true))
            else {
                const newBoard = Board.makeOpposite(board)
                setBoard(Board.updateBoard(newBoard, currentPlayer, currentPlayer, true))
            }
            setCurrentTurn(colors[data[data.length - 1].turn])
        })

        onSnapshot(queryChat, snapshot => {
            const data = [];
            snapshot.forEach(doc => {
                data.push({...doc.data()})
            })
            setMessages(data);
        })
    }, []);

    return (
        <div className={styles.mainWrapper}>
            <div>
                <div className={styles.flexContainer}>
                    <PlayerInfo username='bebra' elo='912390'/>
                    <Timer currentTurn={currentTurn} currentPlayer={'black'}/>
                </div>
                <Chessboard
                    currentPlayer={currentPlayer}
                    board={board}
                    isOnline={isOnline}
                    currentTurn={currentTurn}
                    sound={type}
                />
                <div className={styles.flexContainer}>
                    <PlayerInfo username='kek' elo='213123'/>
                    <Timer currentTurn={currentTurn} currentPlayer={'white'}/>
                </div>
            </div>
            <div className={styles.session}>
                <div className={styles.header}>

                </div>
                <History history={history} currentPlayer={currentPlayer}/>
                <ControlPanel data={data} board={board} setBoard={setBoard} currentPlayer={currentPlayer}/>
                <SessionChat messages={messages} currentPlayer={currentPlayer} chatRef={chatRefs}/>
            </div>
        </div>
    );
};

export default SessionPage