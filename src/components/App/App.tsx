import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import Cookies from 'universal-cookie';
import Main from '../Main';
import Header from '../Header';
import { ICookieAccess, IUser } from '../../common/types';
import { IAppProps, IAppState } from './types';
import RequestService from "../../helpers/requests";
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Footer from '../Footer';
import styles from './App.module.css';
import {Toaster} from "react-hot-toast";

const cookies = new Cookies();

class App extends Component<IAppProps & RouteComponentProps, IAppState> {
    constructor(props: IAppProps & RouteComponentProps) {
        super(props);

        this.state = {
            user: this.getUser(),
            theme: "light",
        }
    }

    componentDidMount() {
        cookies.addChangeListener(this.handleCookie);

        const theme = localStorage.getItem("theme");

        if (theme) {
            this.setState({ theme: theme });
        }
    }

    clearUserAndRedirect = () => {
        this.setState({
            user: null
        });

        this.props.history.push("/");
    }

    removeCookie = () => {
        RequestService.postData('/auth/logout', null).then(() => {
            this.clearUserAndRedirect();
        }).catch(() => {
            console.log("error while logout");
            this.clearUserAndRedirect();
        });
    }

    getUser = (): IUser | null => {
        const cookieAccess = cookies.get('AccessToken');

        if (cookieAccess) {
            const decodedCookie: ICookieAccess = jwt_decode(cookieAccess);
            const { id, email, firstName, lastName, roles } = decodedCookie;

            return {
                id: id,
                email: email,
                firstName: firstName,
                lastName: lastName,
                roles: roles
            };
        }

        return null;
    }

    handleCookie = () => {
        this.setState({
            user: this.getUser()
        })
    }

    switchTheme = () => {
        const newTheme = this.state.theme === "light" ? "dark" : "light";
        this.setState({ theme: newTheme });
        window.localStorage.setItem("theme", newTheme);
    }

    render() {
        const { user } = this.state;

        return (
            <>
                <div className={styles.wrapper} data-theme={this.state.theme}>
                    <Header user={user} onCookieRemove={this.removeCookie} switchTheme={this.switchTheme} theme={this.state.theme} />
                    <Main user={user} onCookie={this.handleCookie} theme={this.state.theme} />
                    <Footer theme={this.state.theme} />
                    <Toaster/>
                </div>
            </>
        )
    }
}

export default withRouter(App);
