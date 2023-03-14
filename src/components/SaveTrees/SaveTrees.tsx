import React, { Component } from 'react';
import './SaveTrees.css';
import { ISaveTreesProps, ISaveTreesState } from "./types";
import image from "../../img/saveTrees.png";
import PageHeader from "../PageHeader";

export default class SaveTrees extends Component<ISaveTreesProps, ISaveTreesState> {
  renderMain() {
    return (
      <article className="main">
        <h2 className="main__title">Зачем мы считаем деревья?</h2>
        <img className="main__image" src={image} />
        <p className="main__text">Городские деревья часто страдают при строительстве, благоустройстве, неправильной обрезке, уборке улиц и отсутствии должного ухода. Многие из них подолгу болеют и умирают. Из-за отсутствия мониторинга зелёных насаждений в городе нет комплексного подхода в управлении зелёным хозяйством. Каждый год Екатеринбург  безвозвратно теряет деревья. С их потерей снижается качество окружающей среды и горожане чаще болеют.
        </p>
        <p className="main__text">
          На нашем сайте вы можете нанести на карту деревья, находящиеся на территории Екатеринбурга. Эта карта даст возможность диалога между жителями, администрацией, бизнесом. С помощью этого сервиса можно аргументированно участвовать в общественных обсуждениях различных городских проектов.
        </p>

      </article>
    )
  }

  render() {
    return (
      <section className="save-trees">
          <PageHeader title={'Защитим деревья вместе'} />
        {this.renderMain()}
      </section>
    )
  }
}
