import {Link} from "react-router-dom";
import { useState } from "react";
import styles from './recentMatch.module.scss'
import rapid from '../../assets/rapid.svg'
import bullet from '../../assets/bullet.svg'
import blitz from '../../assets/blitz.svg'
import ViewBoard from "../ViewBoard/ViewBoard";
import Board from "../../board/board";
import { FC } from 'react';

interface RecentMatchProps {
    data: {[key: string]: string};
    login: string;
}



const RecentMatch: FC<RecentMatchProps> = ({data, login}) => {

    const [viewBoard, setViewBoard] = useState(false);

    const colorStyles: Record<string, Record<string, string>> = {
        'white': {white: styles.whiteWins, black: styles.black},
        'black': {white: styles.white, black: styles.blackWins},
        'default': {white: styles.white, black: styles.black},
    }

    const imgTypes: Record<string, string> = {
        'rapid': rapid,
        'blitz': blitz,
        'bullet': bullet,
    }

    const {white, black} = colorStyles[data.winColor] || colorStyles['default']

    const style = (login === data.winPlayer) ? styles.winner : styles.loser;

    return (
        <Link to='home'
            onMouseEnter={() => setViewBoard(true)}
            onMouseLeave={() => setViewBoard(false)}
            className={styles.grid}>

            {viewBoard && <ViewBoard board={Board.createBoard('white')}/>}
            <div className={styles.imgContainer}><img src={imgTypes[data.type]} alt='Game Type'/></div>
            <div className={styles.players}>
                <div className={`${white} ${styles.default}`}>{data.whitePlayer} ({data.whitePlayerElo})</div>
                <div className={`${black} ${styles.default}`}>{data.blackPlayer} ({data.blackPlayerElo})</div>
            </div>
            <div>
                <div className={styles.flex}>
                    <div className={styles.flexColumn}>
                        <div>0</div>
                        <div>1</div>
                    </div>
                    <div className={style}></div>
                </div>
            </div>
            <div>2</div>
            <div>2</div>
            <div>2</div>
        </Link>
    );
};

export default RecentMatch;