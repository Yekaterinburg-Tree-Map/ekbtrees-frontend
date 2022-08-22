import RequestService from "../helpers/requests";
import {baseUrl} from '../constants/urls';
import {ITreePropertyValue} from "../common/types";

export const getTypesOfTrees = (): Promise<ITreePropertyValue[]> => {
	return RequestService.getData(`${baseUrl}species/get-all`)
}
