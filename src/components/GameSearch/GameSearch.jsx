import {useState} from 'react';
import styles from './gameSearch.module.scss';
import chessboard from '../../assets/smallChessboard.svg';
import plus from '../../assets/greenPlus.svg';
import users from '../../assets/users.svg';
import GameCreate from "../GameCreate/GameCreate";

const GameSearch = () => {

    const [search, setSearch] = useState(true);
    const [games, setGames] = useState(false);
    const [players, setPlayers] = useState(false);

    return (
        <div className={styles.main}>
            <div className={styles.head}>
                <div className={`${styles.flex} ${search ? styles.active : ''}`}
                     onClick={() => {setSearch(true); setPlayers(false); setGames(false)}}>
                    <div>
                        <img src={plus} width='24px' height='24px'/>
                    </div>
                    <div>New Game</div>
                </div>
                <div className={`${styles.flex} ${games ? styles.active : ''}`}
                     onClick={() => {setSearch(false); setPlayers(false); setGames(true)}}>
                    <div>
                        <img src={chessboard} width='24px' height='24px'/>
                    </div>
                    <div>Games</div>
                </div>
                <div className={`${styles.flex} ${players ? styles.active : ''}`}
                     onClick={() => {setSearch(false); setPlayers(true); setGames(false)}}>
                    <div>
                        <img src={users} width='24px' height='24px'/>
                    </div>
                    <div>Players</div>
                </div>
            </div>
            {search && <GameCreate/>}
        </div>
    );
};

export default GameSearch;