import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import MapContain from '../Map/MapContain';
import styles from './Home.module.css';
import './Map.css';
import { IHomeProps } from "./types";
import { mapViewPositionContext, setMapViewPositionContext } from "../Main/Main";
import voluntary from '../../img/volontary.jpg';
import tree from '../../img/tree.png';


export default class Home extends Component<IHomeProps> {

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
    )
  }

  renderInvitationSection() {
    return (
      <section className={styles.volunteers}>
        <img src={voluntary} className={styles.voluntaryImage} />
        <div className={styles.voluntaryWrapper}>
          <p className={styles.voluntaryQuestion} >Как&nbsp;стать волонтером?</p>
          <p className={styles.voluntaryText}>Мы - группа неравнодушных горожан Екатеринбурга. Уже более трех лет мы добиваемся соблюдения права жителей на зеленый город.
Нас много и мы разные, в нашей команде есть архитекторы, экологи, it-специалисты, градостроители, дендрологи и многие другие. Нас объединяет любовь к родному городу и желание сделать его лучше.
Наша команда уже реализовала множество проектов: мы провели День Исети, благотворительный концерт #СКВЕРУБЫТЬ, Ночь городских сообществ и много чего еще, подробнее вы можете ознакомится в нашей группе ВКонтакте</p>
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
        {this.renderGetStartSection()}
        {this.renderInvitationSection()}
        {this.renderWhatWeDoSection()}
      </>
    )
  }
}
