import BoardDesign from "../BoardDesign/BoardDesign";
import Navbar from "../Navbar/Navbar";
import styles from "./Overview.module.scss";

export default function Overview() 
{
    return (
        <div className={styles.overview}>
            <h1 className={styles.title}>Connect 4</h1>
            <button className={styles.playButton}>Play Online with Friends</button>
            <button className={styles.playButton}>Play Local Co-Op</button>

            <Navbar />
            <div className={styles.container}>
                <BoardDesign />
            </div>
            

        </div>
    )
}