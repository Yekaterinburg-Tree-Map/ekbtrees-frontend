import React, { Component } from 'react';
import { getAllTrees } from '../../api/trees';
import {LocationState} from "./types";
import PageHeader from "../PageHeader";
import {PAGES} from '../../constants/pages';
import {RouteComponentProps} from 'react-router-dom';
import {StaticContext} from "react-router";
import ListWidget from '../ListWidget'
import TreeLists from '../TreeLists';

export default class AllTreeListsPage extends Component<RouteComponentProps<{}, StaticContext, LocationState>, {}> {
    render() {
        return (
            <>
                <PageHeader title={PAGES.allTrees} />
                <ListWidget
                    getObjects={getAllTrees}
                    search={this.props.location.search}
                    history={this.props.history}
                    renderTable={trees => <TreeLists trees={trees} />}
                />
            </>
        );
    }
}

