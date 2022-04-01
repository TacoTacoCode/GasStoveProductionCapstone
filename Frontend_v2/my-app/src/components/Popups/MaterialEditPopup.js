import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import "../../styles/Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
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
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
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

function MaterialEditPopup(props) {
  const [imageUrl, setMaterialImage] = useState({ ...props.data.imageUrl });
  const [materialID, setMaterialID] = useState({ ...props.data.materialId });
  const [materialName, setMaterialName] = useState({ ...props.data.materialName });
  const [unit, setMaterialUnit] = useState({ ...props.data.unit });
  const [amount, setMaterialAmount] = useState({ ...props.data.amount });
  const [status, setMaterialStatus] = useState({ ...props.data.status });
  const [description, setDescription] = useState({ ...props.data.description });

  useEffect(() => {
    setMaterialImage(props.data.imageUrl);
  }, [props.data.imageUrl])

  useEffect(() => {
    setMaterialID(props.data.materialId);
  }, [props.data.materialId])

  useEffect(() => {
    setMaterialName(props.data.materialName);
  }, [props.data.materialName])

  useEffect(() => {
    setMaterialUnit(props.data.unit);
  }, [props.data.unit])

  useEffect(() => {
    setMaterialAmount(props.data.amount);
  }, [props.data.amount])

  useEffect(() => {
    setMaterialStatus(props.data.status);
  }, [props.data.status])

  useEffect(() => {
    setDescription(props.data.description);
  }, [props.data.description])

  // const [file, setFile] = useState();
  // const [fileName, setFileName] = useState("");

  const handlePreviewAvatar = (e) => {
    console.log(e.target.value);
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    // setMaterialImage(file);
    // setFile(e.target.files[0]);
    // setFileName(e.target.files[0].name);
    console.log(file.preview);
  };

  const changeData = (e) => {
    e.preventDefault();
    //thêm ảnh lên server
    //uploadFile();
    const jsonObj = {
      materialId: materialID,
      materialName: materialName,
      amount: amount,
      unit: unit,
      imageUrl: "",
      status: status,
      description: description,
    };
    console.log(JSON.stringify(jsonObj));
    axios
      .put("https://localhost:5001/updateMaterial", jsonObj)
      .then((res) => {
        swal("Success", "Update material successfully", "success", {
          button: false,
          timer: 2000,
        });
        handleCancelClick();
      })
      .catch((err) => {
        swal("Error", "Update material failed", "error", {
          button: false,
          timer: 2000,
        });
      });
    handleClose();
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
    delay(function () { window.location.reload(); }, 1000);
  };

  const handleCancelClick = () => {
    setMaterialImage(props.data.imageUrl);
    setMaterialID(props.data.materialId);
    setMaterialName(props.data.materialName);
    setMaterialUnit(props.data.unit);
    setMaterialAmount(props.data.amount);
    setMaterialStatus(props.data.status);
    setDescription(props.data.description);
    props.setOpen(false);
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
        <div className="popup-body">
          <form>
            <div className="idname">
              <div className="imagefield">
                Material's Image
                <input type="file" onChange={handlePreviewAvatar} />
              </div>
            </div>
            <div>
              {imageUrl ? (
                <img src={imageUrl.preview} alt="avatar" width="100px" />
              ) : null}
            </div>
            <div className="idname">
              <div className="idfield">
                <CssTextField
                  label="Material ID"
                  id="fullWidth"
                  value={materialID}
                  required
                  disabled
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
                  onChange={(e) => setMaterialStatus(e.target.value)}
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
                onClick={changeData}
              >
                Edit Material
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

export default MaterialEditPopup;