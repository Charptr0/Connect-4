import styles from "./Backdrop.module.scss";

interface Props {
    children: React.ReactNode,
    onClick : React.MouseEventHandler<HTMLDivElement>
}

export default function Backdrop(props : Props) 
{
    return (
        <div className={styles.backdrop} onClick={props.onClick}>
            {props.children}
        </div>
    )
}