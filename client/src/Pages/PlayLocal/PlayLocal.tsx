import { useState } from "react";
import Modal from "../../Components/Modal/Modal";
import Board from "../Play/Components/Board/Board";
import { Cell, checkWinner, initializeBoard } from "../Play/Utils";
import styles from "../Play/Play.module.scss";

interface ModalInterface {
    title : string;
    desc : string;
    btnPrimaryText : string;
    btnSecondaryText : string;
    btnPrimaryOnClick : React.MouseEventHandler<HTMLButtonElement>;
    btnSecondaryOnClick : React.MouseEventHandler<HTMLButtonElement>;
}

/**
 *  Play connect 4 locally without socket connections
 * 
 *  Render the Play component but without socket events
 */
export default function PlayLocal() {
    const [currentBoard, setCurrentBoard] = useState(initializeBoard());
    const [isPlayer1Turn, setPlayer1Turn] = useState<boolean>(true);
    const [modal, setModal] = useState<ModalInterface | null>();
    const [userScore, setUserScore] = useState<number>(0);
    const [opponentScore, setOpponentScore] = useState<number>(0);
    const [winnerFound, setWinnerFound] = useState<boolean>(false);

    /**
     * Update the board and send the request to the other player
     * 
     * @param col the column number that the user has clicked
     */
     function onPlayerMove(col : number)
     {
         // prevent the user from making a move when a column is full
         if(currentBoard[0][col] !== Cell.EMPTY) {
             setModal({
                 title: "Error!",
                 desc : "Invalid Placement",
                 btnPrimaryText: "Ok",
                 btnSecondaryText: "Close",
                 btnPrimaryOnClick : () => {
                     setModal(null);
                 },
                 btnSecondaryOnClick : () => {
                     setModal(null);
                 },
             });
 
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
                 setPlayer1Turn(!isPlayer1Turn);
                 break;
             }
         }
         
         if(checkWinner(currentBoard) !== Cell.EMPTY) {
            setWinnerFound(true);

             if(isPlayer1Turn) {
                 setModal({
                     title: "A winner has been found!",
                     desc : "Player 1 Wins",
                     btnPrimaryText: "Start a New Game",
                     btnSecondaryText: "Leave Room",
                     btnPrimaryOnClick : () => {
                         reset();
                     },
                     btnSecondaryOnClick : () => {
                         setModal(null);
                         window.location.reload();
                     },
                 })
 
                 setUserScore(userScore + 1);
             }
 
             else {
                 setModal({
                     title: "A winner has been found!",
                     desc : "Player 2 Wins",
                     btnPrimaryText: "Start a New Game",
                     btnSecondaryText: "Leave Room",
                     btnPrimaryOnClick : () => {
                         reset();
                     },
                     btnSecondaryOnClick : () => {
                         setModal(null);
                         window.location.reload();
                     },
                 })
                 setOpponentScore(opponentScore + 1);
             }
         }
     }

    /**
     * Reset the game
     */
    function reset() {
        setModal(null);
        setCurrentBoard(initializeBoard());

        setPlayer1Turn(true);
        setWinnerFound(false);
    }

    return (
        <div>
            {modal && <Modal 
                title={modal.title}
                desc={modal.desc}
                btnPrimaryText={modal.btnPrimaryText}
                btnSecondaryText={modal.btnSecondaryText}
                btnPrimaryOnClick={modal.btnPrimaryOnClick}
                btnSecondaryOnClick={modal.btnSecondaryOnClick}
                backdropOnClick={() => setModal(null)}
            />}

            <div className={styles.flexContainer}>
                <div className={styles.middleContainer}>
                    <h1>Connect 4</h1>
                </div>

                <Board 
                    board={currentBoard}  
                    isPlayer1Turn={isPlayer1Turn} 
                    onPlayerMoveHandler={onPlayerMove}
                />

                {winnerFound && <div className={styles.newGameBtnContainer}><button onClick={reset}>Start New Game</button></div>}
                <div className={styles.scoreContainer}>
                    <h1>Current Scores</h1>
                    <h2>Player 1</h2>
                    <h3>{userScore}</h3>

                    <h2>Player 2</h2>
                    <h3>{opponentScore}</h3>
                </div>
            </div>
        </div>
    )
}