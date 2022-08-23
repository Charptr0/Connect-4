import BoardDesign from "../BoardDesign/BoardDesign";
import styles from "./Overview.module.scss";

interface Props {
    changeToJoinRoom : Function,
    changeToCreatedRoom : Function,
    playLocalCoop : Function,
}

export default function Overview(props : Props) 
{
    return (
        <div className={styles.overview}>
            <h1 className={styles.title}>Connect 4</h1>
            <button className={styles.playButton} onClick={() => props.changeToCreatedRoom()}>Create a Room</button>
            <button className={styles.playButton} onClick={() => props.changeToJoinRoom()}>Join a Room</button>
            <button className={styles.playButton} onClick={() => props.playLocalCoop()}>Play Local Co-Op</button>

            <div className={styles.container}>
                <BoardDesign />
            </div>
        </div>
    )
}