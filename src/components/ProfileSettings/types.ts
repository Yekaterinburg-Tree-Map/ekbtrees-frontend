import {ITreeProperty, IUser, IUserInfo} from "../../common/types";

// Maybe it would be better to use TextField instead of inputs
export interface IEditUserInfo {
    firstName: ITreeProperty;
    lastName: ITreeProperty;
    email: ITreeProperty;
    phone: ITreeProperty;
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
