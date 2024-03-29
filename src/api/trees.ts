import RequestService from "../helpers/requests";
import {baseUrl} from '../constants/urls';
import {IJsonTreeWithImage} from "../common/types";

export const getMyTrees: (page: number, size: number) => Promise<IJsonTreeWithImage[]> = (page: number, size: number) => {
	return RequestService.getData(`${baseUrl}tree/get/${page}/${size}`, {
		'Content-Type': 'application/json'
	});
}

export const getAllTrees: (page: number, size: number) => Promise<IJsonTreeWithImage[]> = (page: number, size: number) => {
	return RequestService.getData(`${baseUrl}tree/getAll/${page}/${size}`, {
		'Content-Type': 'application/json'
	});
}

export const getTreesByUser: (userId: string) => (page: number, size: number) => Promise<IJsonTreeWithImage[]> = (userId: string) => (page: number, size: number) => {
	return RequestService.getData(`${baseUrl}tree/getAllByAuthorId/${userId}/${page}/${size}`, {
		'Content-Type': 'application/json'
	});
}