import React, { Component } from 'react';
import { getMyTrees } from '../../api/trees';
import {LocationState} from "./types";
import PageHeader from "../PageHeader";
import {PAGES} from '../../constants/pages';
import {StaticContext} from "react-router";
import ListWidget from '../ListWidget';
import {RouteComponentProps} from 'react-router-dom';
import TreeLists from '../TreeLists';

export default class TreeListPage extends Component<RouteComponentProps<{}, StaticContext, LocationState>, {}> {
    initPage: number;

    constructor(props: RouteComponentProps<{}, StaticContext, LocationState>) {
        super(props);

        this.initPage = Number(new URLSearchParams(this.props.location.search).get('page') || 1) - 1
    }

    render() {
        return (
            <>
                <PageHeader title={PAGES.myTrees} />
                <ListWidget
                    getObjects={getMyTrees}
                    initPage={this.initPage}
                    history={this.props.history}
                    renderTable={trees => <TreeLists trees={trees} />}
                />
            </>
        );
    }
}
