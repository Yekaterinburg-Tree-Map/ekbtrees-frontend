import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';
import telegramIcon from '../../img/telegram.png';
import vkIcon from '../../img/vk.png'
import websiteIcon from '../../img/website.png'
import { IFooterProps, IFooterState } from './types';

export default class Footer extends Component<IFooterProps, IFooterState> {
    render() {
        return (
            <footer className={styles.footerWrapper} data-theme={this.props.theme}>
                <div className={styles.info}>
                    <div className={styles.slogan}><span>Ekb</span><span>Trees</span></div>
                    <span>Copyrights EkbTrees</span>
                    <span className={styles.copyright}>All rights reserved.</span>
                    <div className={styles.images}>
                        <a href="https://t.me/parklandekb"><img className={styles.image} src={telegramIcon} alt={"telegram"} /></a>
                        <a href="https://vk.com/parklandekb"><img className={styles.image} src={vkIcon} alt={"vk"} /></a>
                        <a href="https://parklandekb.ru"><img className={styles.image} src={websiteIcon} alt={"website"} /></a>
                    </div>

                </div>
                <div className={styles.column}>
                    <span className={styles.nameColumn}>Компания</span>
                    {/* <NavLink className={styles.link} exact to='/aboutUs' activeClassName="active">О нас</NavLink> */}
                    <NavLink className={styles.link} exact to='/aboutUs' activeClassName="active">Что мы делаем&nbsp;?</NavLink>
                </div>
                <div className={styles.column}>
                    <span className={styles.nameColumn}>Помощь</span>
                    <NavLink className={styles.link} exact to='/aboutUs' activeClassName="active">Политика конфиденциальности</NavLink>
                </div>
                <div className={styles.column}>
                    <span className={styles.nameColumn}>Общие вопросы</span>
                    <a href="mailto:parklandekb@gmail.com" className={styles.email}>parklandekb@gmail.com</a>
                </div>
            </footer >
        )
    }
}
