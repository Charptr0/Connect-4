import { Cell } from "../Utils";
import styles from "./Styles/Board.module.css";

interface Props {
    board : number[][],
    isPlayer1Turn : boolean,
    onPlayerMoveHandler : Function,
}

/**
 * Draw the current connect 4 board to the screen
 */
export default function Board(props : Props) : JSX.Element 
{
    return (
    <>
        <div className={styles.boardContainer}>
            {props.board.map((row, i) => {
                return (
                    <div className={styles.row} key={i}>
                        {row.map((cell, j) => 
                            <div key={j} className={
                                cell === Cell.EMPTY ? styles.emptyCell : (cell === Cell.PLAYER_1 ? styles.player1Cell : styles.player2Cell)
                            } onClick={() => props.onPlayerMoveHandler(j)}></div>)}
                    </div>)
                }
            )}
        </div>
    </>)
}