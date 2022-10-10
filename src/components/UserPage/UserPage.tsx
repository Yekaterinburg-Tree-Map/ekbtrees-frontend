import React, { Component } from 'react';
import PageHeader from "../PageHeader";
import {PAGES} from '../../constants/pages';
import ListWidget from '../ListWidget';
import {RouteComponentProps} from 'react-router-dom';
import {StaticContext} from "react-router";
import {getTreesByUser} from '../../api/trees';
import {getUser} from '../../api/user';
import TreeLists from '../TreeLists';
import styles from './UserPage.module.css';
import { IRestUser } from '../../common/types';
import {IUserState} from './types';
import Spinner from "../Spinner";

interface LocationState {
    search: Object
}

export default class UserPage extends Component<RouteComponentProps<{id: string}, StaticContext, LocationState>, IUserState> {
    constructor (props: RouteComponentProps<{id: string}, StaticContext, LocationState>) {
        super(props);

        this.state = {
            loading: true,
            user: null
        }
    }

    componentDidMount() {
		getUser(this.props.match.params.id)
			.then((user: IRestUser) => {
				this.setState({
					user,
					loading: false
				})
			})
			.catch(error => {
				console.error(error, 'Ошибка!');

				this.setState({
					loading: false,
				})
			})
	}

    renderRows (user: IRestUser) {
		const result: JSX.Element[] = [];

        const table = [
            {title: 'Фамилия', value: user.lastName},
            {title: 'Имя', value: user.firstName},
            {title: 'Email', value: user.email},
            {title: 'Телефон', value: user.phone},
            // {title: 'Роли', value: user.roles}
        ]
		
        table.forEach((row, index) => {
            if (row.value) {
				result.push(
					<div key={index} className={styles.row}>
						<div className={styles.col}>
							{row.title}
						</div>
						<div className={styles.col}>
							{row.value}
						</div>
					</div>
				)
			}
		});

		return result;
	}

    renderUserInfo() {
        const { loading } = this.state;

		if (loading) {
			return <Spinner />;
		}
        
        const {user} = this.state;
        
        if (user) {
            return (
                <div className={styles.wrapper}>
                    <h3 className={styles.title}>Основная информация</h3>
                        <div className={styles.tbody}>
                        {this.renderRows(user)}
                    </div>
                </div>
            );
        } else {
            return (
				<h3 className={styles.title}>Пользователь не найден</h3>
			)
        }
    }

    renderTrees () {
        if (this.state.user) {
            return (
                <ListWidget
                    getObjects={getTreesByUser(this.props.match.params.id)}
                    search={this.props.location.search}
                    history={this.props.history}
                    renderTable={trees => <TreeLists trees={trees} />}
                />
            );
        }
    }

    render() {
        return (
            <>
                <PageHeader title={PAGES.user} />
                 <div className={styles.container}>
                    {this.renderUserInfo()}
                    {this.renderTrees()}
                </div>
            </>
        )
    }
}