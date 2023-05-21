import {ChangeEventHandler} from "react";
import {ITreeProperty} from "../../common/types";


export interface ITextFieldProps {
    id: string;
    item: ITreeProperty<string | number | undefined> | ITreeProperty<Array<string | number> | undefined>;
    onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
    errorMessage?: string | null;
}

export interface ITextFieldState { }
