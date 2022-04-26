import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MapContain from '../Map/MapContain';
import styles from './Home.module.css';
import './Map.css';
import { IHomeProps } from "./types";
import { mapViewPositionContext, setMapViewPositionContext } from "../Main/Main";
import volontary from '../../img/volontary.jpg';
import tree from '../../img/tree.png';


export default class Home extends Component<IHomeProps> {
  constructor(props: IHomeProps) {
    super(props);
  }


  renderMapSection() {
    return (
      <section>
        <setMapViewPositionContext.Consumer>
          {setMapViewPosition => (
            <mapViewPositionContext.Consumer>
              {mapViewPosition => (
                <MapContain user={this.props.user} mapViewPosition={mapViewPosition} setMapViewPosition={setMapViewPosition} />
              )}
            </mapViewPositionContext.Consumer>
          )}
        </setMapViewPositionContext.Consumer>
      </section>
    )
  }

  renderGetStartSection() {
    return (
      <>
        <section className={styles.startInfo} >
          <div className={styles.wrapper}>
            <div className={styles.popup}>
              <span className={styles.popupTitle}>Защитим деревья вместе</span>
              <span className={styles.popupText}>Нанеси любимые деревья на карту, чтобы сохранить информацию об их количестве и реальном состоянии. Для этого не обязательно быть волонтёром. Достаточно просто зарегистрироваться у нас на сайте или в мобильном приложении.
                Делай фотографии и добавляй деревья на карту. Начнём озеленять любимый город вместе!</span>
              <a href="/aboutUs" className={styles.startButton}>Начать &#8658;</a>
            </div>
          </div>
          <article className={styles.startWrapper}>
            <span className={styles.startTitle}>Ежегодно Екатеринбург теряет сотни взрослых деревьев. Пора&nbsp;действовать!</span><br />
            <div className={styles.startTextWrapper}>
              <span className={styles.startText}>Городские деревья часто страдают при строительстве...</span>
              <a href="/aboutUs" className={styles.startLink}>читать дальше</a>
            </div>
          </article>
        </section>
      </>
    )
  }

  renderInvitationSection() {
    return (
      <section className={styles.volunteers}>
        <img src={volontary} className={styles.volontaryImage} />
        <div className={styles.volontaryWrapper}>
          <p className={styles.volontaryQuestion} >Как&nbsp;стать&nbsp;волонтером?</p>
          <p className={styles.volontaryText}>Присоединяйтесь к нам как волонтера с сегодняшнего дня Aliquam dapibus sapien molestie, dictum turpis quis, euismod felis. Duis hendrerit lacus eu quam pharetra, a hendrerit massa sodales. Curabitur lacinia leo nisl, sit amet suscipit turpis mollis in.</p>
          <p className={styles.volontaryText}> Pellentesque nulla arcu, fermentum ultrices ipsum at, suscipit fermentum mauris. Suspendisse potenti. Aenean vel sagittis velit. Ut et facilisis tellus, eu ornare leo..</p>
          <div style={{ display: "flex", marginTop: "55px" }}>
            {/* <a className={styles.login} href="login">Войти</a>
            <a className={styles.signup} href="registration"> Зарегистрироваться</a> */}
          </div>
        </div>
      </section>
    )
  }

  renderWhatWeDoSection() {
    return (
      <article className={styles.weDoBlock}>
        <header className={styles.weDoHeader}>&mdash;&mdash;  Что мы делаем ?</header>
        <div className={styles.weDoInner}>
          <p className={styles.weDoContent}>Мы заботимся о деревьях в нашем городе. Городские деревья часто страдают при строительстве. Карта деревьев Екатеринбурга - это инструмент для регистрации городских деревьев...</p>
          <img className={styles.weDoImage} src={tree} />
        </div>
      </article>
    )
  }

  render() {
    return (
      <>
        {this.renderMapSection()}
        {this.props.user ? null : this.renderGetStartSection()}
        {this.renderInvitationSection()}
        {this.renderWhatWeDoSection()}
      </>
    )
  }
}
