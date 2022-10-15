import React, { Component } from 'react';
import PageHeader from "../PageHeader";
import {PAGES} from '../../constants/pages';
import ListWidget from '../ListWidget';
import {RouteComponentProps} from 'react-router-dom';
import {StaticContext} from "react-router";
import {getUsers} from '../../api/users';
import UserList from '../UserList';
import styles from './UserListPage.module.css';

interface LocationState {
    search: Object
}

export default class UserListPage extends Component<RouteComponentProps<{}, StaticContext, LocationState>> {
    render() {
        return (
            <>
                <PageHeader title={PAGES.users} />
                <div className={styles.container}>
                    <ListWidget
                        getObjects={getUsers}
                        search={this.props.location.search}
                        history={this.props.history}
                        renderTable={users => <UserList users={users} />}
                    />
                </div>
            </>
        )
    }
}
