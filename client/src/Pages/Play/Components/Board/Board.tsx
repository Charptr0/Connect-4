import { Cell } from "../../Utils";
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
    const boardRef = useBoardRef();

    function onHover(col : number) {
        for(let i = props.board.length - 1; i >= 0; i--) {
            if(props.board[i][col] === Cell.EMPTY) {
                const div : HTMLDivElement = boardRef[i][col].current;

                props.isPlayer1Turn ?
                    div.style.backgroundColor = "yellow" : div.style.backgroundColor = "red";

                return;
            }
        }
    }

    function onLeave(col : number) {
        for(let i = props.board.length - 1; i >= 0; i--) {
            if(props.board[i][col] === Cell.EMPTY) {
                const div : HTMLDivElement = boardRef[i][col].current;
                div.style.backgroundColor = 'white';
                return;
            }
        }
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