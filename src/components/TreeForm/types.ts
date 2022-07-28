import {IJsonTree, IUser} from "../../common/types";

export interface ITreeFormProps {
    activeTree: IJsonTree;
    onClose: () => void;
    changeState: (state: number) => void;
    user: IUser | null;
}
