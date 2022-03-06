import React from "react";
import { Button } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'

const StyledButton = withStyles({
    root: {
        fontFamily: "Arial",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "44px",
        padding: "0 25px",
        boxSizing: "border-box",
        borderRadius: 0,
        background: "#e30217",
        color: "#fff",
        transform: "none",
        // boxShadow: "6px 6px 0 0 #c7d8ed",
        transition: "background .3s,border-color .3s,color .3s",
        "&:hover": {
            backgroundColor: "#e30217"
        },
    },
    label: {
        textTransform: 'capitalize',
    }
})(Button);

function CustomBtn(props) {
    return (
        <StyledButton variant="contained">Import from Excel</StyledButton>
    )
}

export default CustomBtn