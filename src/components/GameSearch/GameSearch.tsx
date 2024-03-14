import { useState, FC} from 'react';
import styles from './gameSearch.module.scss';
import chessboard from '../../assets/smallChessboard.svg';
import plus from '../../assets/greenPlus.svg';
import users from '../../assets/users.svg';
import analysisImg from '../../assets/analysis.svg';
import GameCreate from "../GameCreate/GameCreate";
import Games from "../Games/Games";
import GameAnalysis from "../GameAnalysis/GameAnalysis";
import {BoardType, IFirestoreData} from "../../types/types";

interface GameSearchProps {
    data: IFirestoreData[];
    setBoard: (board: BoardType) => void;
    sessionState: string;
}

const GameSearch: FC<GameSearchProps> = ({sessionState, data, setBoard}) => {

    const [search, setSearch] = useState(!sessionState);
    const [games, setGames] = useState(false);
    const [players, setPlayers] = useState(false);
    const [analysis, setAnalysis] = useState(!!sessionState);

    return (
        <div className={styles.main}>
            <div className={sessionState ? styles.altHead : styles.head}>
                {sessionState &&
                    <div className={`${styles.flex} ${analysis ? styles.active : ''}`}
                         onClick={() => {setAnalysis(true); setSearch(false); setPlayers(false); setGames(false)}}>
                        <div>
                            <img src={analysisImg} width='24px' height='24px' alt='analyse'/>
                        </div>
                        <div>Analysis</div>
                    </div>
                }
                <div className={`${styles.flex} ${search ? styles.active : ''}`}
                     onClick={() => {setAnalysis(false); setSearch(true); setPlayers(false); setGames(false)}}>
                    <div>
                        <img src={plus} width='24px' height='24px' alt='New Game'/>
                    </div>
                    <div>New Game</div>
                </div>
                <div className={`${styles.flex} ${games ? styles.active : ''}`}
                     onClick={() => {setAnalysis(false); setSearch(false); setPlayers(false); setGames(true)}}>
                    <div>
                        <img src={chessboard} width='24px' height='24px' alt='games'/>
                    </div>
                    <div>Games</div>
                </div>
                <div className={`${styles.flex} ${players ? styles.active : ''}`}
                     onClick={() => {setAnalysis(false); setSearch(false); setPlayers(true); setGames(false)}}>
                    <div>
                        <img src={users} width='24px' height='24px' alt='users'/>
                    </div>
                    <div>Players</div>
                </div>
            </div>
            {search && <GameCreate/>}
            {games && <Games/>}
            {analysis && <GameAnalysis data={data} setBoard={setBoard}/>}
        </div>
    );
};

export default GameSearch;