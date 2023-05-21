import {ITreeProperty, IUser} from "../../common/types";

// Maybe it would be better to use TextField instead of inputs
export interface IEditUserInfo {
    firstName: ITreeProperty<string| undefined>;
    lastName: ITreeProperty<string | undefined>;
    email: ITreeProperty<string | undefined>;
    phone: ITreeProperty<string | undefined>;
}

export interface IUserInfo {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface IProfileSettingsProps {
    user: IUser | null;
    updateUserByCookies: () => void;
}

export interface IProfileSettingsState {
    requiredFields: (keyof IUserInfo)[];
    userInfo: IUserInfo;
    editUserInfo: IEditUserInfo | null;
    newPassword: string | null;
    modalShow: boolean;
}
