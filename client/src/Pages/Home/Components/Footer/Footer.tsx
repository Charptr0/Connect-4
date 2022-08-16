import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <a href="https://github.com/Charptr0/Connect-4" target="_blank" rel="noreferrer"><button className={styles.navbarButton}>Github</button></a>
            <button className={styles.navbarButton}>About</button>
        </footer>
    )
}