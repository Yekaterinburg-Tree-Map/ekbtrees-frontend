import React from "react";
import {IUser} from "../../common/types";

export interface IHeaderProps {
    user: IUser | null;
    onCookieRemove?: React.MouseEventHandler<HTMLElement>;
    theme: string;
}

export interface IHeaderState { }
