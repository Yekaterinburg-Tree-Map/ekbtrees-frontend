import React, { Component } from 'react';
import styles from './ListWidget.module.css';
import cn from 'classnames';
import Spinner from "../Spinner/Spinner";
import {IListsProps, IListsState} from "./types";

const OBJECT_COUNT_PER_PAGE = 10;

export default class ListWidget<T> extends Component<IListsProps<T>, IListsState<T>> {
    constructor(props: IListsProps<T>) {
        super(props);

        const initPage = Number(new URLSearchParams(this.props.search).get('page') || 1) - 1

        this.state = {
            currentPage: initPage,
            objects: [],
            loading: true,
            existNextPage: false
        };
    }

    componentDidMount() {
        this.getObjects();
    }

    getObjects = () => {
        this.props.getObjects(this.state.currentPage, OBJECT_COUNT_PER_PAGE + 1)
            .then(data => {
                const objects = data.slice(0, OBJECT_COUNT_PER_PAGE);
                const existNextPage = data.length === OBJECT_COUNT_PER_PAGE + 1;

                this.setState({ objects, loading: false, existNextPage })
            })
            .catch(error => {
                this.setState({loading: false});
                console.error('Произошла ошибка при получении деревьев!', error);
            })
    }

    handleToPrevPage: React.MouseEventHandler<HTMLButtonElement> = () => {
        this.setState(state => ({
            currentPage: state.currentPage - 1,
            loading: true,
            objects: []
        }), () => {
            const params = new URLSearchParams(this.props.search);

            if (this.state.currentPage === 0) {
                params.delete('page');
            } else {
                params.set('page', `${this.state.currentPage + 1}`);
            }

            this.props.history.push({search: params.toString()});

            this.getObjects();
        });
    }

    handleToNextPage: React.MouseEventHandler<HTMLButtonElement> = () => {
        this.setState(state => ({
            currentPage: state.currentPage + 1,
            loading: true,
            objects: []
        }), () => {
            const params = new URLSearchParams(this.props.search);
            params.set('page', `${this.state.currentPage + 1}`);
            this.props.history.push({search: params.toString()});
            this.getObjects();
        });
    }

    renderBody() {
        const { loading } = this.state;

        return (
            <>
                {!loading && this.props.renderTable(this.state.objects)}
                {loading &&
                    <div className={styles.spinner}>
                        <Spinner />
                    </div>
                }
            </>
        );
    }

    renderNavigation = () => {
        if (!this.state.loading) {
            const prevPageDisabled = this.state.currentPage === 0;
            const nextPageDisabled = !this.state.existNextPage;

            const prevPageCN = cn({
                [styles.prevPage]: true,
                [styles.disabled]: prevPageDisabled
            });

            const nextPageCN = cn({
                [styles.nextPage]: true,
                [styles.disabled]: nextPageDisabled
            });

            if (!prevPageDisabled || !nextPageDisabled) {
                return (
                    <div className={styles.navigation}>
                        <button onClick={this.handleToPrevPage} className={prevPageCN} disabled={prevPageDisabled}>Назад</button>
                        <button onClick={this.handleToNextPage} className={nextPageCN} disabled={nextPageDisabled}>Вперед</button>
                    </div>
                );
            }
        }
    }

    render() {
        return (
            <>
                {this.renderBody()}
                {this.renderNavigation()}
            </>
        );
    }
}
