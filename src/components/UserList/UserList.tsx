import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './UserList.module.css';
import { IRestUser } from "../../common/types";
import {
    ITreeListsProps,
    ITreeListsState,
    ITreeListsTreeTable
} from "./types";

const locale: ITreeListsTreeTable = {
    firstName: 'Имя',
    lastName: 'Фамилия',
    email: 'Email',
    phone: 'Телефон',
    roles: 'Роли'
}

export default class UserList extends Component<ITreeListsProps, ITreeListsState> {
    getUser = (user: IRestUser) => {
        const { id, firstName, lastName, email, phone } = user;

        return (
            <Link to={`/users/${id}`} className={styles.TableItemWrapper} key={id}>
                <div className={styles.TableItem}>{lastName}</div>
                <div className={styles.TableItem}>{firstName}</div>
                <div className={styles.TableItem}>{email}</div>
                <div className={styles.TableItem}>{phone}</div>
            </Link>
        )
    }

    getUserMobile = (user: IRestUser) => {
        return (
            <Link to={`/users/${user.id}`} className={styles.TableRowMobile} key={user.id}>
                <div className={styles.TableItemWrapperHeadingMobile}>
                    <span>{locale.lastName}</span>
                    <span>{locale.firstName}</span>
                    <span>{locale.email}</span>
                    <span>{locale.phone}</span>
                </div>
                <div className={styles.TableItemWrapperMobile}>
                    <span className={styles.TableItemMobile}>{user.lastName || '-'}</span>
                    <span className={styles.TableItemMobile}>{user.firstName || '-'}</span>
                    <span className={styles.TableItemMobile}>{user.email || '-'}</span>
                    <span className={styles.TableItemMobile}>{user.phone || '-'}</span>
                </div>
            </Link>
        )
    }

    renderTrees() {
        const { users } = this.props;

        return (
            <div className={styles.TableBody}>
                {users.map(this.getUser)}
            </div>
        );
    }

    renderTreesMobile() {
        const { users } = this.props;

        return (
            <div className={styles.TableBodyMobile}>
                {users.map(this.getUserMobile)}
            </div>
        );
    }

    renderTableHeader = () => {
        const { firstName, lastName, email, phone } = locale;

        return (
            <div className={styles.TableHeader}>
                <p className={styles.TableHeaderItem}>{lastName}</p>
                <p className={styles.TableHeaderItem}>{firstName}</p>
                <p className={styles.TableHeaderItem}>{email}</p>
                <p className={styles.TableHeaderItem}>{phone}</p>
            </div>
        )
    }

    renderTable() {
        return (
            <div className={styles.Table}>
                {this.renderTableHeader()}
                {this.renderTrees()}
            </div>
        )
    }

    renderTableMobile() {
        return (
            <div className={styles.TableMobile}>
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
