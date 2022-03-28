import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useMountEffect,
} from "react";
import MaterialTable from "material-table";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { alpha, styled } from "@mui/material/styles";
import "../../App.css";
import "../../styles/Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  InputAdornment,
  makeStyles,
  MenuItem,
  TextField,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

export const Table = (props) => {
  const { listMaterial } = props;
  const array = [];

  listMaterial.forEach((item) => {
    array.push(item);
  });

  function deleteMaterial(id) {
    axios
      .put("https://localhost:5001/delMaterial/" + id)
      .then((response) => {
        swal("Success", "Delete Material successfully", "success");
      })
      .catch((err) => {
        swal("Error", "Delete Material failed", "error");
      });

    props.setSubmittedTime();
  }

  const columns = [
    {
      title: "Material ID",
      field: "materialId",
      cellStyle: { fontFamily: "Arial", fontSize: "20px" },
    },
    {
      title: "Image",
      field: "imageUrl",
      render: (rowData) => (
        <img style={{ height: "60px", width: "60px" }} src={rowData.imageUrl} />
      ),
    },
    {
      title: "Material Name",
      field: "materialName",
      cellStyle: { fontFamily: "Arial", fontSize: "20px" },
    },
    {
      title: "Unit",
      field: "unit",
      cellStyle: { fontFamily: "Arial", fontSize: "20px", fontWeight: "500" },
    },
    {
      title: "Amount",
      field: "amount",
      cellStyle: { fontFamily: "Arial", fontSize: "20px" },
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

  const [open, setOpen] = useState(false);
  const [imageUrl, setMaterialImage] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [unit, setMaterialUnit] = useState("");
  const [amount, setMaterialAmount] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");
  // const [material, setMaterial] = useState({
  //     imageUrl: "",
  //     materialId: "",
  //     materialName: "",
  //     unit: "",
  //     amount: "",
  //     status: "Active",
  //     description: "",
  // });

  // const handleChange = (event) => {
  //     const { name, value } = event.target;
  //     setMaterial((prevState) => {
  //         return {
  //             ...prevState,
  //             [name]: value,
  //         };
  //     });
  // };

  // const { imageUrl, materialId, materialName, unit, amount, status, description } = material;

  const handleClickOpen = (material) => {
    setOpen(true);
    // setMaterial(material)
    setMaterialId(material.materialId);
    setMaterialName(material.materialName);
    setMaterialUnit(material.unit);
    setMaterialAmount(material.amount);
    setStatus(material.status);
    setDescription(material.description);
  };

  const handleSaveData = () => {
    const jsonObj = {
      materialId: materialId,
      materialName: materialName,
      amount: amount,
      unit: unit,
      imageUrl: "",
      status: status,
      description: description,
    };
    axios
      .put("https://localhost:5001/updateMaterial", jsonObj)
      .then((res) => {
        swal("Success", "Update material successfully", "success", {
          buttons: false,
          timer: 2000,
        });
        props.setNewDataSubmit();
      })
      .catch((err) => {
        swal("Error", "Something went wrong", "error", {
          buttons: false,
          timer: 2000,
        });
      });
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <MaterialTable
        title={"List of Materials"}
        data={array}
        columns={columns}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete this Material",
            onClick: (event, rowData) => {
              deleteMaterial(rowData.materialId);
              window.location.reload();
            },
          },
          {
            icon: "edit",
            tooltip: "Edit this Material",
            onClick: (event, rowData) => {
              handleClickOpen(rowData);
              window.location.reload();
            },
          },
        ]}
        options={{
          addRowPosition: "first",
          actionsColumnIndex: -1,
          exportButton: false,
          headerStyle: { backgroundColor: "#E30217", color: "#fff" },
        }}
      />

      <Dialog
        open={open}
        onClose={handleClose}
      // material={material}
      // materialId={materialId}
      // materialName={materialName}
      // unit={unit}
      // amount={amount}
      // status={status}
      // description={description}
      >
        <div className="componentpopup">
          <div className="popup-inner">
            <div>
              <button className="close-btn" onClick={handleClose}>
                <CloseIcon style={{ color: "white" }} />
              </button>
            </div>
            <h3 className="popuptitle">Edit material: {materialId}</h3>
            <div className="popup-body">
              <div className="idname">
                <div className="idfield">
                  <CssTextField
                    name="materialId"
                    label="Material ID"
                    id="materialid"
                    disabled
                    value={materialId}
                  />
                </div>
                <div className="namefield">
                  <CssTextField
                    label="Material Name"
                    id="materialname"
                    name="materialName"
                    value={materialName}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setMaterialName(e.target.value)
                    }}
                  />
                </div>
                <div className="idfield">
                  <CssTextField
                    label="Unit"
                    id="unit"
                    name="unit"
                    value={unit}
                    onChange={(e) => setMaterialUnit(e.target.value)}
                  />
                </div>
              </div>
              <div className="idname">
                <div className="txtfield">
                  <CssTextField
                    label="Amount"
                    id="amount"
                    name="amount"
                    required
                    type={"number"}
                    InputProps={{
                      inputProps: { min: 0, pattern: "[0-9]*" },
                    }}
                    value={amount}
                    onChange={(e) => setMaterialAmount(e.target.value)}
                  />
                </div>
                <div className="txtfield">
                  <CssTextField
                    label="Status"
                    select
                    name="status"
                    id="Status"
                    required
                    onChange={(e) => setStatus(e.target.value)}
                    value={status === "Active" ? "Active" : "Unactive"}
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
                    id="description"
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="txtfield">
                  <CssTextField
                    id="imageUrl"
                    label="Image URL"
                    name="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setMaterialImage(e.target.value)}
                  />
                </div>
              </div>

              <div className="btngr">
                <Button
                  variant="contained"
                  style={{
                    fontFamily: "Muli",
                    borderRadius: 10,
                    backgroundColor: "#e30217",
                    marginRight: "0.5rem",
                  }}
                  size="large"
                  onClick={handleSaveData}
                >
                  Save
                </Button>
                <Button
                  variant="contained"
                  style={{
                    fontFamily: "Muli",
                    borderRadius: 10,
                    backgroundColor: "#e30217",
                  }}
                  size="large"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
