import {useState} from 'react';
import Chessboard from "../../board/chessboard";
import SessionHistory from "../../board/sessionHistory";
import Board from "../../board/board";

const GamePage = ({isOnline}) => {

    const [board, setBoard] = useState(Board.createBoard('white'))
    const [currentPlayer] = useState('white')
    const [currentTurn, setCurrentTurn] = useState('white')

    return (
        <div style={{display: 'flex'}}>
            <Chessboard
                currentPlayer={currentPlayer}
                currentTurn={currentTurn}
                setCurrentTurn={setCurrentTurn}
                board={board}
                setBoard={setBoard}
                isOnline={isOnline}
            />
            <SessionHistory board={board}/>
        </div>
    );
};

export default GamePage