import { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Footer.module.css';
import telegramIcon from '../../img/telegram.png';
import vkIcon from '../../img/vk.png'
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
                        <a href={"https://parklandekb.ru"}><img className={styles.image} src={telegramIcon} alt={"website"} /></a>
                        <a href={"https://vk.com/parklandekb"}><img className={styles.image} src={vkIcon} alt={"vk"} /></a>
                    </div>

                </div>
                <div className={styles.column}>
                    <span className={styles.nameColumn}>Компания</span>
                    <NavLink className={styles.link} exact to='/aboutUs' activeClassName="active">О нас</NavLink>
                    <NavLink className={styles.link} exact to='/aboutUs' activeClassName="active">Что мы делаем ?</NavLink>
                </div>
                <div className={styles.column}>
                    <span className={styles.nameColumn}>Помощь</span>
                    <NavLink className={styles.link} exact to='/aboutUs' activeClassName="active">Политика конфиденциальности</NavLink>
                </div>
                <div className={styles.column}>
                    <span className={styles.nameColumn}>Общие вопросы</span>
                    <span className={styles.email}>Email: example@example.com</span>
                </div>
            </footer >
        )
    }
}
