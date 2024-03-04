import search from '../../assets/search.svg'
import styles from './games.module.scss';
import ArchivePreview from "../ArchivePreview/ArchivePreview";
import {useState} from "react";
import CurrentGames from "../CurrentGames/CurrentGames";

const Games = () => {

    const [showArchive, setShowArchive] = useState(true);
    const [showCurrentGames, setShowCurrentGames] = useState(false);

    return (
        <div className={styles.main}>
            <div className={styles.grid}>
                <div className={`${styles.content} ${showArchive ? styles.active : ''}`}
                     onClick={() => {setShowArchive(true); setShowCurrentGames(false)}}>
                    Archive
                </div>
                <div className={`${styles.content} ${showCurrentGames ? styles.active : ''}`}
                     onClick={() => {setShowArchive(false); setShowCurrentGames(true)}}>
                    Watch
                </div>
            </div>
            <div className={styles.inputWrapper}>
                <img alt='search' src={search}/>
                <input placeholder='Username...' className={styles.input}/>
            </div>
            {showArchive && <ArchivePreview/>}
            {showCurrentGames && <CurrentGames/>}
        </div>
    );
};

export default Games;