import React, { useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    }
}));

const FormMenu = (props) => {
    const classes = useStyles();
    const { sumaryItem, aValue, handleFunc } = props;
    return (
        <FormControl className={classes.formControl}>
            <InputLabel
                id="demo-simple-select-label"
                shrink
            >
                Choose Task
            </InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={aValue ?? ''}
                onChange={(e) => {
                    handleFunc(e.target.value)
                }}
            >
                {sumaryItem.map((e) => (
                    <MenuItem
                        value={e.processDetailId}
                        key={e.processDetailId}
                    >
                        {e.processDetailId}
                    </MenuItem>))}
            </Select>
        </FormControl>
    );
};

export default FormMenu;
