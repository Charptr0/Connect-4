import Board from "../Components/Play/Board";
import styles from "./Styles/Play.module.css";

export default function Play() : JSX.Element 
{
    // 7 x 6
    return (
    <div className={styles.flexContainer}>
        <Board />
    </div>)
}