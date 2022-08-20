import { useRef, useState } from "react";
import styles from "./Logs.module.scss";

interface Props {
    logs : string[],
    sendMessageHandler : Function,
}

export default function Logs(props : Props) {
    const messageRef = useRef<HTMLInputElement>(null);
    const [showChat, setShowChat] = useState<boolean>(false);

    function sendMessageHandler() {
        const message = messageRef.current?.value;

        if(!message) return;

        props.sendMessageHandler(message);
        messageRef.current.focus();
        messageRef.current.value = '';
    }

    return (
        <>
        {showChat ? <div className={styles.logContainer}>
            {props.logs.map((log, i) => {
                return <div key={i} className={styles.log}>{log}</div>
            })}

            <button onClick={() => setShowChat(false)}>Close Chat</button>
            <div className={styles.inputContainer}>
                <input ref={messageRef}/>
                <button onClick={sendMessageHandler}>Send</button>
            </div>
        </div> : 
        <div className={styles.openChatContainer}>
            <button onClick={() => setShowChat(true)}>Open Chat</button>
        </div>}

        </>
    )
}