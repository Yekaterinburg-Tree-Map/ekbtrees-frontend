import React from 'react';
import {IModalProps} from "./types";
import styles from './Modal.module.css';

const Modal: React.FC<IModalProps> = (props) => {
    return (
        <React.Fragment>
            <div className={`${styles.modalWrap} ${props.show ? styles.visible : ""}`}>
                <div className={styles.modal}>
                    {props.children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Modal;
