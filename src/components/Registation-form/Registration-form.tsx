import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './Registration-form.module.css';
import FormHeader from '../AuthForm';
import vkIcon from '../../img/vkSignUp.png';
import {IRegistrationFormInput, IRegistrationFormProps, IRegistrationFormState} from "./types";


export default class RegistrationForm extends Component<IRegistrationFormProps, any> {
    state: any = {
        touchStart: null,
        error: false,
        errorMail: false,
        success: false,

        email: null,
        password: null,
        secPassword: null,
    }


    handleTouch: React.TouchEventHandler<HTMLElement> = (e) => {
        this.setState({
            touchStart: e.changedTouches[0].clientX
        })
    }

    handleTouchEnd: React.TouchEventHandler<HTMLElement> = (e) => {
        let difference = e.changedTouches[0].clientX - this.state.touchStart;
        const width = window.innerWidth;

        if (difference > width / 2) {
            this.pushLogin();
        }
    }

    pushLogin() {
        this.props.history.push('/login');
    }

    checkPasswords: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (this.state.password === this.state.secPassword) {
            const input: IRegistrationFormInput = {
                firstName: "Волонтер",
                lastName: "Волонтер",
                email: this.state.email,
                password: this.state.password
            };
            this.register(input)
        } else {
            this.setState({
                error: true
            })
        }
    }

    renderError() {
        if (this.state.error) {
            return (
                <p className={styles.regError}>Пароли не соответствуют</p>
            )
        }

        if (this.state.errorMail) {
            return (
                <p className={styles.regError}>Пользователь под такой почтой уже зарегистрирован</p>
            )
        }
    }

    renderSuccess() {
        if (this.state.success) {
            window.setTimeout(() => {
                window.location.href = "/login"
            }, 5000);
            return (
                <p className={styles.regSuccess}>Пользователь зарегистрирован. Вы будете перенаправлены на страницу
                    входа</p>
            )
        }
    }

    async register(input: IRegistrationFormInput) {
        const response = await fetch('/auth/register', {
            method: "POST",
            headers: new Headers({
                "Content-Type": "application/json"
            }),
            body: JSON.stringify(input)
        })
        if (response.ok) {
            this.setState({errorMail: false})
            this.setState({success: true});
        } else {
            this.setState({errorMail: true});
            this.setState({success: false});
        }
    }

    render() {
        return (
            <>
                <FormHeader/>
                <section className={styles.registrationContainer} onTouchStart={this.handleTouch}
                         onTouchEnd={this.handleTouchEnd}>
                    <form name="registration" method="post" className={styles.registrationForm}
                          onSubmit={this.checkPasswords}>
                        <h2 className={styles.title}>Регистрация</h2>
                        <input type="email" placeholder="Введите почту" name="email" id="userEmail"
                               onChange={e => this.setState({email: e.target.value})} required/>
                        <input type="password" placeholder="Придумайте пароль" name="psw" id="userPassword"
                               onChange={e => this.setState({password: e.target.value})} required/>
                        <input type="password" placeholder="Подтвердите пароль" name="psw2" id="userConfirmPassword"
                               onChange={e => this.setState({secPassword: e.target.value})} required/>

                        <div className={styles.loginMessage}>
                            {this.renderError()}
                            {this.renderSuccess()}
                        </div>
                        <button type="submit">Регистрация</button>

                        <p className={styles.loginMessage}>или зарегистрируйтесь с</p>
                        <div className={styles.flexSocial}>
                            <div className={styles.social}>
                                <Link to="/vk"><img src={vkIcon} alt="vk-link"/></Link>
                                {/* <NavLink to="/vk"><img src={googleIcon} alt="google-link" /></NavLink> */}
                            </div>
                        </div>
                        <p className={styles.privacyTerms}>© 2020 — 2021 Privacy-Terms</p>
                    </form>
                    <aside className={styles.registrationAside}>
                        <h2 className={styles.title}>Привет, Друг!</h2>
                        <p>Введите данные, чтобы продолжить</p>
                        <Link className={styles.linkLogin} to='/login'>Авторизоваться</Link>
                    </aside>
                </section>
            </>
        );
    }
}
