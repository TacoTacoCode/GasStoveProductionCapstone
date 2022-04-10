import React, { useState, useEffect } from "react";
import "../../styles/Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
    Button,
    MenuItem,
    TextField,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import { ImportExcelButton } from "../button/ImportExcelButton";
import { useNavigate } from "react-router-dom";

const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
        color: "black",
    },
    "& .MuiInput-underline:after": {
        borderBottomColor: "#e30217",
    },
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            borderColor: "black",
        },
        "&:hover fieldset": {
            borderColor: "#e30217",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#e30217",
        },
    },
});

function DivideProcessPopup(props) {
    const [numberOfProcess, setNumberOfProcess] = useState('');
    const navigate = useNavigate();
    return props.trigger ? (
        <div className="componentpopup">
            <div className="popup-inner1">
                <div>
                    <button className="close-btn" onClick={() => props.setTrigger(false)}>
                        <CloseIcon style={{ color: "white" }} />
                    </button>
                </div>
                {props.children}
                <div className="popup-body">
                    <div className="formDivide">
                        <form className="form1">
                            <CssTextField className="divideField" label="Number of sub-process(s)"
                                onChange={(e) => setNumberOfProcess(e.target.value)} />
                            <ImportExcelButton type="button" className="btnDivide" onClick={() => {
                                var splitArray = numberOfProcess.split(',').map((e) =>
                                    parseInt(e.trim()))
                                navigate('/divideProcessTabs', { state: splitArray})
                            }
                            }>Submit</ImportExcelButton>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    ) : (
        ""
    );
}

export default DivideProcessPopup;
