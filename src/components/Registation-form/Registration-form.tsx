import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Registration-form.module.css';
import FormHeader from '../AuthForm';
import vkIcon from '../../img/vkSignUp.png';
import googleIcon from '../../img/googleSignUp.png';
import { IRegistrationFormInput, IRegistrationFormProps, IRegistrationFormState } from "./types";


export default class RegistrationForm extends Component<IRegistrationFormProps, IRegistrationFormState> {
    state: IRegistrationFormState = {
        touchStart: null,
        error: false,
        errorMail: false,
        success: false,
    }

    handleTouch: React.TouchEventHandler<HTMLElement> = (e) => {
        this.setState({
            touchStart: e.changedTouches[0].clientX
        })
    }

    handleTouchEnd: React.TouchEventHandler<HTMLElement> = (e) => {
        let difference = e.changedTouches[0].clientX - this.state.touchStart;
        var width = window.innerWidth;
        if (difference > width / 2) {
            this.pushLogin();
        }
    }

    pushLogin() {
        this.props.history.push('/login');
    }

    checkPasswords: React.FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
        if (e.currentTarget.psw.value === e.currentTarget.psw2.value) {
            const input: IRegistrationFormInput = {
                firstName: e.currentTarget.firstName.value,
                lastName: e.currentTarget.lastName.value,
                email: e.currentTarget.email.value,
                password: e.currentTarget.psw.value
            };
            this.register(input)
        }

        else {
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
            window.setTimeout(() => { window.location.href = "/login" }, 5000);
            return (
                <p className={styles.regSuccess}>Пользователь зарегистрирован. Вы будете перенаправлены на страницу входа</p>
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
            this.setState({ errorMail: false })
            this.setState({ success: true });
        } else {
            this.setState({ errorMail: true });
            this.setState({ success: false });
        }
    }

    render() {
        return (
            <>
                <FormHeader />
                <section className={styles.registrationContainer} onTouchStart={this.handleTouch}
                    onTouchEnd={this.handleTouchEnd}>
                    <form name="registration" method="post" className={styles.registrationForm}
                        onSubmit={this.checkPasswords}>
                        <h2 className={styles.title}>Регистрация</h2>
                        <input type="text" placeholder="Имя" name="firstName" id="userFirstName" required />
                        <input type="text" placeholder="Фамилия" name="lastName" id="userLastName" required />
                        <input type="email" placeholder="Введите почту" name="email" id="userEmail" required />
                        <input type="password" placeholder="Придумайте пароль" name="psw" id="userPassword" required />
                        <input type="password" placeholder="Подтвердите пароль" name="psw2" id="userConfirmPassword"
                            required />

                        <div className={styles.loginMessage}>
                            {this.renderError()}
                            {this.renderSuccess()}
                        </div>
                        <button type="submit">Регистрация</button>

                        <p className={styles.loginMessage}>или зарегистрируйтесь с</p>
                        <div className={styles.flexSocial}>
                            <div className={styles.social}>
                                <NavLink to="/vk"><img src={vkIcon} alt="vk-link" /></NavLink>
                                {/* <NavLink to="/vk"><img src={googleIcon} alt="google-link" /></NavLink> */}
                            </div>
                        </div>
                        <p className={styles.privacyTerms}>© 2020 — 2021 Privacy-Terms</p>
                    </form>
                    <aside className={styles.registrationAside}>
                        <h2 className={styles.title}>Привет, Друг!</h2>
                        <p>Введите данные, чтобы продолжить</p>
                        <NavLink className={styles.linkLogin} exact to='/login'
                            activeClassName="active">Авторизоваться</NavLink>
                    </aside>
                </section>
            </>
        );
    }
}
