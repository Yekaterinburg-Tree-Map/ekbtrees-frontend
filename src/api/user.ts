import RequestService from "../helpers/requests";
import {baseUrl} from '../constants/urls'
import {IRestUser} from "../common/types";

export const getUser = (userId: string | number): Promise<IRestUser> => {
    return RequestService.getData(`${baseUrl}user/${userId}`);
}

export const updateUser = (userId: number | string, userInfo: Partial<IRestUser>): Promise<boolean> => {
    const headers = {"Content-Type": "application/json; charset=utf8"};

    return RequestService.putData(`${baseUrl}user/${userId}`, JSON.stringify(userInfo), headers);
}

export const updateUserPassword = (newPassword: string): Promise<boolean> => {
    return Promise.resolve(true); // TODO: Remove when method works

    const data = {
        newPassword: newPassword
    };

    const headers = {["Content-Type"]: "application/json; charset=utf8"};

    return RequestService.putData(`${baseUrl}user/updatePassword`, JSON.stringify(data), headers);
}