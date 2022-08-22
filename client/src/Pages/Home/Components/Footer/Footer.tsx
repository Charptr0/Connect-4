import styles from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div>Github: <a href="https://github.com/Charptr0/Connect-4" target="_blank" rel="noreferrer">@Charptr0</a></div>
            <div>Built using React, Express, and Socket.io</div>
        </footer>
    )
}