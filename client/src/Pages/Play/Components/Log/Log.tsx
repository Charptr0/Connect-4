import React, { useEffect, useRef, useState } from "react";
import styles from "./Logs.module.scss";

interface Props {
    logs : string[],
    sendMessageHandler : Function,
}

/**
 * Display the chat window
 */
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

    /**
     * Scroll to the bottom of the chat window
     */
    function scrollToBottom() {
        if(logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }

    return (
        <>
        {showChat ? <div className={styles.chatContainer}>
            <div className={styles.closeChat} onClick={() => setShowChat(false)}>X</div>
            <div className={styles.logContainer} ref={logRef}>
                {props.logs.map((log, i) => {return <div key={i} className={styles.log}>{log}</div>})}
            </div>
            <form >
                <input ref={messageRef}/>
                <button onClick={(e) => sendMessageHandler(e)}>Send</button>
            </form>
            
        </div> : 
        <div className={styles.openChatContainer}>
            <button onClick={() => {setShowChat(true); scrollToBottom()}}>Open Chat</button>
        </div>}
        </>
    )
}