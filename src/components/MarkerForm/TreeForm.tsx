import styles from "./TreeForm.module.css";
import React, { useState, useEffect } from "react";
import cn from "classnames";
import { MapState } from "../Map/MapState";

import { NavLink } from "react-router-dom";
import { ITreeFormProps } from "./types";
import treeImage from '../../img/defaultTree.png';
import { getFilesByTree } from "../EditTreeForm/actions";
import { IFile } from "../../common/types";
import FileUpload from "../FileUpload";
import Spinner from "../Spinner";

export const TreeForm = ({ activeTree, onClose, changeState }: ITreeFormProps) => {
    const [loading, setLoading] = useState<Boolean>(true);
    
    useEffect(() => {
        changeState(MapState.disabled);
        const myImage: HTMLImageElement | null = document.querySelector(".imageTreeBlock");
        getFilesByTree(activeTree.fileIds ?? [])
            .then(async files => {
                const file = files.filter((file: IFile) => file.mimeType.startsWith("image"))[0];
                if (!file?.uri) {
                    myImage!.src = treeImage;
                    setLoading(false);
                    return;
                }
                await fetch(file.uri)
                    .then(response => response.blob())
                    .then(imageBlob => {
                        const urlImage: string = URL.createObjectURL(imageBlob);
                        myImage!.src = urlImage;
                    });
                setLoading(false);
            });
    }, [])

    return (
        <figure className={styles.block}>
            <div className={styles.leftBlock}>
                <button className={styles.close} onClick={onClose}><i className="fa fa-times" /></button>
                <div className={styles.row}>
                    <span className={styles.rowName}>ID</span>
                    <span className={styles.rowValue}>{activeTree?.id}</span>
                </div>
                <hr className={styles.hr} />
                <div className={styles.row}>
                    <span className={styles.rowName}>Порода</span>
                    <span className={styles.rowValue}>{activeTree?.species?.title}</span>
                </div>
                <hr className={styles.hr} />
                <div className={styles.row}>
                    <span className={styles.rowName}>Высота в метрах</span>
                    <span className={styles.rowValue}>{activeTree?.treeHeight}</span>
                </div>
                <hr className={styles.hr} />
                <div className={styles.row}>
                    <span className={styles.rowName}>Визуальная оценка состояния</span>
                    <span className={styles.rowValue}>{activeTree?.conditionAssessment}</span>
                </div>
                <hr className={styles.hr} />
                <div className={styles.row}>
                    <span className={styles.rowName}>Обхват самого толстого ствола (см)</span>
                    <span className={styles.rowValue}>{activeTree?.diameterOfCrown}</span>
                </div>
                <hr className={styles.hr} />
            </div>
            <div className={styles.rightBlock}>
                {loading ? <Spinner /> : null}
                <div className={styles.wrapper}>
                    <img className="imageTreeBlock" height="170px" style={{ display: loading ? "none" : "block" }} />
                </div>
                <NavLink to={`trees/tree=${activeTree?.id}`} className={styles.link} >Узнать подробнее</NavLink>
            </div>
        </figure>
    )
};

export default TreeForm;
