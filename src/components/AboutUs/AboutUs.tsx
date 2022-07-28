import React, { Component } from 'react';
import './AboutUs.css';
import { IAboutUsProps, IAboutUsState } from "./types";
import image from "../../img/logoHeader.png";
import PageHeader from "../PageHeader";


export default class AboutUs extends Component<IAboutUsProps, IAboutUsState> {
  renderMain() {
    return (
      <article className="main">
        <h2 className="main__title">We are The Best in our field</h2>
        <img className="main__image" src={image} />
        <p className="main__text">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummy  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummystandard dummy text ever since the 1500s  standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummy Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s  standard dummy Lorem Ipsum is simply dummy text of the </p>

      </article>
    )
  }

  render() {
    return (
      <section className="about-us">
          <PageHeader title={'О нас'} />
        {this.renderMain()}
      </section>
    )
  }
}
