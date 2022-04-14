import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import "../../styles/Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
import MaterialTable from "material-table";
import { Button, MenuItem, TextField, } from "@mui/material";
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

const columns = [
  {
    title: "ID",
    field: "materialId",
    cellStyle: { fontFamily: "Arial" },
  },
  {
    title: "Name",
    field: "materialName",
    cellStyle: { fontFamily: "Arial" },
    render: rowdata => rowdata.material.materialName,
  },
  {
    title: "Amount",
    field: "amount",
    cellStyle: { fontFamily: "Arial" },
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

function createData(materialId, materialName, amount) {
  return { materialId, 'material': { materialName }, amount };
}

function ComponentEditPopup(props) {
  const [imageUrl, setComponentImage] = useState(props.data.imageUrl);
  const [componentID, setComponentID] = useState(props.data.componentId);
  const [componentName, setComponentName] = useState(props.data.componentName);
  const [size, setComponentSize] = useState(props.data.size);
  const [amount, setComponentAmount] = useState(props.data.amount);
  const [substance, setComponentSubstance] = useState(props.data.substance);
  const [weight, setComponentWeight] = useState(props.data.weight);
  const [color, setComponentColor] = useState(props.data.color);
  const [status, setStatus] = useState(props.data.status);
  const [description, setDescription] = useState(props.data.description);

  const [componentMaterial, setListComponentMaterial] = useState({ ...props.compoMates });
  const [listMaterialActive, setMaterialList] = useState([]);
  const [materialActive, setMaterialChoose] = useState('');
  const [materialAmount, setMaterialComponentAmount] = useState(0);
  const [curImg, setCurImg] = useState('');

  useEffect(() => {
    setCurImg("https://firebasestorage.googleapis.com/v0/b/gspspring2022.appspot.com/o/Images%2F" + props.data.imageUrl);
  }, [props.data.imageUrl])

  useEffect(() => {
    setComponentImage(props.data.imageUrl);
  }, [props.data.imageUrl])

  useEffect(() => {
    setComponentID(props.data.componentId);
  }, [props.data.componentId])

  useEffect(() => {
    setComponentName(props.data.componentName);
  }, [props.data.componentName])

  useEffect(() => {
    setComponentSize(props.data.size);
  }, [props.data.size])

  useEffect(() => {
    setComponentAmount(props.data.amount);
  }, [props.data.amount])

  useEffect(() => {
    setComponentSubstance(props.data.substance);
  }, [props.data.substance])

  useEffect(() => {
    setComponentWeight(props.data.weight);
  }, [props.data.weight])

  useEffect(() => {
    setComponentColor(props.data.color);
  }, [props.data.color])

  useEffect(() => {
    setStatus(props.data.status);
  }, [props.data.status])

  useEffect(() => {
    setDescription(props.data.description);
  }, [props.data.description])

  useEffect(() => {
    setListComponentMaterial(props.compoMates);
  }, [props.compoMates])

  useEffect(() => {
    axios.get("https://localhost:5001/getMaterials/Active").then((res) => {
      setMaterialList(res.data);
    });
  }, []);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handlePreviewAvatar = (e) => {
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setCurImg(file.preview);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const createMD = () => {
    let compMate = []
    componentMaterial.map((item) =>
      compMate.push({
        "componentId": componentID,
        "materialId": item.materialId,
        "amount": +item.amount,
      })
    )
    return compMate;
  }
  const changeData = (e) => {
    e.preventDefault();
    const jsonObj = createMD();
    const formData = new FormData();
    formData.append("componentId", componentID);
    formData.append("componentName", componentName);
    formData.append("amount", amount);
    formData.append("status", status);
    formData.append("substance", substance);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("weight", weight);
    formData.append("description", description == undefined ? '' : description);
    formData.append("componentMaterial", JSON.stringify(jsonObj));
    formData.append("file", file);
    axios
      .put("https://localhost:5001/updateComponent", formData)
      .then((res) => {
        swal("Success", "Update component successfully", "success", {
          button: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        swal("Error", "Update component failed", "error", {
          button: false,
          timer: 2000,
        })
      }).finally(() => {
        handleCancelClick();
        handleClose();
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
    delay(function () { window.location.reload(); }, 1000);
  };

  const handleCancelClick = () => {
    setComponentImage('');
    setComponentID(props.data.componentId);
    setComponentName(props.data.componentName);
    setComponentSize(props.data.size);
    setComponentAmount(props.data.amount);
    setComponentSubstance(props.data.substance);
    setComponentWeight(props.data.weight);
    setComponentColor(props.data.color);
    setStatus(props.data.status);
    setListComponentMaterial(props.compoMates);
    setDescription(props.data.description);
    props.setOpen(false);
    //handleClose();
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
        <div className="popup-body" style={{ height: '600px', overflow: 'auto', overflowY: 'scroll' }}>
          <form>
            <div className="idname">
              <div className="imagefield">
                Component's Image
                <input type="file" onChange={handlePreviewAvatar} />
              </div>
            </div>
            <div>
              <img src={curImg} alt="avatar" width="100px" />
            </div>
            <div className="idname">
              <div className="idfield">
                <CssTextField
                  label="Component ID"
                  id="fullWidth"
                  value={componentID}
                  required
                  onChange={(e) => setComponentID(e.target.value)}
                />
              </div>
              <div className="namefield">
                <CssTextField
                  label="Component Name"
                  id="fullWidth"
                  value={componentName}
                  required
                  onChange={(e) => setComponentName(e.target.value)}
                />
              </div>
              <div className="idfield">
                <CssTextField
                  label="Amount"
                  id="fullWidth"
                  required
                  value={amount}
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
                  required
                  value={size}
                  onChange={(e) => setComponentSize(e.target.value)}
                />
              </div>
              <div className="txtfield">
                <CssTextField
                  label="Weight"
                  id="fullWidth"
                  required
                  value={weight}
                  type={"number"}
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
                  id="fullWidth"
                  required
                  value={status}
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
                  value={description == undefined ? '' : description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div className="idname">
              <div className="txtfield_Choose">
                <CssTextField
                  label="Material Active List"
                  select
                  id="fullWidth"
                  required
                  value={materialActive}
                  onChange={(e) => setMaterialChoose(e.target.value)}
                  helperText="Choose Active Material"
                >
                  {listMaterialActive
                    .filter((item) => {
                      return !componentMaterial.find(
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
              <div className="numfield_choose">
                <CssTextField
                  label="Amount"
                  id="fullWidth"
                  required
                  value={materialAmount}
                  type={"number"}
                  InputProps={{
                    inputProps: { min: 0, pattern: "[0-9]*" },
                  }}
                  onChange={(e) => setMaterialComponentAmount(e.target.value)}
                />
              </div>

              {materialActive != '' && materialAmount != 0 ? (
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
                    setMaterialComponentAmount(0);
                    setMaterialChoose('');
                    //console log here won print the new state, you have to wait for new lifecycle
                    //console.log(componentMaterial);
                  }}
                >
                  ADD
                </Button>
              ) : <Button
                style={{
                  fontFamily: "Muli",
                  borderRadius: 10,
                  backgroundColor: "#a9a9a9",
                  color: "white",
                }}
                disabled
              >
                ADD
              </Button>}
              <div className="tablefield">
                <MaterialTable
                  data={componentMaterial}
                  columns={columns}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...componentMaterial];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          setListComponentMaterial([...dataUpdate]);
                          resolve();
                        }, 1)
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...componentMaterial];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setListComponentMaterial([...dataDelete]);
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
                    headerStyle: { backgroundColor: "#E30217", color: "#fff" },
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
                onClick={changeData}
              >
                Edit Component
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

export default ComponentEditPopup;