import * as H from "history";
import {IUser} from "../../common/types";
import {ReactNode} from 'react';

export interface LocationState {
    search: Object
}

export interface IListsProps<T> {
    history: H.History;
    search: string;
    getObjects: (page: number, size: number) => Promise<T[]>
    renderTable: (objects: T[]) => ReactNode
}

export interface IListsState<T> {
    currentPage: number;
    objects: T[];
    loading: boolean;
    existNextPage: boolean
}
