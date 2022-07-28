import React, { Component } from 'react';
import Menu from '../Menu';
import styles from './MobileHeader.module.css';
import { Logo } from "../Logo/Logo";
import { IMobileHeaderProps, IMobileHeaderState } from "./types";
import { NavLink } from "react-router-dom";

export class MobileHeader extends Component<IMobileHeaderProps, IMobileHeaderState> {
	static defaultProps = {
		user: null
	}

	ref: HTMLDivElement | null = null;

	state = {
		open: false
	};

	componentDidMount() {
		window.addEventListener('mousedown', this.handleMouseDown)
	}

	componentWillUnmount() {
		window.removeEventListener('mousedown', this.handleMouseDown);
	}

	handleClick: React.MouseEventHandler<HTMLElement> = () => this.setState({ open: !this.state.open });

	renderMenu() {
		const { open } = this.state;
		return open
			? <div ref={this.handleRef}>
				<Menu onClick={this.handleClick} onCookieRemove={this.props.onCookieRemove} user={this.props.user} />
			</div>
			: null;
	}

	handleMouseDown = (event: MouseEvent) => {
		const { ref } = this;

		if (ref) {
			const rect = ref.getBoundingClientRect();

			if (event.clientY > rect.bottom) {
				this.setState({ open: false })
			}
		}
	}

	handleRef = (ref: HTMLDivElement) => {
		this.ref = ref;
	}

	renderContent() {
		return (
			<div className={styles.mobileHeader}>
				<div className={styles.topNav}>
					{/* <div style={{ display: "flex", alignItems:"center"}}> */}
					{/* <label className={styles.switch}>
						<input type="checkbox" onClick={this.props.switchTheme}/>
						<span className={styles.slider} />
					</label> */}
					<Logo />
					{/* </div> */}
					<div className={styles.links}>
						<NavLink
							exact
							to='/map'
							className={styles.mapLink}
							activeClassName={styles.activeLink}
						>
							Карта
						</NavLink>
					</div>
					<button className={styles.burgerBtn} onClick={this.handleClick}>
						<i className="fa fa-bars" />
					</button>
				</div>
				{this.renderMenu()}
			</div>
		)
	}

	render() {
		return this.renderContent();
	}
}

export default MobileHeader;
