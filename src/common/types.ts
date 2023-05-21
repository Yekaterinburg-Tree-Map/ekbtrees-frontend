
export interface IFile {
    id: number;
    title: string;
    mimeType: string;
    size?: number,
    uri: string;
    treeId?: 0;
}

export type FileGroupType = "files" | "images";


export interface IUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: Array<string>;
}

export interface IRestUser {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    roles: Array<string>;
}

export interface ICookieAccess {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    roles: string[];
}

export interface ILogingFormUser {
    email: string | null;
    password: string | null;
}


export interface ITreePropertyValue {
    id: string | number;
    title: string;
}

export type TreePropertyValue = string | number | Array<string | number> | undefined;

export interface ITreeProperty<T> {
    title?: string;
    value?: T;
    values?: ITreePropertyValue[];
    type?: 'string' | 'number';
    parse?: any;
    loading?: boolean;
    disabled?: boolean;
    validate?: (val: T | undefined) => string | null;
    required?: boolean;
    multiple?: boolean;
}

export interface INewTree {
    latitude: ITreeProperty<string | number | undefined>;
    longitude: ITreeProperty<string | number | undefined>;
    age: ITreeProperty<string | number | undefined>;
    diameterOfCrown: ITreeProperty<string | number | undefined>;
    heightOfTheFirstBranch: ITreeProperty<string | number | undefined>;
    numberOfTreeTrunks: ITreeProperty<string | number | undefined>;
    treeHeight: ITreeProperty<string | number | undefined>;
    speciesId: ITreeProperty<string | number | undefined>;
    status: ITreeProperty<string | number | undefined>;
    treePlantingType: ITreeProperty<string | number | undefined>;
    trunkGirth: ITreeProperty<string | number | undefined>;
    fileIds: number[];
    pruning: ITreeProperty<string | number | undefined>; 
    rootCondition: ITreeProperty<string | number | undefined>; 
    trunkStates: ITreeProperty<Array<string | number> | undefined>; 
    branchStates: ITreeProperty<Array<string | number> | undefined>; 
    corticalStates: ITreeProperty<Array<string | number> | undefined>; 
}

export interface IEditedTree {
    id?: number;
    geographicalPoint?: IGeographicalPoint;
    species?: ITreeProperty<string | number | undefined>;
    treeHeight?: ITreeProperty<string | number | undefined>;
    numberOfTreeTrunks?: ITreeProperty<string | number | undefined>;
    trunkGirth?: ITreeProperty<string | number | undefined>;
    diameterOfCrown?: ITreeProperty<string | number | undefined>;
    heightOfTheFirstBranch?: ITreeProperty<string | number | undefined>;
    age?: ITreeProperty<string | number | undefined>;
    treePlantingType?: ITreeProperty<string | number | undefined>;
    created?: ITreeProperty<string | number | undefined>;
    updated?: ITreeProperty<string | number | undefined>;
    authorId?: ITreeProperty<string | number | undefined>;
    status?: ITreeProperty<string | number | undefined>;
    fileIds?: (string | number)[];
    pruning?: ITreeProperty<string | number | undefined>;
    rootCondition?: ITreeProperty<string | number | undefined>; 
    trunkStates?: ITreeProperty<Array<string | number> | undefined>; 
    branchStates?: ITreeProperty<Array<string | number> | undefined>; 
    corticalStates?: ITreeProperty<Array<string | number> | undefined>; 
}



export interface IGeographicalPoint {
    latitude: number | null;
    longitude: number | null;
}


export interface ITreePropertyConverted {
    title: string;
    value: string | number | boolean| null;
}

export interface ITreeModelConverted {
    id: number;
    created: ITreePropertyConverted;
    updated: ITreePropertyConverted;
    species: ITreePropertyConverted;
    latitude: ITreePropertyConverted;
    longitude: ITreePropertyConverted;
    age: ITreePropertyConverted;
    diameterOfCrown: ITreePropertyConverted;
    heightOfTheFirstBranch: ITreePropertyConverted;
    numberOfTreeTrunks: ITreePropertyConverted;
    treeHeight: ITreePropertyConverted;
    // speciesId: TreePropertyConverted;
    status: ITreePropertyConverted;
    treePlantingType: ITreePropertyConverted;
    trunkGirth: ITreePropertyConverted;
    pruning: ITreePropertyConverted;
    rootCondition: ITreePropertyConverted;
    trunkStates: ITreePropertyConverted;
    branchStates: ITreePropertyConverted;
    corticalStates: ITreePropertyConverted;
}

export type ResourceAction = "uploadingFiles" | "uploadingImages";

export interface ITreeScpecies {
    id: number,
    title: string
}

export interface IJsonTree {
    id?: number;
    geographicalPoint?: IGeographicalPoint;
    species?: ITreePropertyValue;
    treeHeight?: number;
    numberOfTreeTrunks?: number;
    trunkGirth?: number;
    diameterOfCrown?: number;
    heightOfTheFirstBranch?: number;
    age?: number;
    treePlantingType?: string;
    created?: number;
    updated?: number;
    authorId?: string;
    status?: string;
    fileIds?: number[];
    editable?: boolean;
    deletable?: boolean;
    approvedByModerator?: boolean;
    pruning?: string; 
    rootCondition?: string; 
    trunkStates?: Array<string>; 
    branchStates?: Array<string>; 
    corticalStates?: Array<string>;
}


export interface IPostJsonTree {
    id?: number;
    geographicalPoint?: IGeographicalPoint;
    speciesId?: number;
    treeHeight?: number;
    numberOfTreeTrunks?: number;
    trunkGirth?: number;
    diameterOfCrown?: number;
    heightOfTheFirstBranch?: number;
    conditionAssessment?: any;
    age?: number;
    treePlantingType?: string;
    created?: number | string;
    updated?: number | string;
    authorId?: string;
    status?: string;
    fileIds?: number[];
    pruning?: string; 
    rootCondition?: string; 
    trunkStates?: Array<string>; 
    branchStates?: Array<string>; 
    corticalStates?: Array<string>;
}

export interface IJsonTreeWithImage extends  IJsonTree {
    image: string;
}


export type SimpleMathesSelectors =  'matches' | 'msMatchesSelector';

export interface IMapPosition {
    lat: number;
    lng: number;
    marker?: boolean;
}
