import React from 'react';
import {Link} from 'react-router-dom';
import FormHeader from '../AuthForm';
import vkIcon from '../../img/vkSignUp.png';

import {IRegistrationFormProps} from "./types";
import styles from './Registration-form.module.css';

export function RegistrationForm({user, history}: IRegistrationFormProps) {
  const [registrationData, setRegistrationData] = React.useState({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
  })
  const [secondPassword, setSecondPassword] = React.useState("")
  const [error, setError] = React.useState({
    error: false,
    isMailExist: false
  });

  const errorContent = () => {
    return (
      <p
        className={styles.regError}>{error.isMailExist ?
        "Пользователь с такой почтой уже зарегистрирован" :
        "Пароли не соответствуют"}</p>
    )
  }

  const submit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (registrationData.password !== secondPassword) {
      setError({error: true, isMailExist: false});
      return;

    }

    const response =
      await fetch('/auth/register', {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json"
        }),
        body: JSON.stringify(registrationData)
      })
    if (response.ok) {
      setError({error: false, isMailExist: false})
      history.push("/login")

    } else {
      setError({error: true, isMailExist: true})
    }
  }


  return (
    <>
      <FormHeader/>
      <section className={styles.registrationContainer} onTouchStart={() => console.log(1)}
               onTouchEnd={() => console.log(1)}>
        <form className={styles.registrationForm}
              onSubmit={submit}>
          <h2 className={styles.title}>Регистрация</h2>
          <input type="email" placeholder="Введите почту"
                 onChange={e => setRegistrationData({...registrationData, email: e.target.value})} required/>
          <input type="password" placeholder="Придумайте пароль"
                 onChange={e => setRegistrationData({...registrationData, password: e.target.value})}
                 required/>
          <input type="password" placeholder="Подтвердите пароль"
                 onChange={e => setSecondPassword(e.target.value)}
                 required/>


          <div className={styles.loginMessage}>
            {error.error && errorContent()}
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
