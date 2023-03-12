import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
                        <MapContain
                            disabled={true}
                            user={this.props.user}
                            mapViewPosition={mapViewPosition}
                            setMapViewPosition={setMapViewPosition}
                            className={styles.map}
                        />
                    )}
                    </mapViewPositionContext.Consumer>
                )}
                </setMapViewPositionContext.Consumer>
            </section>
        )
    }

    renderGetStartSection() {
        return (
            <section className={styles.startInfo}>
                <div className={styles.wrapper}>
                    <div className={styles.popup}>
                    <span className={styles.popupTitle}>Защитим деревья вместе</span>
                    <span className={styles.popupText}>Нанеси любимые деревья на карту, чтобы сохранить информацию об их количестве и реальном состоянии. Для этого достаточно просто зарегистрироваться у нас на сайте. Делай фотографии и добавляй деревья на карту во время прогулки по городу.</span>
                    </div>
                </div>
                <div className={styles.startWrapper}>
                    <div className={styles.startTitle}>
                      Зачем мы считаем деревья?
                    </div>
                    <div className={styles.startTextWrapper}>
                        <span className={styles.startText}>Городские деревья часто страдают при строительстве...</span>
                        <Link to="/saveTrees" className={styles.startLink}>читать&nbsp;дальше</Link>
                    </div>
                </div>
            </section>
        )
    }

    renderInvitationSection() {
        return (
            <section className={styles.volunteers}>
                <img src={voluntary} className={styles.voluntaryImage} />
                <div className={styles.voluntaryWrapper}>
                    <p className={styles.voluntaryQuestion} >О&nbsp;нас</p>
                    <p className={styles.voluntaryText}>
                      Мы – группа неравнодушных горожан Екатеринбурга. Уже более пяти  лет мы добиваемся соблюдения права жителей на зеленый город. В нашей команде есть архитекторы, экологи, IT-специалисты, градостроители, дендрологи.
                    </p>
                    {/*<p className={styles.voluntaryText}>*/}
                    {/*    Нас объединяет любовь к родному городу и желание сделать его лучше.*/}
                    {/*    Наша команда уже реализовала множество проектов: мы провели День Исети, благотворительный концерт #СКВЕРУБЫТЬ, Ночь городских сообществ и много чего еще, подробнее вы можете ознакомиться в нашей группе ВКонтакте*/}
                    {/*</p>*/}
                </div>
            </section>
        )
    }

    renderWhatWeDoSection() {
        return (
            <section className={styles.weDoBlock}>
                <div className={styles.innerSection2}>
                    <header className={styles.weDoHeader}>Зачем деревья в городе ?</header>
                    <div className={styles.weDoInner}>
                        <p className={styles.weDoContent}>
                          Благоприятный климат для жизни:
                          <ul style={{paddingLeft:"50px"}}>
                            <li>сохраняют ментальное и психическое здоровье горожан</li>
                            <li>очищают воздух и насыщают его фитонцидами</li>
                            <li>регулируют скорость ветра и направляют воздушные потоки</li>
                            <li>задерживают пыль и вредные для человека частицы</li>
                            <li>фильтруют и очищают воду</li>
                            <li>сдерживают эрозию почвы корнями</li>
                            <li>создают тень и снижают температуру воздуха на 2-8 градусов</li>
                            <li>увлажняют воздух</li>
                            <li>сохраняют биоразнообразие</li>
                            <li>снижают уровень шума</li>
                          </ul>
                          Экономия бюджета:
                          <ul style={{paddingLeft:"50px"}}>
                          <li>снижение затрат на энергию</li>
                            <li>снижение затрат на водоотведение</li>
                            <li>снижение затрат на медицину</li>
                          </ul>
                        </p>
                    </div>
                </div>
            </section>
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
