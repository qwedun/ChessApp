import styles from './sessionState.module.scss'
import History from "../History/History";
import ControlPanel from "../ControlPanel/ControlPanel";
import SessionChat from "../SessionChat/SessionChat";
const SessionState = ({board, setBoard, data, messages, currentPlayer, chatRefs}) => {
    return (
        <div className={styles.session}>
            <div className={styles.header}>

            </div>
            <History data={data} currentPlayer={currentPlayer}/>
            <ControlPanel data={data} board={board} setBoard={setBoard} currentPlayer={currentPlayer}/>
            <SessionChat messages={messages} currentPlayer={currentPlayer} chatRef={chatRefs}/>
        </div>
    );
};

export default SessionState;