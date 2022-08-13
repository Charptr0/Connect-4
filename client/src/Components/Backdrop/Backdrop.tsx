import styles from "./Backdrop.module.scss";

interface Children {
    children : React.ReactNode
}

export default function Backdrop({children} : Children) 
{
    return (
        <div className={styles.backdrop}>
            {children}
        </div>
    )
}