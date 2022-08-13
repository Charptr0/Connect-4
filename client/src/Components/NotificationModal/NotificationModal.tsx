import { useEffect, useState } from "react";
import styles from "./NotificationModal.module.scss";

interface Props {
    text: string;
}

export default function NotificationModal(props : Props) 
{
    const [modalVisibility, setModalVisibility] = useState<string>(styles.appear);

    useEffect(() => {
        setTimeout(() => setModalVisibility(styles.disappear), 3000);
        setTimeout(() => setModalVisibility(styles.gone), 4000);
    }, []);

    return (
        <div className={`${styles.modal} ${modalVisibility}`}>
            <h2>{props.text}</h2>
        </div>
    )
}