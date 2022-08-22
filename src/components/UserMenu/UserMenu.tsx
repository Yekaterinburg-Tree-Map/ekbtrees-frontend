import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './UserMenu.module.css';
import cn from "classnames";
import {IUserMenuProps, IUserMenuState} from "./types";
import {PAGES} from '../../constants/pages'

export default class UserMenu extends Component<IUserMenuProps, IUserMenuState> {
    render() {
        return (
            <div className={styles.userNavBar}>
                <NavLink exact to='/trees' activeClassName={styles.active}>
                  <i className={cn([styles.faUser, "fas", "fa-user"])} />
                  {PAGES.myTrees}
                </NavLink>
                <NavLink exact to='/profileSettings' activeClassName={styles.active}>
                  <i className={cn([styles.faUser, "fas", "fa-user"])} />
                  {PAGES.profile}
                </NavLink>
            </div>
        )
    }
}
