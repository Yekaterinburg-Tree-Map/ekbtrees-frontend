import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import styles from './DesktopHeader.module.css';
import UserInfo from '../UserInfo';
import { Logo } from "../Logo/Logo";
import { IDesktopHeaderProps, IDesktopHeaderState } from "./types";
import {PAGES} from '../../constants/pages'

export class DesktopHeader extends Component<IDesktopHeaderProps, IDesktopHeaderState> {
	static defaultProps = {
		onCookieRemove: null,
		user: null
	}

	renderUserLinks() {
		const { user } = this.props;

		if (user) {
			return (
                <>
                    <NavLink exact to='/trees' activeClassName={styles.activeLink}>{PAGES.myTrees}</NavLink>
                    <div>
                        {(user.roles.includes('superuser') || user.roles.includes('moderator')) &&
                            <NavLink exact to='/allTrees' activeClassName={styles.activeLink}>{PAGES.allTrees}</NavLink>
                        }
                        {user.roles.includes('superuser') &&
                            <NavLink exact to='/users' activeClassName={styles.activeLink}>{PAGES.users}</NavLink>
                        }
                    </div>
                </>
			)
		}
	}

	renderContent() {
		return (
			<div className={styles.desktopHeader}>
				<div style={{ display: "flex", alignItems:"center"}}>
					{/* <label className={styles.switch}>
						<input type="checkbox" onClick={this.props.switchTheme} />
						<span className={styles.slider} />
					</label> */}
					<Logo />
				</div>
				<div className={styles.menu}>
					<NavLink exact to='/map' activeClassName={styles.activeLink}>Карта</NavLink>
					{/* <NavLink exact to='/aboutUs' activeClassName={styles.activeLink}>О&nbsp;нас</NavLink> */}
					{/* <NavLink exact to='/map' activeClassName={styles.activeLink}>Инструкции</NavLink>
					<NavLink exact to='/map' activeClassName={styles.activeLink}>Контакты</NavLink> */}
					{this.renderUserLinks()}
				</div>
				{this.renderUserInfo()}
				{this.renderLoginControllers()}
			</div>
		);
	}

	renderUserInfo() {
		if (this.props.user) {
			return (
				<UserInfo onCookieRemove={this.props.onCookieRemove} user={this.props.user} />
			)
		}
	}

	renderLoginControllers() {
		if (!this.props.user) {
			return (
				<div className={styles.signLinks}>
					<NavLink exact to='/login' activeClassName={styles.activeSignLinks}>Войти</NavLink>
					<NavLink exact to='/registration' activeClassName={styles.activeSignLinks}>Зарегистрироваться</NavLink>
				</div>
			)
		}
	}

	render() {
		return this.renderContent();
	}
}

export default DesktopHeader;
