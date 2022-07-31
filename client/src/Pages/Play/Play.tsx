import { useEffect, useState } from "react";
import Board from "./Components/Board";
import styles from "./Play.module.css";
import { io } from "socket.io-client";
import { SocketProvider } from "./Context/SocketContext";
import { Cell, checkWinner, initializeBoard } from "./Utils";

const socket = io("http://localhost:4000");

export default function Play() : JSX.Element 
{
    const [currentBoard, setCurrentBoard] = useState<number[][]>(initializeBoard());
    const [isPlayer1Turn, setPlayer1Turn] = useState(true);
    const [allowToMove, setAllowToMove] = useState<boolean>(true);
    const [winnerFound, setWinnerFound] = useState<boolean>(false);


    useEffect(() => {    
        socket.on("connect", () => {
            console.log(`connected with id ${socket.id}`);
        });

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

    }, [currentBoard]);

    /**
     * Update the board and send the request to the other player
     * 
     * @param col the column number that the user has clicked
     */
    function onPlayerMove(col : number)
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

                // 
                setAllowToMove(false);

                socket.emit("playerMoved", currentBoard, isPlayer1Turn);
                break;
            }
        }
        
        if(checkWinner(currentBoard) !== Cell.EMPTY) {
            setWinnerFound(true);
            setAllowToMove(false);
        }
    }

    return (
        <SocketProvider>
            {winnerFound && <div>A winner has been found</div>}
            {!allowToMove && !winnerFound && <div>Waiting for your opponent...</div>}
            <div className={styles.flexContainer}>
                <Board board={currentBoard}  isPlayer1Turn={isPlayer1Turn} onPlayerMoveHandler={onPlayerMove}/>
            </div>
        </SocketProvider>
    )
}