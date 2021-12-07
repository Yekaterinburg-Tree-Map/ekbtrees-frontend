import RequestService from "../helpers/requests";
import {IJsonTreeWithImage} from "../common/types";

export const getMyTrees: () => Promise<IJsonTreeWithImage[]> = async () => {
	return await RequestService.getData('https://ekb-trees-help.ru/api/tree/get', {
		'Content-Type': 'application/json'
	});
}