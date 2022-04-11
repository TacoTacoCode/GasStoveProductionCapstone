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
    field: "componentId",
    cellStyle: { fontFamily: "Arial" },
  },
  {
    title: "Name",
    field: "componentName",
    cellStyle: { fontFamily: "Arial" },
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

function createData(componentId, componentName, amount) {
  return { componentId, componentName, amount };
}

function ProductEditPopup(props) {
  const [imageUrl, setProductImage] = useState({ ...props.data.imageUrl });
  const [productID, setProductID] = useState({ ...props.data.productId });
  const [productName, setProductName] = useState({ ...props.data.productName });
  const [price, setProductPrice] = useState({ ...props.data.price });
  const [amount, setProductAmount] = useState({ ...props.data.amount });
  const [status, setStatus] = useState({ ...props.data.status });
  const [description, setDescription] = useState({ ...props.data.description });

  const [productComponent, setListProductComponent] = useState({ ...props.productCompos });
  const [listComponentActive, setComponentList] = useState([]);
  const [componentActive, setComponentChoose] = useState(null);
  const [componentAmount, setComponentProductAmount] = useState(null);

  const [curImg, setCurImg] = useState('');

  useEffect(() => {
    setCurImg("https://firebasestorage.googleapis.com/v0/b/gspspring2022.appspot.com/o/Images%2F" + props.data.imageUrl);
  }, [props.data.imageUrl])

  useEffect(() => {
    setProductImage(props.data.imageUrl);
  }, [props.data.imageUrl])

  useEffect(() => {
    setProductID(props.data.productId);
  }, [props.data.productId])

  useEffect(() => {
    setProductName(props.data.productName);
  }, [props.data.productName])

  useEffect(() => {
    setProductPrice(props.data.price);
  }, [props.data.price])

  useEffect(() => {
    setProductAmount(props.data.amount);
  }, [props.data.amount])

  useEffect(() => {
    setStatus(props.data.status);
  }, [props.data.status])

  useEffect(() => {
    setDescription(props.data.description);
  }, [props.data.description])

  useEffect(() => {
    setListProductComponent(props.productCompos);
  }, [props.productCompos])

  useEffect(() => {
    axios.get("https://localhost:5001/getComponents/Active").then((res) => {
      setComponentList(res.data);
    });
  }, []);

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handlePreviewAvatar = (e) => {
    console.log(e.target.value);
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setCurImg(file.preview);
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(file.preview);
  };

  const changeData = (e) => {
    e.preventDefault();
    const jsonObj = {
      productComponents: productComponent
        ? productComponent?.map((item) => {
          return {
            productId: productID,
            componentId: item.componentId,
            amount: item.amount,
          };
        })
        : [],
    };
    const formData = new FormData();
    formData.append("productId", productID);
    formData.append("productName", productName);
    formData.append("amount", amount);
    formData.append("price", price);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("productComponents", jsonObj.productComponents);
    formData.append("file", file);
    axios
      .put("https://localhost:5001/updateProduct", formData)
      .then((res) => {
        swal("Success", "Update product successfully", "success", {
          button: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        swal("Error", "Update product failed", "error", {
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
    delay(function () { window.location.reload(); }, 1000);
  };

  const handleCancelClick = () => {
    setProductImage('');
    setProductID(props.data.productId);
    setProductName(props.data.productName);
    setProductPrice(props.data.price);
    setProductAmount(props.data.amount);
    setStatus(props.data.status);
    setListProductComponent(props.productCompos);
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
        <div className="popup-body" style={{ height: '600px', overflow: 'auto', overflowY: 'scroll' }}>
          <form>
            <br />
            <text className="content_choose">Product : </text>
            <div className="idname">
              <div className="imagefield">
                Product's Image
                <input type="file" onChange={handlePreviewAvatar} />
              </div>
            </div>
            <div>
              <img src={curImg} alt="avatar" width="100px" />
              {/* {imageUrl ? (
                <img src={imageUrl.preview} alt="avatar" width="100px" />
              ) : null} */}
            </div>
            <div className="idname">
              <div className="idfield">
                <CssTextField
                  label="Product ID"
                  id="fullWidth"
                  value={productID}
                  required
                  onChange={(e) => setProductID(e.target.value)}
                />
              </div>
              <div className="namefield">
                <CssTextField
                  label="Product Name"
                  id="fullWidth"
                  value={productName}
                  required
                  onChange={(e) => setProductName(e.target.value)}
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
                  onChange={(e) => setProductAmount(e.target.value)}
                />
              </div>
            </div>

            <div className="idname">
              <div className="txtfield">
                <CssTextField
                  label="Price"
                  id="fullWidth"
                  required
                  value={price}
                  type={"number"}
                  InputProps={{
                    inputProps: { min: 0, pattern: "[0-9]*" },
                  }}
                  onChange={(e) => setProductPrice(e.target.value)}
                />
              </div>
              <div className="txtfield">
                <CssTextField
                  label="Status"
                  select
                  id="fullWidth"
                  required
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  helperText="Choose product status"
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
            <text className="content_choose">Product Detail : </text>
            <div className="idname">
              <div className="txtfield_Choose">
                <CssTextField
                  label="Component Active List"
                  select
                  id="fullWidth"
                  value={componentActive}
                  onChange={(e) => setComponentChoose(e.target.value)}
                  helperText="Choose Active Component"
                >
                  {listComponentActive
                    .filter((item) => {
                      return !productComponent.find(
                        (item2) => item2.componentId === item.componentId
                      );
                    })
                    .map((component) => (
                      <MenuItem key={component.componentId} value={component}>
                        {component.componentName}
                      </MenuItem>
                    ))}
                </CssTextField>
              </div>
              <div className="numfield_choose">
                <CssTextField
                  label="Amount"
                  id="fullWidth"
                  value={componentAmount}
                  type={"number"}
                  InputProps={{
                    inputProps: { min: 0, pattern: "[0-9]*" },
                  }}
                  onChange={(e) => setComponentProductAmount(e.target.value)}
                />
              </div>
              {componentActive != null &&
                componentAmount != null &&
                componentAmount > 0 ? (
                <Button
                  style={{
                    fontFamily: "Muli",
                    borderRadius: 10,
                    backgroundColor: "#e30217",
                    color: "white",
                  }}
                  onClick={() => {
                    setListProductComponent((productComponent) => [
                      ...productComponent,
                      createData(
                        componentActive.componentId,
                        componentActive.materialName,
                        componentAmount
                      ),
                    ]);
                    setComponentProductAmount(0);
                    setComponentChoose(null);
                  }}
                >
                  ADD
                </Button>
              )
                : <Button
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
                  data={productComponent}
                  columns={columns}
                  editable={{
                    onRowUpdate: (newData, oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataUpdate = [...productComponent];
                          const index = oldData.tableData.id;
                          dataUpdate[index] = newData;
                          setListProductComponent([...dataUpdate]);
                          resolve();
                        }, 1)
                      }),
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...productComponent];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setListProductComponent([...dataDelete]);
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
                Edit Product
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

export default ProductEditPopup;