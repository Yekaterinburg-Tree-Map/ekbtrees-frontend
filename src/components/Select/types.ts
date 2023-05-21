import {ChangeEvent, ReactNode} from "react";


export interface ISelectProps {
    id: string;
    onChange: (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child?: ReactNode) => void;
    onOpen: (event: ChangeEvent<{}>) => void;
    required?: boolean;
    multiple?: boolean;
    selectedValues: Array<string | number>;
    options: Array<ISelectOption>;
    title: string;
    loading: boolean;
}

export interface ISelectState { }

export interface ISelectOption {
    id: string | number;
    title: string;
}