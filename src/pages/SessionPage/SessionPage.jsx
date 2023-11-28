import { useState } from 'react';
import Chessboard from "../../board/chessboard";
import SessionHistory from "../../board/sessionHistory";
import Board from "../../board/board";
import styles from './sessionPage.module.scss'
import Timer from '../../components/Timer/Timer'
import PlayerInfo from '../../components/UI/InGamePlayerInfo/InGamePlayerInfo'

const SessionPage = ({isOnline}) => {

    const [board, setBoard] = useState(Board.createBoard('white'))
    const [currentPlayer] = useState('white')

    return (
        <div className={styles.mainWrapper}>
            <div>
                <div className={styles.flexContainer}>
                    <PlayerInfo
                        username='bebra'
                        elo='912390'
                    />
                    <Timer/>
                </div>
                <Chessboard
                    currentPlayer={currentPlayer}
                    board={board}
                    setBoard={setBoard}
                    isOnline={isOnline}
                />
                <div className={styles.flexContainer}>
                    <PlayerInfo
                        username='kek'
                        elo='213123'
                    />
                    <Timer/>
                </div>
            </div>
            <SessionHistory board={board}/>

        </div>
    );
};

export default SessionPage