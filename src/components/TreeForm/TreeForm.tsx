import styles from "./TreeForm.module.css";
import React, { useState, useEffect } from "react";
import { MapState } from "../Map/MapState";
import { Link } from "react-router-dom";
import { ITreeFormProps } from "./types";
import { getFilesByTree } from "../../api/files";
import {IFile} from "../../common/types";
import Spinner from "../Spinner";

export const TreeForm = ({ activeTree, onClose, changeState, user }: ITreeFormProps) => {
    const [loading, setLoading] = useState<Boolean>(true);
    const [hasImage, setHasImage] = useState<Boolean>(true);
    useEffect(() => {
        changeState(MapState.disabled);
        const myImage: HTMLImageElement | null = document.querySelector(".imageTreeBlock");
        getFilesByTree(activeTree.fileIds ?? [])
            .then(async files => {
                const file = files.filter((file: IFile) => file.mimeType.startsWith("image"))[0];
                if (!file?.uri) {
                    setLoading(false);
                    setHasImage(false)
                    return;
                }
                await fetch(file.uri)
                    .then(response => response.blob())
                    .then(imageBlob => {
                      setHasImage(true);
                      myImage!.src = URL.createObjectURL(imageBlob);
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
                    <span className={styles.rowName}>Род/вид дерева</span>
                    <span className={styles.rowValue}>{activeTree?.species?.title}</span>
                </div>
                <hr className={styles.hr} />
                <div className={styles.row}>
                    <span className={styles.rowName}>Высота в метрах</span>
                    <span className={styles.rowValue}>{activeTree?.treeHeight}</span>
                </div>
                <hr className={styles.hr} />
                <div className={styles.row}>
                    <span className={styles.rowName}>Диаметр кроны (в метрах)</span>
                    <span className={styles.rowValue}>{activeTree?.diameterOfCrown}</span>
                </div>
                <hr className={styles.hr} />
            </div>
            <div className={styles.rightBlock}>
                {loading ? <Spinner /> : null}
                <div className={styles.wrapper}>
                  {hasImage ?
                    <img className="imageTreeBlock" height="170px" style={{ display: loading ? "none" : "block" }} /> :
                    <div className={styles.mockImage} >Нет фото</div>
                  }
                </div>
                <Link
                    to={{
                        pathname: `trees/${activeTree?.id}`,
                        state: {prevPosition: activeTree.geographicalPoint}
                    }}
                    className={styles.link}
                >
                    Узнать подробнее
                </Link>
            </div>
        </figure>
    )
};

export default TreeForm;
