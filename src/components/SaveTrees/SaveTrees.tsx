import React, { Component } from 'react';
import './SaveTrees.css';
import { ISaveTreesProps, ISaveTreesState } from "./types";
import image from "../../img/saveTrees.png";


export default class SaveTrees extends Component<ISaveTreesProps, ISaveTreesState> {
  renderHeader() {
    return (
      <header className="header">
        <div className="header__split"> </div>
        <div>&mdash;&mdash; Защитим деревья вместе</div>
      </header>
    )
  }
  renderMain() {
    return (
      <article className="main">
        <h2 className="main__title">Ежегодно Екатеринбург теряет сотни взрослых деревьев. Защитим их вместе!</h2>
        <img className="main__image" src={image} />
        <p className="main__text">Городские деревья часто страдают при строительстве, неправильной обрезке и&nbsp;некомпетентном уходе. Многие из&nbsp;них подолгу болеют и&nbsp;умирают. Из-за отсутствия комплексного подхода, никто не&nbsp;занимается их&nbsp;восстановлением и&nbsp;высадкой новых деревьев.
          Многие застройщики не&nbsp;осознают ценность уличных деревьев и&nbsp;кустарников. Большинство компаний экономит на&nbsp;озеленени, в&nbsp;результате чего качество среды снижается. Лишь малая часть из&nbsp;них беспокоится об&nbsp;окружающей среде, высаживают крупномеры вдоль фасадов, проводят грамотную обрезку деревьев.
          Данный проект представляет из&nbsp;себя карту, на&nbsp;которую нанесены и&nbsp;продолжают наносится деревья, находящиеся на&nbsp;территории Екатеринбурга. Эта карта даст волонтёрам возможность контроля за&nbsp;недобросовестными исполнителями. А&nbsp;также поможет ответственным подрядчикам снизить потери при помощи актуальных данных.
          С&nbsp;помощью этой карты волонтёры смогут требовать сохранения или, как минимум, эквивалентного восстановления зелёной массы уже на&nbsp;стадии общественного обсуждения проекта.
          Такая карта поможет сохранить и&nbsp;помочь восстановить множество парков и&nbsp;скверов города. В&nbsp;ней всегда будет храниться и&nbsp;обновляться информация о&nbsp;всех деревьях города. Это позволит людям, заинтересованным в&nbsp;сохранении окружающей среды, использовать&nbsp;её, как единый источник информации.
        </p>

      </article>
    )
  }

  render() {
    return (
      <section className="save-trees">

        {this.renderHeader()}
        {this.renderMain()}
      </section>
    )
  }
}
