import React, { useState, useEffect } from "react";
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
  const { listComponent } = props;
  const array = [];

  listComponent.forEach((item) => {
    array.push(item);
  });

  function createData(materialId, materialName, amount) {
    return { materialId, materialName, amount };
  }

  const [componentMaterial, setListComponentMaterial] = useState([]);
  const [listMaterialActive, setMaterialList] = useState([]);
  const [materialActive, setMaterialChoose] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:5001/getMaterials/Active").then((res) => {
      setMaterialList(res.data);
    });
  }, []);

  function deleteComponent(id) {
    axios
      .put("https://localhost:5001/delComponent/" + id)
      .then((response) => {
        swal("Success", "Delete Component successfully", "success", {
          button: false,
          timer: 2000,
        });
        props.setSubmittedTime();
      })
      .catch((err) => {
        swal("Error", "Delete Component failed", "error", {
          button: false,
          time: 2000,
        });
      });
  }

  const columns = [
    {
      title: "Component ID",
      field: "componentId",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Component Image",
      field: "imageUrl",
      render: (rowData) => (
        <img style={{ height: "70px", width: "70px" }} src={rowData.imageUrl} />
      ),
      cellStyle: { fontFamily: "Arial" },
      align: "left",
    },
    {
      title: "Component Name",
      field: "componentName",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Amount",
      field: "amount",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Unit",
      field: "substance",
      cellStyle: { fontFamily: "Arial" },
    },
  ];

  const materialColumns = [
    {
      title: "ID",
      field: "materialId",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Name",
      field: "materialName",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Amount",
      field: "amount",
      cellStyle: { fontFamily: "Arial" },
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
  const [imageUrl, setComponentImage] = useState("");
  const [componentId, setComponentId] = useState("");
  const [componentName, setComponentName] = useState("");
  const [size, setComponentSize] = useState("");
  const [amount, setComponentAmount] = useState("");
  const [materialAmount, setMaterialComponentAmount] = useState("");
  const [substance, setComponentSubstance] = useState("");
  const [weight, setComponentWeight] = useState("");
  const [color, setComponentColor] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");

  const handleClickOpen = (component) => {
    setOpen(true);
    // setComponent(component)
    setComponentImage(component.imageUrl);
    setComponentId(component.componentId);
    setComponentName(component.componentName);
    setComponentSize(component.size);
    setComponentAmount(component.amount);
    setComponentSubstance(component.substance);
    setComponentWeight(component.weight);
    setComponentColor(component.color);
    setStatus(component.status);
    setDescription(component.description);

    setListComponentMaterial(
      component.material?.map((item) => {
        return {
          materialId: item.materialId,
          materialName: item.materialName,
          amount: item.amount,
        };
      })
    );
  };

  const handleSaveData = (e) => {
    e.preventDefault();
    const jsonObj = {
      componentId: componentId,
      componentName,
      amount: +amount,
      imageUrl,
      status,
      substance,
      size,
      color,
      weight,
      description,
      componentMaterial: componentMaterial?.map((item) => {
        return {
          componentId: componentId,
          materialId: item.materialId,
          amount: +item.amount,
        };
      }),
    };
    axios
      .put("https://localhost:5001/updateComponent", jsonObj)
      .then((res) => {
        swal("Success", "Update component success", "success", {
          button: false,
          time: 2000,
        });
      })
      .catch((ex) => {
        swal("Error", "Update component fail", "error", {
          button: false,
          time: 2000,
        });
      });
    props.setSubmittedTime();
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
    setListComponentMaterial([]);
  };

  return (
    <React.Fragment>
      <MaterialTable
        title={"List of Components"}
        data={array}
        columns={columns}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete this component",
            onClick: (event, rowData) => {
              deleteComponent(rowData.componentId);
              window.location.reload();
            },
          },
          {
            icon: "edit",
            tooltip: "Edit this component",
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
        // component={component}
        componentId={componentId}
        componentName={componentName}
        substance={substance}
        size={size}
        color={color}
        weight={weight}
        amount={amount}
        status={status}
        description={description}
      >
        <div className="componentpopup">
          <div className="popup-inner">
            <div>
              <button className="close-btn" onClick={handleClose}>
                <CloseIcon style={{ color: "white" }} />
              </button>
            </div>
            <h3 className="popuptitle">Edit Component: {componentId}</h3>
            <div className="popup-body">
              <form>
                <div className="idname">
                  <div className="idfield">
                    <CssTextField
                      label="Component ID"
                      id="fullWidth"
                      required
                      value={componentId}
                    />
                  </div>
                  <div className="namefield">
                    <CssTextField
                      label="Component Name"
                      id="fullWidth"
                      required
                      value={componentName}
                      onChange={(e) => setComponentName(e.target.value)}
                    />
                  </div>
                  <div className="idfield">
                    <CssTextField
                      label="Amount"
                      id="fullWidth"
                      value={amount}
                      required
                      type={"number"}
                      InputProps={{
                        inputProps: { min: 0, pattern: "[0-9]*" },
                      }}
                      onChange={(e) => setComponentAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div className="idname">
                  <div className="txtfield">
                    <CssTextField
                      label="Size"
                      id="fullWidth"
                      value={size}
                      required
                      type={"number"}
                      InputProps={{
                        inputProps: { min: 0, pattern: "[0-9]*" },
                      }}
                      onChange={(e) => setComponentSize(e.target.value)}
                    />
                  </div>
                  <div className="txtfield">
                    <CssTextField
                      label="Weight"
                      id="fullWidth"
                      required
                      type={"number"}
                      value={weight}
                      InputProps={{
                        inputProps: { min: 0, pattern: "[0-9]*" },
                      }}
                      onChange={(e) => setComponentWeight(e.target.value)}
                    />
                  </div>
                  <div className="txtfield">
                    <CssTextField
                      label="Color"
                      value={color}
                      onChange={(e) => setComponentColor(e.target.value)}
                    />
                  </div>
                  <div className="txtfield">
                    <CssTextField
                      label="Substance"
                      value={substance}
                      onChange={(e) => setComponentSubstance(e.target.value)}
                    />
                  </div>
                </div>

                <div className="idname">
                  <div className="txtfield">
                    <CssTextField
                      label="Status"
                      select
                      value={status === "Active" ? "Active" : "Unactive"}
                      id="fullWidth"
                      required
                      onChange={(e) => setStatus(e.target.value)}
                      helperText="Choose component status"
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
                <div className="idname">
                  <div className="txtfield1">
                    <CssTextField
                      label="Material Active List"
                      select
                      id="fullWidth"
                      value={materialActive}
                      onChange={(e) => setMaterialChoose(e.target.value)}
                      helperText="Choose Active Material"
                    >
                      {listMaterialActive
                        .filter((item) => {
                          return !componentMaterial?.find(
                            (item2) => item2.materialId === item.materialId
                          );
                        })
                        .map((material) => (
                          <MenuItem key={material.materialId} value={material}>
                            {material.materialName}
                          </MenuItem>
                        ))}
                    </CssTextField>
                  </div>
                  <div className="numfield1">
                    <CssTextField
                      label="Amount"
                      id="fullWidth"
                      value={materialAmount}
                      type={"number"}
                      InputProps={{
                        inputProps: { min: 0, pattern: "[0-9]*" },
                      }}
                      onChange={(e) =>
                        setMaterialComponentAmount(e.target.value)
                      }
                    />
                  </div>

                  {materialActive != null &&
                    materialAmount != null &&
                    materialAmount > 0 ? (
                    <div className="button_field">
                      <Button
                        style={{
                          fontFamily: "Muli",
                          borderRadius: 10,
                          backgroundColor: "#e30217",
                          color: "white",
                        }}
                        onClick={() => {
                          setListComponentMaterial((componentMaterial) => [
                            ...componentMaterial,
                            createData(
                              materialActive.materialId,
                              materialActive.materialName,
                              materialAmount
                            ),
                          ]);
                          setMaterialComponentAmount();
                          setMaterialChoose(null);
                          //console log here won print the new state, you have to wait for new lifecycle
                          //console.log(componentMaterial);
                        }}
                      >
                        ADD
                      </Button>
                    </div>
                  ) : null}
                  <div className="tablefield">
                    <MaterialTable
                      data={componentMaterial}
                      columns={materialColumns}
                      editable={{
                        onRowDelete: (oldData) =>
                          new Promise((resolve, reject) => {
                            setTimeout(() => {
                              const dataDelete = [...componentMaterial];
                              const index = oldData.tableData.id;
                              dataDelete.splice(index, 1);
                              setListComponentMaterial([...dataDelete]);
                              console.log("Delete: " + componentMaterial);
                              resolve();
                            }, 1);
                          }),
                      }}
                      options={{
                        toolbar: false,
                        maxBodyHeight: 200,
                        search: false,
                        paging: false,
                        showTitle: false,
                        addRowPosition: "first",
                        actionsColumnIndex: -1,
                        exportButton: false,
                        headerStyle: {
                          backgroundColor: "#E30217",
                          color: "#fff",
                        },
                      }}
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
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </React.Fragment>
  );
};
