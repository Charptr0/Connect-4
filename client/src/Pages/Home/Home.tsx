import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import {v4 as uuid } from "uuid";

export default function Home() : JSX.Element
{
    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const roomRef = useRef<HTMLInputElement>(null);

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
        navigate('/play');
        window.location.reload();
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

        navigate("/play");
        window.location.reload();
    }

    return (<>
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