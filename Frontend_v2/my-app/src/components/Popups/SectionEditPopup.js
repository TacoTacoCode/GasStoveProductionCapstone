import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import "../../styles/Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
import MaterialTable from "material-table";
import {
  Button,
  InputAdornment,
  makeStyles,
  MenuItem,
  TextField,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import swal from "sweetalert";

const states = [
  {
    value: true,
    label: "Assembled",
  },
  {
    value: false,
    label: "Not Assembled Yet",
  },
];

const statuses = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Unactive",
    label: "Unactive",
  },
];

const CssTextField = styled(TextField)({
  width: "100%",
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

function SectionEditPopup(props) {
  const [sectionLeaderId, setSectionLeaderId] = useState(props.data.sectionLeadId);
  const [componentId, setComponentId] = useState(props.data.componentId);
  const [isAssemble, setIsAssemble] = useState(props.data.isAssemble);
  const [status, setStatus] = useState(props.data.status);

  const [listComponentActive, setComponentList] = useState([]);
  const [listAccountActive, setAccountList] = useState([]);

  useEffect(() => {
    setSectionLeaderId(props.data.sectionLeadId);
  }, [props.data.sectionLeadId])

  useEffect(() => {
    setComponentId(props.data.componentId);
  }, [props.data.componentId])

  useEffect(() => {
    setIsAssemble(props.data.isAssemble);
  }, [props.data.isAssemble])

  useEffect(() => {
    setStatus(props.data.status);
  }, [props.data.status])

  useEffect(() => {
    axios.get("https://localhost:5001/getCompoNoSection").then((res) => {
      setComponentList(res.data);
    });
    axios.get("https://localhost:5001/getSecAccountsNoCompo").then((res) => {
      setAccountList(res.data);
    });
  }, []);

  const changeData = (e) => {
    e.preventDefault();
    const jsonObj = {
      sectionId: props.data.sectionId,
      sectionLeadId: sectionLeaderId,
      componentId,
      workerAmount: props.data.workerAmount,
      isAssemble,
      status
    };
    axios
      .put("https://localhost:5001/updateSection", jsonObj)
      .then((res) => {
        swal("Success", "Update section successfully", "success", {
          button: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        swal("Error", "Update section failed", "error", {
          button: false,
          timer: 2000,
        })
      }).finally(() => {
        handleCancelClick();
        delay(function () { window.location.reload(); }, 1000);
      })
  };

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleCancelClick = () => {
    setSectionLeaderId(props.data.sectionLeadId);
    setComponentId(props.data.componentId);
    setIsAssemble(props.data.isAssemble);
    handleClose();
  };

  return props.IsOpen ? (
    <div className="componentpopup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setOpen(false)}>
            <CloseIcon style={{ color: "white" }} />
          </button>
        </div>
        {props.children}
        <div className="popup-body" style={{ maxHeight: '600px', overflow: 'auto', overflowY: 'scroll' }}>
          <br />
          <text className="content_choose">Section : </text>
          <br />
          <br />
          <form>
            <div className="idname_section">
              {/* <div className="datefield"> */}
              <CssTextField
                label="Section Leader"
                select
                id="fullWidth"
                required
                value={sectionLeaderId}
                onChange={(e) => setSectionLeaderId(e.target.value)}
              >
                {listAccountActive.map((leader) => (
                  <MenuItem key={leader.accountId} value={leader.accountId}>
                    {leader.name}
                  </MenuItem>
                ))}
              </CssTextField>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <CssTextField
                label="State"
                select
                id="fullWidth"
                required
                value={isAssemble}
                onChange={(e) => setIsAssemble(e.target.value)}
              >
                {states.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <CssTextField
                label="Component"
                select
                id="fullWidth"
                disabled={isAssemble}
                required={!isAssemble}
                value={isAssemble ? '' : componentId}
                onChange={(e) => setComponentId(e.target.value)}
              >
                {listComponentActive.map((component) => (
                  <MenuItem key={component.componentId} value={component.componentId}>
                    {component.componentName}
                  </MenuItem>
                ))}
              </CssTextField>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <CssTextField
                label="Status"
                select
                id="fullWidth"
                required
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>
              {/* </div> */}
            </div>

            <div className="btngr">
              <Button
                type="submit"
                variant="contained"
                style={{
                  fontFamily: "Muli",
                  borderRadius: 10,
                  backgroundColor: "#e30217",
                  marginRight: "0.5rem",
                }}
                size="large"
                onClick={changeData}
              >
                Edit Section
              </Button>
              <Button
                variant="contained"
                style={{
                  fontFamily: "Muli",
                  borderRadius: 10,
                  backgroundColor: "#e30217",
                }}
                size="large"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div >
    </div >
  ) : (
    ""
  );
}

export default SectionEditPopup;