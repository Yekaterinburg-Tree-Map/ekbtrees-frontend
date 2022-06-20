import {IJsonTree} from "../../common/types";


export interface ITreeFormProps {
    activeTree: IJsonTree;
    onClose: () => void;
    changeState: (state: number) => void;
}

export interface ITreeFormState { }
