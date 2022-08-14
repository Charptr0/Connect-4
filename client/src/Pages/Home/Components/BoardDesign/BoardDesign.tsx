import styles from "./BoardDesign.module.scss";

export default function BoardDesign() {
    return (
    <div className={styles.boardContainer}>
        <div className={styles.row}>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
        </div>
        <div className={styles.row}>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
        </div>
        <div className={styles.row}>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={`${styles.cell}`}></div>
        </div>
        <div className={styles.row}>
            <div className={styles.cell}></div>
            <div className={styles.cell}></div>
            <div className={`${styles.cell} `}></div>
            <div className={styles.cell}></div>
            <div className={`${styles.cell} ${styles.red}`}></div>
            <div className={`${styles.cell}`}></div>
            <div className={`${styles.cell}`}></div>
        </div>
        <div className={styles.row}>
            <div className={`${styles.cell} ${styles.yellow}`}></div>
            <div className={`${styles.cell} ${styles.red}`}></div>
            <div className={`${styles.cell} ${styles.yellow}`}></div>
            <div className={`${styles.cell} ${styles.yellow}`}></div>
            <div className={`${styles.cell} ${styles.red}`}></div>
            <div className={`${styles.cell}`}></div>
            <div className={`${styles.cell} ${styles.yellow}`}></div>
        </div>
        <div className={styles.row}>
            <div className={`${styles.cell} ${styles.red}`}></div>
            <div className={`${styles.cell} ${styles.red}`}></div>
            <div className={`${styles.cell} ${styles.red}`}></div>
            <div className={`${styles.cell} ${styles.yellow}`}></div>
            <div className={`${styles.cell} ${styles.red}`}></div>
            <div className={`${styles.cell} ${styles.yellow}`}></div>
            <div className={`${styles.cell} ${styles.red}`}></div>
        </div>
    </div>)
}