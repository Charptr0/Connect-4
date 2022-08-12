import React, { useEffect, useRef } from "react";
import {v4 as uuid } from "uuid";
import Modal from "../../Components/Modal/Modal";
import { getRoomId, Page } from "../../Utils";
import { getCurrentPlayers } from "../Play/Utils";

interface Props {
    switchPage : Function;
}
/**
 * Render the front page 
 */
export default function Home(props : Props) : JSX.Element
{
    const usernameRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(getRoomId()) {
            window.location.reload();
        }
    
    }, []);
    

    /**
     * Create a new room
     */
    function createRoomHandler(event : React.SyntheticEvent) {
        event.preventDefault();

        // grab username
        const username = usernameRef.current?.value || 'Guest';

        // create a new room
        const roomId = uuid().toUpperCase().slice(0, 8);
    
        // save to session storage
        sessionStorage.setItem("roomId", roomId);
        sessionStorage.setItem("username", username);

        // go to room
        props.switchPage(Page.PlayOnline);
    }

    /**
     * Join an existing room 
     */
    function joinRoomHandler(event : React.SyntheticEvent) {
        event.preventDefault();
        
        // grab username and room id
        const username = usernameRef.current?.value || 'Guest';
        const roomId = roomRef.current?.value || '';
        
        sessionStorage.setItem("roomId", roomId);
        sessionStorage.setItem("username", username);

        getCurrentPlayers().then(totalPlayers => {
            if(totalPlayers < 2) {
                props.switchPage(Page.PlayOnline);
            }

            else {
                console.log('room full');
            }
        })
    }

    return (
    <>
        <Modal />
        <div>Home</div>
        <form>
            <label>Username</label><br></br>
            <input type="text" ref={usernameRef} defaultValue={sessionStorage.getItem("username") || ''}  /><br></br>

            <label>Room</label><br></br>
            <input type="text" ref={roomRef}/><br></br>

            <button onClick={(e : React.SyntheticEvent) => createRoomHandler(e)}>Create Room</button>
            <button onClick={(e : React.SyntheticEvent) => joinRoomHandler(e)}>Join Room</button>
        </form>
    </>)
}