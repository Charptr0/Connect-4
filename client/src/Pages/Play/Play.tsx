import { useEffect, useState } from "react";
import Board from "./Components/Board/Board";
import styles from "./Play.module.scss";
import { Socket } from "socket.io-client";
import { 
    Cell, 
    checkWinner, 
    initializeBoard, 
    getCurrentPlayers,
} from "./Utils";
import {
    getRoomId, 
    getUsername
} from '../../Utils';

interface Props {
    socket: Socket;
}

/**
 * Render the page for playing online 
 */
export default function Play(props : Props) : JSX.Element 
{
    const [currentBoard, setCurrentBoard] = useState<number[][]>(initializeBoard());
    const [isPlayer1Turn, setPlayer1Turn] = useState<boolean>(true);
    const [allowToMove, setAllowToMove] = useState<boolean>(true);
    const [winnerFound, setWinnerFound] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');

    useEffect(() => { 
        // kick the user out of this page if they don't have a room id
        if(!sessionStorage.getItem('roomId')) {
            return;
        }
        
        // set the current user to their username
        // if no username was provided, default to guest
        setUsername(getRoomId() || 'Guest');

        window.addEventListener('beforeunload', () => {            
            sessionStorage.removeItem('roomId');
        });

        props.socket.connect();   

        props.socket.on("connect", () => {
            console.log(`connected with id ${props.socket.id}`);
            props.socket.emit("joinRoom", getRoomId(), getUsername());
        });

        props.socket.on("joinedRoom", (username) => {
            console.log(`${username} has joined your room`);
        });

        props.socket.on("updateBoard", (board, isPlayer1Turn) => {
            setCurrentBoard(board);   
                     
            if(checkWinner(board) !== Cell.EMPTY) {
                setWinnerFound(true);
                setAllowToMove(false);
            }

            else {
                setAllowToMove(true);
                setPlayer1Turn(isPlayer1Turn);
            }

        });

        props.socket.on("playerLeft", () => {
            props.socket.disconnect();
            console.log("The player left!");
        });

    }, [currentBoard, props.socket]);
    
    /**
     * Update the board and send the request to the other player
     * 
     * @param col the column number that the user has clicked
     */
    async function onPlayerMove(col : number)
    {
        
        if(!allowToMove) return;

        // prevent the user from making a move when a column is full
        if(currentBoard[0][col] !== Cell.EMPTY) {
            console.log("Invalid placement");
            return;
        }

        // search from bottom to top
        // we will place the player in the first empty cell
        for(let i = currentBoard.length - 1; i >= 0; i--) {
            const cell = currentBoard[i][col];

            // cell is found empty
            if(cell === Cell.EMPTY) {
                // update board
                isPlayer1Turn ? currentBoard[i][col] = Cell.PLAYER_1 : currentBoard[i][col] = Cell.PLAYER_2;
                setCurrentBoard(currentBoard);

                setAllowToMove(false);

                props.socket.emit("playerMoved", currentBoard, isPlayer1Turn, sessionStorage.getItem('roomId'));
                break;
            }
        }
        
        if(checkWinner(currentBoard) !== Cell.EMPTY) {
            setWinnerFound(true);
            setAllowToMove(false);
        }
    }

    return (
        <>
            <div>Hello, {username}</div>
            {winnerFound && <div>A winner has been found</div>}
            {!allowToMove && !winnerFound && <div>Waiting for your opponent...</div>}
            <div className={styles.flexContainer}>
                <Board 
                    board={currentBoard}  
                    isPlayer1Turn={isPlayer1Turn} 
                    onPlayerMoveHandler={onPlayerMove}/>
            </div>
        </>
    )
}