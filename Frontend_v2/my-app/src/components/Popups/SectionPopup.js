import React, { useState, useEffect } from "react";
import "../../styles/Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
import MaterialTable from "material-table";
import {
  Button,
  MenuItem,
  TextField,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import swal from "sweetalert";

const statuses = [
  {
    value: true,
    label: "Assembled",
  },
  {
    value: false,
    label: "Not Assembled Yet",
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

function SectionPopup(props) {
  const [listComponentActive, setComponentList] = useState([]);
  const [listAccountActive, setAccountList] = useState([]);

  useEffect(() => {
    axios.get("https://localhost:5001/getComponents/Active").then((res) => {
      setComponentList(res.data);
    });
    axios.get("https://localhost:5001/getActiveAccounts").then((res) => {
      setAccountList(res.data);
    });
  }, []);

  const [sectionLeaderId, setSectionLeaderId] = useState("");
  const [componentId, setComponentId] = useState("");
  const [isAssemble, setIsAssemble] = useState(true);

  const postData = (e) => {
    e.preventDefault();
    const jsonObj = {
      sectionLeadId: sectionLeaderId,
      componentId,
      workerAmount: 0,
      isAssemble
    };
    axios
      .post("https://localhost:5001/addSection", jsonObj)
      .then(res => {
        swal("Success", "Add new section successfully", "success", {
          buttons: false,
          timer: 2000,
        })
        //reset data
        handleCancelClick();
      }).catch(err => {
        swal("Error", "Add new section failed", "error", {
          buttons: false,
          timer: 2000,
        })
        console.log(err)
      }).finally(() => {
        handleDelay();
      });
  };

  const handleCancelClick = () => {
    setSectionLeaderId("");
    setComponentId("");
    setIsAssemble(true);
    props.setTrigger(false);
  };

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  const handleDelay = () => {
    delay(function () { window.location.reload(); }, 1000);
  };

  return props.trigger ? (
    <div className="sectionpopup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            <CloseIcon style={{ color: "white" }} />
          </button>
        </div>
        {props.children}
        <div className="popup-body">
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
              {/* </div> */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <div className="idfield"> */}
              <CssTextField
                label="Status"
                select
                id="fullWidth"
                required
                value={isAssemble}
                onChange={(e) => setIsAssemble(e.target.value)}
              >
                {statuses.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </CssTextField>
              {/* </div> */}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {/* <div className="txtfield"> */}
              <CssTextField
                label="Component"
                select
                id="fullWidth"
                required
                value={componentId}
                onChange={(e) => setComponentId(e.target.value)}
              >
                {listComponentActive.map((component) => (
                  <MenuItem key={component.componentId} value={component.componentId}>
                    {component.componentName}
                  </MenuItem>
                ))}
              </CssTextField>
              {/* </div> */}
            </div>

            <div className="idname">
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
                  onClick={postData}
                >
                  Add Section
                </Button>
                <Button
                  variant="contained"
                  style={{
                    fontFamily: "Muli",
                    borderRadius: 10,
                    backgroundColor: "#e30217",
                  }}
                  size="large"
                  onClick={() => props.setTrigger(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default SectionPopup;
