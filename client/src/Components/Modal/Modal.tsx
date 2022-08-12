import Backdrop from "../Backdrop/Backdrop"
import styles from "./Modal.module.scss";

export default function Modal() {
    return (
        <Backdrop>
            <div className={styles.modal}>
                <h2 className={styles.title}>Success!</h2>
                <p className={styles.desc}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Minima, deserunt quam quos tenetur hic accusamus reprehenderit aut? Autem, dignissimos doloremque.</p>

                <div>
                    <button>Click</button>
                    <button>Click</button>
                </div>
            </div>
        </Backdrop>
    )
}