import RequestService from "../helpers/requests";
import {baseUrl} from '../constants/urls';
import {IFile} from "../common/types";
import Resizer from "react-image-file-resizer";

const resizeFile = (file: any) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			1500,
			1500,
			"JPEG",
			70,
			0,
			(uri) => {
				resolve(uri);
			},
			"blob"
		);
	});

export const getFilesByTree = (files: (string | number)[]): Promise<IFile[]> => {
	return Promise.all(files.map((file: number | string) => {
		return RequestService.getData(`${baseUrl}file/${file}`)
	}));
}

export const uploadFilesByTree = (id: string | number, files: File[]): Promise<(string | number)[]> => {
	return Promise.all(files.map(async file => {
		const formData = new FormData();
		const compressedFile = await resizeFile(file)
		formData.append("file", compressedFile as Blob);

		return RequestService.postData(`${baseUrl}tree/attachFile/${id}`, formData);
	}));
};

export const uploadFiles = (files: (string | Blob)[]) => {
	return Promise.all(files.map(async file => {
		const formData = new FormData();
		const compressedFile = await resizeFile(file)
		formData.append("file", compressedFile as Blob);

		return RequestService.postData(`${baseUrl}file/upload`, formData);
	}))
};


export const getFilesByIds = (filesIds: (string | number)[]): Promise<IFile[]> => {
	return Promise.all(filesIds.map((id: string | number) => {
		return RequestService.getData(`${baseUrl}file/${id}`)
	}));
}

export const deleteFile = (fileId: number | string) => {
	return RequestService.deleteData(`${baseUrl}file/${fileId}`);
}

export const deleteFiles = (filesIds: (number | string)[]) => {
	return Promise.all(filesIds.map((filesId: number | string) => {
		return deleteFile(filesId);
	}));
}
