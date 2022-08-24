import RequestService from "../helpers/requests";
import {baseUrl} from '../constants/urls';
import {IUser2} from "../common/types";

export const getUsers: (page: number, size: number) => Promise<IUser2[]> = (page: number, size: number) => {
	return RequestService.getData(`${baseUrl}user/getAll/${page}/${size}`, {
		'Content-Type': 'application/json'
	});
}