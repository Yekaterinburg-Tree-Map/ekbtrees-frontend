import {IFile, IGeographicalPoint, IMapPosition, ITreeModelConverted, IUser} from "../../common/types";

export interface LocationState {
    prevPosition: IGeographicalPoint
}

export interface ITreeProps {
    setMapViewPosition: (position: IMapPosition) => void;
    user: IUser | null;
}

export interface ITreeState {
    tree: ITreeModelConverted | null;
    loading: boolean;
    files: IFile[];
    images: IFile[];
    loadingFiles: boolean;
    showModal: boolean;
    modalTitle: string;
    handleClick: undefined | (() => void);
}
