import React, { Component } from 'react';
import { getAllTrees } from '../../api/trees';
import {LocationState} from "./types";
import PageHeader from "../PageHeader";
import {PAGES} from '../../constants/pages';
import {RouteComponentProps} from 'react-router-dom';
import {StaticContext} from "react-router";
import ListWidget from '../ListWidget'
import TreeLists from '../TreeLists';
import styles from './AllTreeListsPage.module.css';

export default class AllTreeListsPage extends Component<RouteComponentProps<{}, StaticContext, LocationState>, {}> {
    render() {
        return (
            <>
                <PageHeader title={PAGES.allTrees} />
                <div className={styles.container}>
                    <ListWidget
                        getObjects={getAllTrees}
                        search={this.props.location.search}
                        history={this.props.history}
                        renderTable={trees => <TreeLists trees={trees} />}
                    />
                </div>
            </>
        );
    }
}

