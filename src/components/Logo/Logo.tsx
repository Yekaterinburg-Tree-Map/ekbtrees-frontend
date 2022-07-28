import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styles from './Logo.module.css';
import logoImage from "../../img/logoHeader.png";


export class Logo extends Component {
	render() {
		return (
			<Link to='/'>
				<h1 className={styles.logo}>
					<img className={styles.logoImage} src={logoImage} />
					<span className={styles.logoText}>
						<span className={styles.firstPart}>Ekb</span>
						<span className={styles.secondPart}>Trees</span>
					</span>
				</h1>
			</Link>
		);
	}
}

export default Logo;
