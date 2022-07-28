import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Menu.module.css';
import { IMenuProps, IMenuState, IMenuLink } from "./types";


export default class Menu extends Component<IMenuProps, IMenuState> {
    renderLinks() {
        const { user } = this.props;
        const availWidth = window.screen.availWidth;
        let links: IMenuLink[] = availWidth <= 580 ? [
            {
                activeClassName: styles.active,
                exact: true,
                onClick: this.props.onClick,
                title: 'Карта',
                to: '/map',
                className: styles.visibleMenuLink,
            }
        ] : [];


        const authLinks: IMenuLink[] = [];

        if (user) {
            authLinks.push(
                {
                    activeClassName: styles.active,
                    exact: true,
                    onClick: this.props.onClick,
                    title: 'Список деревьев',
                    to: '/trees',
                    className: styles.visibleMenuLink
                },
                {
                    activeClassName: styles.active,
                    exact: true,
                    onClick: this.props.onClick,
                    title: 'Настройки',
                    to: '/profileSettings',
                    className: styles.visibleMenuLink
                }
            );
        } else {
            authLinks.push(
                {
                    activeClassName: styles.active,
                    exact: true,
                    onClick: this.props.onClick,
                    title: 'Войти',
                    to: '/login',
                    className: styles.visibleMenuLink
                },
                {
                    activeClassName: styles.active,
                    exact: true,
                    onClick: this.props.onClick,
                    title: 'Регистрация',
                    to: '/registration',
                    className: styles.visibleMenuLink
                })
        }

        links = links.concat(authLinks);

        const items = links.map(link => {
            return (
                <NavLink
                    key={link.title}
                    exact={link.exact}
                    to={link.to}
                    activeClassName={link.activeClassName}
                    onClick={link.onClick}
                    hidden={link.hidden}
                    className={link.className}
                >
                    {link.title}
                </NavLink>
            );
        })

        if (user) {
            items.push(
                <div className={styles.visibleMenuLink} onClick={this.props.onCookieRemove}>Выйти</div>
            )
        }

        return items;
    }

    render() {
        return (
            <div id="navBar" className={styles.navBar}>
                {this.renderLinks()}
            </div>
        )
    }
}
