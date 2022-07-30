import { useState } from "react";
import { initializeBoard } from "../../Utils/initializeBoard";
import styles from "./Styles/Board.module.css";

export default function Board() : JSX.Element 
{
    // keep track of the state of the current board
    const [currentBoard, setCurrentBoard] = useState<number[][]>(initializeBoard());

    // keep track of the player turns
    const [isPlayer1Turn, setPlayer1Turn] = useState<boolean>(true);
   
    /**
     * Update the board and send the request to the other player
     * 
     * @param col the column number that the user has clicked
     */
    function onClickCellHandler(col : number) 
    {
        // prevent the user from making a move when a column is full
        if(currentBoard[0][col] !== 0) {
            console.log("Invalid placement");
            return;
        }

        // search from bottom to top
        // we will place the player in the first empty cell
        for(let i = currentBoard.length - 1; i >= 0; i--) {
            const cell = currentBoard[i][col];

            // cell is found empty
            if(cell === 0) {
                // update board
                isPlayer1Turn ? currentBoard[i][col] = 1 : currentBoard[i][col] = 2;
                setCurrentBoard(currentBoard);

                // switch turns
                setPlayer1Turn(!isPlayer1Turn);
                break;
            }
        }

        console.log(currentBoard);
    }

    return (
    <>
        <div className={styles.boardContainer}>
            {currentBoard.map((row, i) => {
                return (
                    <div className={styles.row} key={i}>
                        {row.map((cell, j) => 
                            <div key={j} className={
                                cell === 0 ? styles.emptyCell : (cell === 1 ? styles.player1Cell : styles.player2Cell)
                            } onClick={() => onClickCellHandler(j)}></div>)}
                    </div>)
                }
            )}
        </div>
    </>)
}