import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './TreeLists.module.css';
import cn from "classnames";
import { formatDate } from '../../helpers/date';
import { IJsonTreeWithImage } from "../../common/types";
import {
    ITreeListsProps,
    ITreeListsState,
    ITreeListsStateLocale
} from "./types";
import defaultTreeImage from '../../common/images/default_treelists_tree_img.png';


const locale: ITreeListsStateLocale = {
    treeTable: {
        age: 'Возраст',
        creationDate: 'Дата добавления',
        height: 'Высота',
        image: "Изображение",
        species: 'Вид'
    }
}

const getTreeLink = (treeId: string | number) => {
    return `/trees/${treeId}`
}

export default class TreeLists extends Component<ITreeListsProps, ITreeListsState> {
    getTree = (tree: IJsonTreeWithImage, index: string | number) => {
        const { age, created, id, image, species, treeHeight } = tree;

        return (id &&
            <Link to={getTreeLink(id)} className={styles.treeTableItemWrapper} key={id}>
                <div className={cn([styles.treeTableItem, styles.treeTableItemImg])}>
                    <img src={image || defaultTreeImage} alt='tree' className={styles.tableImg} />
                </div>
                <div className={styles.treeTableItem}>
                    <label htmlFor={String(index)}>{species?.title}</label>
                </div>
                <div className={styles.treeTableItem}>{age ?? "—"}</div>
                <div className={styles.treeTableItem}>{treeHeight ?? "—"}</div>
                <div className={styles.treeTableItem}>
                    {formatDate(created ?? Date.now())}
                </div>
            </Link>
        )
    }

    getTreeMobile = (tree: IJsonTreeWithImage) => {
        const { age, created, id, image, species, treeHeight } = tree;
        return (id &&
            <Link to={getTreeLink(id)} className={styles.treeTableRowMobile} key={id}>
                <div className={cn([styles.treeTableItemMobile, styles.treeTableItemImgMobile])}>
                    <img src={image || defaultTreeImage} alt='tree' className={styles.tableImgMobile} />
                </div>
                <div className={styles.treeTableItemWrapperHeadingMobile}>
                    <span>Вид</span>
                    <span>Возраст</span>
                    <span>Высота</span>
                    <span>Дата добавления</span>
                </div>
                <div className={styles.treeTableItemWrapperMobile}>
                    <span className={styles.treeTableItemMobile}>{species?.title}</span>
                    <span className={styles.treeTableItemMobile}>{age ?? "—"}</span>
                    <span className={styles.treeTableItemMobile}>{treeHeight ?? "—"}</span>
                    <span className={styles.treeTableItemMobile}>
                        {formatDate(created ?? Date.now())}
                    </span>
                </div>
            </Link>
        )
    }

    renderTrees() {
        const { trees } = this.props;

        return (
            <div className={styles.treeTableBody}>
                {trees.map(this.getTree)}
            </div>
        );
    }

    renderTreesMobile() {
        const { trees } = this.props;

        return (
            <div className={styles.treeTableBodyMobile}>
                {trees.map(this.getTreeMobile)}
            </div>
        );
    }

    renderTableHeader = () => {
        const { age, creationDate, height, image, species } = locale.treeTable;

        return (
            <div className={styles.treeTableHeader}>
                <p className={styles.treeTableHeaderItem}>{image}</p>
                <p className={styles.treeTableHeaderItem}>{species}</p>
                <p className={styles.treeTableHeaderItem}>{age}</p>
                <p className={styles.treeTableHeaderItem}>{height}</p>
                <p className={styles.treeTableHeaderItem}>{creationDate}</p>
            </div>
        )
    }

    renderTable() {
        return (
            <div className={styles.treeTable}>
                {this.renderTableHeader()}
                {this.renderTrees()}
            </div>
        )
    }

    renderTableMobile() {
        return (
            <div className={styles.treeTableMobile}>
                {this.renderTreesMobile()}
            </div>
        )
    }

    render () {
        return (
            <div className={styles.container}>
                {this.renderTable()}
                {this.renderTableMobile()}
            </div>
        );
    }
}

