import styles from './sessionChat.module.scss'
import {useEffect, useRef, useState} from "react";
import {addDoc} from "firebase/firestore";
const SessionChat = ({messages, chatRef, currentPlayer}) => {

    const [message, setMessage] = useState('');
    const ref = useRef()

    const handleSubmit = async(e) => {
        e.preventDefault();
        e.target[0].value = '';
        if (!message) return

        await addDoc(chatRef, {
            message: message,
            timestamp: Date.now(),
            currentPlayer: currentPlayer,
        })
        setMessage('');
    }

    useEffect(() => {
        ref.current.scrollTo(0, 999999)
    }, [messages]);

    return (
        <>
        <div ref={ref} className={styles.chat} onClick={() => console.log(messages)}>
            <div className={styles.messages}>
                {messages.map((data, i, arr) => {
                    const date = new Date(data.timestamp);
                    const time = date.getHours() + ':' + date.getMinutes();
                    if (data.currentPlayer !== currentPlayer) {
                        if (arr[i - 1]?.currentPlayer !== arr[i].currentPlayer)
                            return (
                                <>
                                    <div className={styles.left}>ENEMY
                                        <span className={styles.timeLeft}>{time}</span>
                                    </div>
                                    <div className={styles.text}>{data.message}</div>
                                </>
                            )
                        return <div className={styles.text}>{data.message}</div>
                    } else {
                        if (arr[i - 1]?.currentPlayer !== arr[i].currentPlayer)
                            return (
                                <>
                                    <div className={styles.rightTitle}>
                                        <span className={styles.timeRight}>{time}</span>
                                    YOU</div>
                                    <div className={styles.right}>{data.message}</div>
                                </>
                            )

                        return <div className={styles.right}>{data.message}</div>
                    }
                })}
            </div>
        </div>
        <div className={styles.inputWrapper}>
            <form onSubmit={handleSubmit}>
                <input
                    className={styles.input}
                    placeholder='Send a message...'
                    onChange={(e) => setMessage(e.target.value)}/>
            </form>
        </div>
        </>
    );
};

export default SessionChat;