import React, { useEffect, useState } from "react";
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

function createData(materialId, materialName, amount) {
  return { materialId, materialName, amount };
}

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

function ComponentPopup(props) {
  //set a map from combobox then add them to the table
  const [componentMaterial, setListComponentMaterial] = useState([]);
  const [listMaterialActive, setMaterialList] = useState([]);
  const [materialActive, setMaterialChoose] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:5001/getMaterials/Active").then((res) => {
      setMaterialList(res.data);
    });
  }, []);

  // const [importExportDetail, setimportExportDetailTest] = useState(null);
  // const [productComponent, setProductComponent] = useState(null);
  // const [section, setSection] = useState(null);
  const [imageUrl, setComponentImage] = useState("");
  const [componentID, setComponentID] = useState("");
  const [componentName, setComponentName] = useState("");
  const [size, setComponentSize] = useState("");
  const [amount, setComponentAmount] = useState("");
  const [materialAmount, setMaterialComponentAmount] = useState(null);
  const [substance, setComponentSubstance] = useState("");
  const [weight, setComponentWeight] = useState("");
  const [color, setComponentColor] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handlePreviewAvatar = (e) => {
    console.log(e.target.value);
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setComponentImage(file);
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

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const postData = (e) => {
    e.preventDefault();
    const jsonObj = {
      componentMaterial: componentMaterial.map((item) => {
        return {
          componentId: componentID,
          materialId: item.materialId,
          amount: +item.amount,
        };
      }),
    };
    const formData = new FormData();
    formData.append("componentId", componentID);
    formData.append("componentName", componentName);
    formData.append("amount", amount);
    formData.append("status", status);
    formData.append("substance", substance);
    formData.append("size", size);
    formData.append("color", color);
    formData.append("weight", weight);
    formData.append("description", description);
    if (jsonObj.componentMaterial.length != 0) {
      formData.append("componentMaterial", jsonObj.componentMaterial);
    }
    if (file != null) {
      formData.append("file", file);
    }
    axios
      .post("https://localhost:5001/addComponent", formData)
      .then(res => {
        swal("Success", "Add new component successfully", "success", {
          buttons: false,
          timer: 2000,
        })
        //reset data
        handleCancelClick();
      }).catch(err => {
        swal("Error", "Add new component failed", "error", {
          buttons: false,
          timer: 2000,
        })
        console.log(err)
      }).finally(() => {
        handleDelay();
      });
  };

  const handleCancelClick = () => {
    setComponentID("");
    setComponentName("");
    setComponentAmount("");
    setComponentImage("");
    setComponentSize("");
    setComponentSubstance("");
    setComponentWeight("");
    setComponentColor("");
    setStatus("Active");
    setDescription("");
    setComponentImage("");
    setFile("");
    setFileName("");

    setMaterialChoose(null);
    setListComponentMaterial([]);

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
    <div className="componentpopup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            <CloseIcon style={{ color: "white" }} />
          </button>
        </div>
        {props.children}
        <div className="popup-body">
          <form id="Form1">
            <br />
            <text className="content_choose">Component : </text>
            <div className='imagefield'>
              Component's Image
              <input type="file" onChange={handlePreviewAvatar} />
            </div>
            <div>
              {imageUrl ? <img src={imageUrl.preview} alt='image' width="100px" /> : null}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
            <br />
            <br />
            <text className="content_choose">Component Detail : </text>
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

              {materialActive != null && materialAmount != null ? (
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
                    setMaterialChoose(null);
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
                onClick={postData}
              >
                Add Component
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

export default ComponentPopup;
