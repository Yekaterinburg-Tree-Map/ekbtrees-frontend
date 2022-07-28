import React from 'react';
import { IModalProps } from "./types";
import styles from './Modal.module.css';

const Modal: React.FC<IModalProps> = (props) => {
    return (
        <React.Fragment>
            <div className={`${styles.modalWrap} ${props.show ? styles.visible : ""}`}>
                <div className={styles.modal}>
                    <div className={`${styles.heading} ${props.danger ? styles.danger : styles.success}`}>
                        {props.danger ?
                            <svg width="132" height="126" viewBox="0 0 132 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M129.5 63C129.5 96.3049 101.181 123.5 66 123.5C30.819 123.5 2.5 96.3049 2.5 63C2.5 29.6951 30.819 2.5 66 2.5C101.181 2.5 129.5 29.6951 129.5 63Z" stroke="white" strokeWidth="5" />
                                <path d="M93.3082 33.1577L65.9978 66.3156M38.6875 99.4735L65.9978 66.3156M65.9978 66.3156L38.6875 33.1577L93.3082 99.4735" stroke="white" strokeWidth="10" />
                            </svg>
                            :
                            <svg width="132" height="126" viewBox="0 0 132 126" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M129.5 63C129.5 96.3049 101.181 123.5 66 123.5C30.819 123.5 2.5 96.3049 2.5 63C2.5 29.6951 30.819 2.5 66 2.5C101.181 2.5 129.5 29.6951 129.5 63Z" stroke="white" strokeWidth="5" />
                                <path d="M30 45L60 89L106 35" stroke="white" strokeWidth="10" />
                            </svg>
                        }
                        <p className={styles.modalHeadingMessage}>{props.modalHeadingMessage}</p>
                    </div>
                    <div className={styles.modalContent}>
                        {props.children}
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

export default Modal;
