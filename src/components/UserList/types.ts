import * as H from "history";
import {IJsonTreeWithImage, IUser2} from "../../common/types";

export interface ITreeListsTreeTable {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roles: string;
}


export interface ITreeListsProps {
    users: IUser2[];
}

export interface ITreeListsState {
}
