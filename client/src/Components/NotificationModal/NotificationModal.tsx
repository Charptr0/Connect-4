import styles from "./NotificationModal.module.scss";

interface Props {
    text: string;
}

export default function NotificationModal(props : Props) 
{
    return (
        <div className={`${styles.modal}`}>
            <h2>{props.text}</h2>
        </div>
    )
}