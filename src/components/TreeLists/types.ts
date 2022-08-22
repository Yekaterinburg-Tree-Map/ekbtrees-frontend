import * as H from "history";
import {IJsonTreeWithImage, IUser} from "../../common/types";

export interface ITreeListsTreeTable {
    age: string;
    creationDate: string;
    height: string;
    image: string;
    species: string;
}

export interface ITreeListsStateLocale {
    treeTable: ITreeListsTreeTable;
}

export interface ITreeListsProps {
    trees: IJsonTreeWithImage[];
}

export interface ITreeListsState {
}
