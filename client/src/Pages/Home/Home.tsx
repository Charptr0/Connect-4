import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.scss";
import {v4 as uuid } from "uuid";
import Modal from "../../Components/Modal/Modal";
import { getUsername, Page, removeRoomId } from "../../Utils";
import { getCurrentPlayers } from "../Play/Utils";
import Footer from "./Components/Footer/Footer";
import Overview from "./Components/Overview/Overview";
import Loading from "../../Components/Loading/Loading";

interface Props {
    switchPage : Function;
}

interface ModalInterface {
    title : string;
    desc : string;
    btnPrimaryText : string;
    btnSecondaryText : string;
    btnPrimaryOnClick : React.MouseEventHandler<HTMLButtonElement>;
    btnSecondaryOnClick : React.MouseEventHandler<HTMLButtonElement>;
}
/**
 * Render the front page 
 */
export default function Home(props : Props) : JSX.Element
{
    const usernameRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLInputElement>(null);

    const [modal, setModal] = useState<ModalInterface | null>();  
    const [loading, setLoading] = useState<boolean>(true);
    const [isCreateRoomOption, setCreateRoomOption] = useState<boolean>(true);

    useEffect(() => {
        removeRoomId();
        axios.get("https://charptr0-connect-4-backend.herokuapp.com/status")
            .then(() => {
                setLoading(false);
            }).catch((err) => {
                if(err.message === 'Network Error') 
                    console.log('Cannot connect to server, please try again later');
            });
    }, []);
    
    /**
     * Create a new room
     */
    function createRoomHandler(event : React.SyntheticEvent) {
        event.preventDefault();

        // create a new room
        const roomId = uuid().toUpperCase().slice(0, 8);
        
        // grab username
        const username = usernameRef.current?.value || 'Guest';

        // save to session storage
        sessionStorage.setItem("roomId", roomId);
        sessionStorage.setItem("username", username);

        // go to room
        props.switchPage(Page.PlayOnline);
    }

    /**
     * Join an existing room 
     */
    async function joinRoomHandler(event : React.SyntheticEvent) {
        event.preventDefault();
        
        // grab username and room id
        const username = usernameRef.current?.value || 'Guest';
        const roomId = roomRef.current?.value || '';
        
        sessionStorage.setItem("roomId", roomId);
        sessionStorage.setItem("username", username);

        try {
            await axios.get(`https://charptr0-connect-4-backend.herokuapp.com/room-exist/${roomId}`);
        } catch (err) {
            console.log(err);
            
            setModal({
                title: 'Error!',
                desc : "The room does not exist :(",
                btnPrimaryText: "Ok",
                btnSecondaryText: "Close",
                btnPrimaryOnClick: () => setModal(null),
                btnSecondaryOnClick: () => setModal(null),
            });

            removeRoomId();
            return;
        }

        const totalPlayers = await getCurrentPlayers();

        if(totalPlayers < 2) {
            props.switchPage(Page.PlayOnline);
        }

        else {
            setModal({
                title: 'Error!',
                desc : "The room is full :(",
                btnPrimaryText: "Ok",
                btnSecondaryText: "Close",
                btnPrimaryOnClick: () => setModal(null),
                btnSecondaryOnClick: () => setModal(null),
            });

            removeRoomId();
        }
    }

    function scroll() {
        if(usernameRef.current) {
            usernameRef.current.scrollIntoView({behavior: 'smooth'});
        }
    }

    function changeToJoinedRoom() {
        setCreateRoomOption(false);
        scroll();
    }

    function changeToCreatedRoom() {
        setCreateRoomOption(true);
        scroll();
    }

    function playLocalCoop() {
        props.switchPage(Page.PlayLocal);
    }

    if(loading) {
        return <div className={styles.loadingContainer}>
            <h1>Waking up Heroku Dyno server</h1>
            <p>This can take a while.....</p>
            <Loading />

            <div>
                <span>Still not loading after a refresh?</span><br></br>
                <span>Let me know if there is an issue</span><br></br>
                <a href="https://github.com/Charptr0/Connect-4" target="_blank" rel="noreferrer">Github</a>
            </div>
        </div>
    }

    return (
    <>      
        <Overview changeToJoinRoom={changeToJoinedRoom} changeToCreatedRoom={changeToCreatedRoom} playLocalCoop={playLocalCoop} />
        {modal && <Modal
            title={modal.title}
            desc={modal.desc}
            btnPrimaryText={modal.btnPrimaryText}
            btnSecondaryText={modal.btnSecondaryText}
            btnPrimaryOnClick={modal.btnPrimaryOnClick}
            btnSecondaryOnClick={modal.btnSecondaryOnClick} 
        />}
        <form className={styles.form}>
            <div className={styles.selection}>
                <div onClick={() => setCreateRoomOption(true)} className={isCreateRoomOption ? styles.selected : styles.notSelected }>Create Room</div>
                <div onClick={() => setCreateRoomOption(false)} className={!isCreateRoomOption ? styles.selected : styles.notSelected }>Join Room</div>
            </div>
            <label>Username</label><br></br>
            <input type="text" ref={usernameRef} defaultValue={getUsername() || ''}  /><br></br>

            {!isCreateRoomOption ? 
            <div>
                <label>Room</label><br></br>
                <input type="text" ref={roomRef}/><br></br>
                <button 
                    onClick={(e : React.SyntheticEvent) => joinRoomHandler(e)} 
                    className={`${styles.joinRoomBtn}`}>Join Room</button>
            </div> : <button 
                onClick={(e : React.SyntheticEvent) => createRoomHandler(e)} 
                className={`${styles.createRoomBtn}`}>Create Room</button>}
        </form>
        <Footer />
    </>)
}