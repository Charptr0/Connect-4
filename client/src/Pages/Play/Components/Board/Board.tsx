import { Cell } from "../../Utils";
import { findOpenCell } from "../../Utils/findOpenCell";
import styles from "./Board.module.scss";
import {useBoardRef} from "./useBoardRef";

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
    // create div references for each cell
    const boardRef = useBoardRef();
    
    /**
     * Fill in the cell with the intended color as a preview for the intended move 
     * @param col - The selected columnNumber
     */
    function onHover(col : number) {
        // grab intended div
        const div : HTMLDivElement | null = findOpenCell(props.board, boardRef, col);

        if(!div) return;

        // fill into the cell
        props.isPlayer1Turn ?
            div.style.backgroundColor = "yellow" : div.style.backgroundColor = "red";
    }

    /**
     * Return the cell back the the original color after the mouse leaves
     * @param col - The selected columnNumber
     */
    function onLeave(col : number) {
        // grab intended div
        const div : HTMLDivElement | null = findOpenCell(props.board, boardRef, col);

        if(!div) return;

        // clear the color
        div.style.backgroundColor = 'white';
    }

    return (
        <div className={styles.boardContainer}>
            {props.board.map((row, i) => {
                return (
                    <div className={styles.row} key={i}>
                        {row.map((cell, j) => 
                            <div 
                                key={j} 
                                ref={boardRef[i][j]}
                                className={cell === Cell.EMPTY ? styles.emptyCell : (cell === Cell.PLAYER_1 ? styles.player1Cell : styles.player2Cell)}
                                onMouseEnter={() => onHover(j)} 
                                onMouseLeave={() => onLeave(j)} 
                                onClick={() => props.onPlayerMoveHandler(j)}></div>)}
                    </div>)
                }
            )}
        </div>)
}