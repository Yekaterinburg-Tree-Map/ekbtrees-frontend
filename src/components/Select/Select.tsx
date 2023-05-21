import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import React, {ChangeEvent, ReactNode, useState} from "react";
import {makeStyles} from '@material-ui/core/styles';
import UISelect from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Spinner from "../Spinner/Spinner";
import {ISelectProps, ISelectOption} from "./types";

const useStyles = makeStyles(() => ({
    root: {
        width: '100%',
        '& .MuiFormControl-root': {
            width: '100%',
        },
    },
    label: {
        backgroundColor: "white"
    }
}));

export const Select = (props: ISelectProps) => {
    const {id, loading, onChange, onOpen, options, required, multiple, selectedValues, title} = props;
    const styles = useStyles();
    const [selected, setSelected] = useState<boolean>(false);

    const handleChange = (event: ChangeEvent<{ name?: string | undefined; value: unknown; }>, child?: ReactNode) => {
        setSelected(true);
        onChange(event, child);
    }

    const renderOptions = (options: ISelectOption[]) => {
        if (loading) {
            return <MenuItem disabled>
                <Spinner/>
            </MenuItem>;
        }

        return options.map(value => <MenuItem value={value.id} key={value.id}>{value.title}</MenuItem>);
    }

    const value = multiple ? selectedValues : selectedValues[0];

    return (
        <div className={styles.root}>
            <FormControl  required={required} error={required && !selected} size={"small"}>
                <InputLabel className={styles.label} id={`label-for-select-${title}`} variant="outlined" htmlFor={id}>{title}</InputLabel>
                <UISelect
                    labelId={`label-for-select-${title}`}
                    onOpen={onOpen}
                    native={false}
                    onChange={handleChange}
                    variant="outlined"
                    MenuProps={{style:{
                        maxHeight:"400px"}  // Если не ограничивать, список слишком большой
                    }}
                    inputProps={{
                        name: title,
                        id,
                    }}
                    value={value}
                    multiple={multiple}
                >
                    {renderOptions(options)}
                </UISelect>
            </FormControl>
        </div>
    )
}

export default Select;
