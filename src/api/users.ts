import RequestService from "../helpers/requests";
import {baseUrl} from '../constants/urls';
import {IUser} from "../common/types";

export const getUsers: (page: number, size: number) => Promise<IUser[]> = (page: number, size: number) => {
	return RequestService.getData(`${baseUrl}user/getAll/${page}/${size}`, {
		'Content-Type': 'application/json'
	});
}