import Backdrop from "../Backdrop/Backdrop"
import styles from "./Modal.module.scss";

interface Props {
    title : string;
    desc : string;
    btnPrimaryText : string;
    btnSecondaryText : string;
    btnPrimaryOnClick : Function;
    btnSecondaryOnClick : Function;
}

/**
 * Render a modal
 * 
 * Props
 * --------
 * title - the title of the modal
 * 
 * desc - the desc of the modal
 * 
 * btnPrimaryText - the text of the primary button
 * 
 * btnSecondaryText - the text of the secondary button
 * 
 * btnPrimaryOnClick - the function is called when the primary button is clicked
 * 
 * btnSecondaryOnClick - the function is called when the secondary button is clicked
 *  
 * @param props
 */
export default function Modal(props : Props) 
{

    return (
        <Backdrop>
            <div className={styles.modal}>
                <h2 className={styles.title}>{props.title}</h2>
                <p className={styles.desc}>{props.desc}</p>

                <div className={styles.btnContainer}>
                    <button className={styles.btnSecondary}>{props.btnSecondaryText}</button>
                    <button className={styles.btnPrimary}>{props.btnPrimaryText}</button>
                </div>
            </div>
        </Backdrop>
    )
}