import styles from './sessionState.module.scss'
import History from "../History/History";
import ControlPanel from "../ControlPanel/ControlPanel";
import SessionChat from "../SessionChat/SessionChat";
const SessionState = ({board, setBoard, data, messages, chatRefs}) => {
    return (
        <div className={styles.session}>
            <div className={styles.header}>

            </div>
            <History data={data} setBoard={setBoard}/>
            <ControlPanel data={data} board={board} setBoard={setBoard}/>
            <SessionChat messages={messages} chatRef={chatRefs}/>
        </div>
    );
};

export default SessionState;