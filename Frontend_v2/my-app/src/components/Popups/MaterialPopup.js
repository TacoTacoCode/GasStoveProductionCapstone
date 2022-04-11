import React, { useState, useEffect } from "react";
import "../../styles/Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
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

function MaterialPopup(props) {
  const [imageUrl, setMaterialImage] = useState("");
  const [materialID, setMaterialID] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [unit, setMaterialUnit] = useState("");
  const [amount, setMaterialAmount] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handlePreviewAvatar = (e) => {
    console.log(e.target.value)
    const file = e.target.files[0];
    console.log(file);
    file.preview = URL.createObjectURL(file);
    setMaterialImage(file);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  //đổi ảnh khác thì clean bộ nhớ
  useEffect(() => {
    //clean up function for avatarUrl
    return () => {
      return imageUrl && URL.revokeObjectURL(imageUrl.preview);
    };
  }, [imageUrl]);

  const postData = (e) => {
    const formData = new FormData();
    formData.append("materialId", materialID);
    formData.append("materialName", materialName);
    formData.append("amount", amount);
    formData.append("unit", unit);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("file", file);
    axios.post("https://localhost:5001/addMaterial", formData)
      .then(res => {
        swal("Success", "Add new material successfully", "success", {
          buttons: false,
          timer: 2000,
        })
        //reset data
        handleCancelClick();
      }).catch(err => {
        swal("Error", "Add new material failed", "error", {
          buttons: false,
          timer: 2000,
        })
        console.log(err)
      }).finally(() => {
        handleDelay();
      });
  }

  const resetData = () => {
    //reset data
    setMaterialImage("");
    setMaterialID("");
    setMaterialName("");
    setMaterialUnit("");
    setMaterialAmount("");
    setStatus("Active");
    setDescription("");
  };

  const handleCancelClick = () => {
    //reset data
    resetData();
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
    delay(function () { window.location.href = "http://localhost:3000/dashboard/materials"; }, 1000);
  };

  return props.trigger ? (
    <div className="componentpopup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            <CloseIcon style={{ color: "white" }} />
          </button>
        </div>
        {props.children}
        <div className="popup-body">
          <form>
            <br />
            <text className="content_choose">Material : </text>
            <div className="idname">
              <div className="imagefield">
                Material's Image
                <input type="file" onChange={handlePreviewAvatar} />
              </div>
            </div>
            <div>
              {imageUrl ? (
                <img src={imageUrl.preview} alt="image" width="100px" />
              ) : null}
            </div>
            <div className="idname">
              <div className="idfield">
                <CssTextField
                  label="Material ID"
                  id="fullWidth"
                  value={materialID}
                  required
                  onChange={(e) => setMaterialID(e.target.value)}
                />
              </div>
              <div className="namefield">
                <CssTextField
                  label="Material Name"
                  id="fullWidth"
                  value={materialName}
                  required
                  onChange={(e) => setMaterialName(e.target.value)}
                />
              </div>
              <div className="idfield">
                <CssTextField
                  label="Unit"
                  id="fullWidth"
                  value={unit}
                  required
                  onChange={(e) => setMaterialUnit(e.target.value)}
                />
              </div>
            </div>
            <div className="idname">
              <div className="txtfield">
                <CssTextField
                  label="Amount"
                  id="fullWidth"
                  value={amount}
                  required
                  type={"number"}
                  InputProps={{
                    inputProps: { min: 0, pattern: "[0-9]*" },
                  }}
                  onChange={(e) => setMaterialAmount(e.target.value)}
                />
              </div>
              <div className="txtfield">
                <CssTextField
                  label="Status"
                  select
                  id="fullWidth"
                  value={status}
                  required
                  onChange={(e) => setStatus(e.target.value)}
                  helperText="Choose material status"
                >
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div>
              <div className="txtfield">
                <CssTextField
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
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
                onClick={postData}
              >
                Add Material
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
      </div>
    </div>
  ) : (
    ""
  );
}

export default MaterialPopup;
