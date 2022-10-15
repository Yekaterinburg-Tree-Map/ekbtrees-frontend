import {IRestUser} from "../../common/types";

export interface ITreeListsTreeTable {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    roles: string;
}


export interface ITreeListsProps {
    users: IRestUser[];
}

export interface ITreeListsState {
}
