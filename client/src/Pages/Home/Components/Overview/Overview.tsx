import BoardDesign from "../BoardDesign/BoardDesign";
import styles from "./Overview.module.scss";

interface Props {
    scroll: Function
}

export default function Overview(props : Props) 
{
    return (
        <div className={styles.overview}>
            <h1 className={styles.title}>Connect 4</h1>
            <button className={styles.playButton} onClick={() => props.scroll()}>Play Online with Friends</button>
            <button className={styles.playButton} onClick={() => props.scroll()}>Play Local Co-Op</button>

            <div className={styles.container}>
                <BoardDesign />
            </div>
        </div>
    )
}