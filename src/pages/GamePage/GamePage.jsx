import {useState} from 'react';
import Chessboard from "../../board/chessboard";
import SessionHistory from "../../board/sessionHistory";
import Board from "../../board/board";

const GamePage = () => {
    const [board, setBoard] = useState(Board.createBoard('white'))

    return (
        <div style={{display: 'flex'}}>
            <Chessboard
                board={board}
                setBoard={setBoard}
            />
            <SessionHistory board={board}/>
        </div>
    );
};

export default GamePage