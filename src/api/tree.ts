import RequestService from "../helpers/requests";
import {baseUrl} from '../constants/urls';
import {IPostJsonTree, IJsonTree} from "../common/types";


export const getTree = (id: string | number): Promise<IJsonTree> => {
	return RequestService.getData(`${baseUrl}tree/get/${id}`);
}

export const deleteTree = (id: string | number): Promise<any> => {
	return RequestService.deleteData(`${baseUrl}tree/delete/${id}`);
}

export const editTree = (body: IJsonTree | IPostJsonTree) => {
	return RequestService.putData(`${baseUrl}tree/${body.id}`, JSON.stringify(body), {
		'Content-Type': 'application/json'
	})
}

export const addTree = (body: {geographicalPoint: {latitude: number | null, longitude: number | null}}) => {
	return RequestService.postData(`${baseUrl}tree`, JSON.stringify(body), {
		'Content-Type': 'application/json'
	})
}

export const addComment = (body: { text: string, treeId: number }) => {
  return RequestService.postData(`${baseUrl}comment`, JSON.stringify(body), {
    'Content-Type': 'application/json'
  })
}

export const getCommentsTrees = ( treeId: number) => {
  return RequestService.getData(`${baseUrl}comment/by-tree/${treeId}`);
}

export const approveTree = (id: string | number) => {
    return RequestService.postData(`${baseUrl}tree/approve/${id}`, null);
}
