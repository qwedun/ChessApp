import Avatar from "../Avatar/Avatar";
import styles from "./playerInfo.module.scss";
import EatenPieces from "../EatenPieces/EatenPieces";
import { BoardType } from "../../../types/types";
import { FC } from 'react';

interface InGamePlayerInfoProps {
    username: string;
    elo: string;
    board: BoardType;
    color: string;
}

const InGamePlayerInfo: FC<InGamePlayerInfoProps> = ({username, elo, board, color}) => {
    return (
        <div className={styles.info}>
            <Avatar width='48px' height='48px'/>
            <div className={styles.infoWrapper}>
                <div>
                    <span>{username}</span>
                    <span className={styles.elo}>{elo}</span>
                </div>
                <EatenPieces currentPlayer={color} board={board}/>
            </div>
        </div>
    );
};

export default InGamePlayerInfo;