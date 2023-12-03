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

const SessionPage = ({isOnline}) => {

    const [board, setBoard] = useState(Board.createBoard('white'))
    const [currentPlayer] = useState('white')
    const [currentTurn, setCurrentTurn] = useState('white')
    const [history, setHistory] = useState([])
    const [data, setData] = useState([])

    let posRefs
    if (isOnline) posRefs = collection(db, 'session')
    else posRefs = collection(db, 'single')

    useEffect(() => {
        const queryPos = query(posRefs, orderBy('timestamp'))
        onSnapshot(queryPos, (snapshot) => {
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
                    setBoard={setBoard}
                    isOnline={isOnline}
                    currentTurn={currentTurn}
                    setCurrentTurn={setCurrentTurn}
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
                <div className={styles.chat}>

                </div>
            </div>
        </div>
    );
};

export default SessionPage