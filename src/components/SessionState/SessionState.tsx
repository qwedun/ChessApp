import styles from './sessionState.module.scss'
import History from "../History/History";
import ControlPanel from "../ControlPanel/ControlPanel";
import SessionChat from "../SessionChat/SessionChat";
import { FC } from 'react';
import { BoardType, IFirestoreData } from "../../types/types";

interface SessionStateProps {
    setBoard: (board: BoardType) => void;
    data: IFirestoreData[];
}

const SessionState: FC<SessionStateProps> = ({setBoard, data}) => {
    return (
        <div className={styles.session}>
            <div className={styles.header}>

            </div>
            <History data={data} setBoard={setBoard}/>
            <ControlPanel data={data} setBoard={setBoard}/>
            <SessionChat/>
        </div>
    );
};

export default SessionState;