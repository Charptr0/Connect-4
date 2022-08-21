import React, { useEffect, useRef, useState } from "react";
import styles from "./Logs.module.scss";

interface Props {
    logs : string[],
    sendMessageHandler : Function,
}

export default function Logs(props : Props) {
    const messageRef = useRef<HTMLInputElement>(null);
    const logRef = useRef<HTMLInputElement>(null);
    const [showChat, setShowChat] = useState<boolean>(false);

    useEffect(() => {
        scrollToBottom();
    }, [props.logs.length, showChat]);

    function sendMessageHandler(e : React.SyntheticEvent) {
        e.preventDefault();
        
        const message = messageRef.current?.value;

        if(!message) return;

        props.sendMessageHandler(message);
        messageRef.current.focus();
        messageRef.current.value = '';
        scrollToBottom();
    }

    function scrollToBottom() {
        if(logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }

    return (
        <>
        {showChat ? <div className={styles.chatContainer}><div className={styles.logContainer} ref={logRef}>
            <button onClick={() => setShowChat(false)} className={styles.closeChat}>X</button>
            {props.logs.map((log, i) => {return <div key={i} className={styles.log}>{log}</div>})}
            </div>
            
            <div className={styles.inputContainer}>
                <form >
                    <input ref={messageRef}/>
                    <button onClick={(e) => sendMessageHandler(e)}>Send</button>
                </form>
            </div>
        </div> : 
        <div className={styles.openChatContainer}>
            <button onClick={() => {setShowChat(true); scrollToBottom()}}>Open Chat</button>
        </div>}

        </>
    )
}