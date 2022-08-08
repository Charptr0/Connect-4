import { useEffect, useState } from "react";
import Board from "./Components/Board/Board";
import styles from "./Play.module.scss";
import { io } from "socket.io-client";
import { Cell, checkWinner, initializeBoard, getRoomId, getCurrentPlayers } from "./Utils";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:4000");

export default function Play() : JSX.Element 
{
    const navigate = useNavigate();

    const [currentBoard, setCurrentBoard] = useState<number[][]>(initializeBoard());
    const [isPlayer1Turn, setPlayer1Turn] = useState<boolean>(true);
    const [allowToMove, setAllowToMove] = useState<boolean>(true);
    const [winnerFound, setWinnerFound] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [currentPlayers, setCurrentPlayers] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => { 
        if(!sessionStorage.getItem('roomId')) {
            navigate('/');
            return;
        }

        setUsername(sessionStorage.getItem('username') || 'Guest');
        getCurrentPlayers().then(currentPlayers => {
            setCurrentPlayers(currentPlayers);
            setLoading(false);
        })

        socket.on("connect", () => {
            console.log(`connected with id ${socket.id}`);
            socket.emit("joinRoom", getRoomId());
        });

        socket.on("disconnect", () => {
            console.log(`A user has disconnected`);
        });
        socket.on("joinedRoom", () => {
            getCurrentPlayers().then(currentPlayers => {
                console.log("A user has joined your room");
                setCurrentPlayers(currentPlayers)
            }).catch(err => console.log(err));
        })

        socket.on("updateBoard", (board, isPlayer1Turn) => {
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

        socket.on("playerLeft", () => {
            console.log("The player left!");
        });

        window.addEventListener('beforeunload', () => {
            // socket.emit('playerLeft', getRoomId());
            sessionStorage.removeItem('roomId');
        });



    }, [currentBoard, navigate]);

    /**
     * Update the board and send the request to the other player
     * 
     * @param col the column number that the user has clicked
     */
    async function onPlayerMove(col : number)
    {
        if(currentPlayers < 2) {
            return;
        }
        
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

                socket.emit("playerMoved", currentBoard, isPlayer1Turn, sessionStorage.getItem('roomId'));
                break;
            }
        }
        
        if(checkWinner(currentBoard) !== Cell.EMPTY) {
            setWinnerFound(true);
            setAllowToMove(false);
        }
    }

    if(loading) {
        return <div>Loading...</div>
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