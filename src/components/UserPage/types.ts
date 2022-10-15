import { IRestUser } from "../../common/types";

export interface IUserState {
    loading: boolean;
    user: IRestUser | null
}
