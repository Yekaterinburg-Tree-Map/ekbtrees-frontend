import React, { Component } from 'react';
import PageHeader from "../PageHeader";
import {PAGES} from '../../constants/pages';
import ListWidget from '../ListWidget';
import {RouteComponentProps} from 'react-router-dom';
import {StaticContext} from "react-router";
import {getUsers} from '../../api/users';

interface LocationState {
    search: Object
}

export default class UserListPage extends Component<RouteComponentProps<{}, StaticContext, LocationState>> {
    initPage: number;

    constructor(props: RouteComponentProps<{}, StaticContext, LocationState>) {
        super(props);

        this.initPage = Number(new URLSearchParams(this.props.location.search).get('page') || 1) - 1
    }

    render() {
        return (
            <>
                <PageHeader title={PAGES.allTrees} />
                <ListWidget
                    getObjects={getUsers}
                    initPage={this.initPage}
                    history={this.props.history}
                    renderTable={trees => null}
                />
            </>
        )
    }
}
