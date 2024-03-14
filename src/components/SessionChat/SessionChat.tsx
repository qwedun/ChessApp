import styles from './sessionChat.module.scss'
import {useEffect, useRef, useState, FC, FormEvent} from "react";
import {addDoc, collection, onSnapshot, orderBy, query} from "firebase/firestore";
import { useCurrentPlayer } from "../../hooks/hooks";
import { IFirestoreMessage } from "../../types/types";
import { db } from "../../server/firestore";

const SessionChat: FC = () => {
    const currentPlayer = useCurrentPlayer();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<IFirestoreMessage[]>([])
    const ref = useRef<HTMLInputElement>(null);

    const chatRefs = collection(db, 'chat');
    const queryChat = query(chatRefs, orderBy('timestamp'));

    onSnapshot(queryChat, snapshot => {
        const data: IFirestoreMessage[] = [];
        snapshot.forEach(doc => {
            data.push({...doc.data() as IFirestoreMessage})
        })
        setMessages(data);
    })

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const input = e.currentTarget[0] as HTMLInputElement
        input.value = '';

        if (!message.trim()) return

        await addDoc(chatRefs, {
            message: message,
            timestamp: Date.now(),
            currentPlayer: currentPlayer,
        })

        setMessage('');
    }

    useEffect(() => {
        ref.current!.scrollTo(0, 999999)
    }, [messages]);

    return (
        <>
        <div ref={ref} className={styles.chat}>
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