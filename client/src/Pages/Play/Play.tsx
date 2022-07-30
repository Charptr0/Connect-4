import Board from "./Components/Board";
import styles from "./Play.module.css";

export default function Play() : JSX.Element 
{
    // 7 x 6
    return (
    <div className={styles.flexContainer}>
        <Board />
    </div>)
}