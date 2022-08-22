import styles from "./Loading.module.scss";

/**
 * Display a loading animation 
 */
export default function Loading() {
    return (<div className={styles.loadingRing}>
        <div></div>
    </div>)
}