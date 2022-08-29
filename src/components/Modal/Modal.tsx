import React from 'react';
import { IModalProps } from "./types";
import styles from './Modal.module.css';

const Modal: React.FC<IModalProps> = (props) => {
    return (
        <React.Fragment>
            <div className={`${styles.modalWrap} ${props.show ? styles.visible : ""}`}>
                <div className={styles.modal}>
                    <div className={`${styles.heading} ${props.danger ? styles.danger : styles.success}`} />
                    <div className={styles.modalContent}>
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Modal;
