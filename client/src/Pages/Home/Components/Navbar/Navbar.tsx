import styles from "./Navbar.module.scss";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <a href="https://github.com/"><button className={styles.navbarButton}>Github</button></a>
            <button className={styles.navbarButton}>About</button>
        </nav>
    )
}