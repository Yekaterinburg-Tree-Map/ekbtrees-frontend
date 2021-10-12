import RequestService from "../../helpers/requests";
import {baseUrl} from '../ApiDataLoadHelper/DataLoadHelper'
import {IFile, IJsonTree, ITreePropertyValue} from "../../common/types";


export const getTree = (id: string | number): Promise<IJsonTree> => {
	return RequestService.getData(`${baseUrl}tree/get/${id}`);
}

export const getFilesByTree = (files: (string | number)[]): Promise<IFile[]> => {
	return Promise.all(files.map((file: number | string) => {
		return RequestService.getData(`${baseUrl}file/${file}`)
	}));
}

export const uploadFilesByTree = (id: string | number, files: File[]): Promise<(string | number)[]> => {
	return Promise.all(files.map((file: File) => {
		const formData = new FormData();
		formData.append("file", file);

		return RequestService.postData(`${baseUrl}tree/attachFile/${id}`, formData);
	}))
};

export const getFilesByIds = (filesIds: (string | number)[]): Promise<IFile[]> => {
	return Promise.all(filesIds.map((id: string | number) => {
		return RequestService.getData(`${baseUrl}file/${id}`)
	}));
}

export const getTypesOfTrees = (): Promise<ITreePropertyValue[]> => {
	return RequestService.getData(`${baseUrl}species/get-all`)
}


export const editTree = (body: IJsonTree) => {
	return RequestService.postData(`${baseUrl}tree/save`, JSON.stringify(body), {
		'Content-Type': 'application/json'
	})
}
