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

function createData(componentId, componentName, amount) {
  return { componentId, componentName, amount };
}

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

function ProductPopup(props) {
  const [productComponent, setListProductComponent] = useState([]);
  const [listComponentActive, setComponentList] = useState([]);
  const [componentActive, setComponentChoice] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:5001/getComponents/Active").then((res) => {
      setComponentList(res.data);
    });
  }, []);

  const [imageUrl, setProductImage] = useState("");
  const [productID, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setProductPrice] = useState("");
  const [amount, setProductAmount] = useState("");
  const [componentAmount, setComponentProductAmount] = useState(null);
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");

  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const handlePreviewAvatar = (e) => {
    console.log(e.target.value);
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setProductImage(file);
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

  const uploadFile = async (e) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post("http://localhost:3000/upload", formData);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  const postData = (e) => {
    // const formData = new FormData();
    // formData.append("file", file);
    // formData.append("fileName", fileName);
    e.preventDefault();
    const jsonObj = {
      productId: productID,
      productName,
      amount,
      price,
      imageUrl,
      status,
      description,
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
    console.log(jsonObj);
    axios
      .post("https://localhost:5001/addProduct", jsonObj)
      .then((res) => {
        swal("Success", "Add product success", "success", {
          button: false,
          timer: 2000,
        });
        props.setSubmittedTime();
      })
      .catch((err) => {
        swal("Error", "Add product fail", "error", {
          button: false,
          timer: 2000,
        });
      });
    handleCancelClick();
  };

  const handleCancelClick = () => {
    setProductID("");
    setProductName("");
    setProductPrice("");
    setProductAmount("");
    setComponentProductAmount("");
    setStatus("Active");
    setDescription("");
    setProductImage("");
    setFile("");
    setFileName("");

    setListProductComponent([]);
    setComponentChoice(null);

    props.setTrigger(false);
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            <CloseIcon style={{ color: "white" }} />
          </button>
        </div>
        {props.children}
        <div className="popup-body">
          <form>
            <div className="imagefield">
              Product's Image
              <input type="file" onChange={handlePreviewAvatar} />
            </div>
            <div>
              {imageUrl ? (
                <img src={imageUrl.preview} alt="avatar" width="100px" />
              ) : null}
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
                  value={status === "Active" ? "Active" : "Unactive"}
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

            <div className="idname">
              <div className="txtfield">
                <CssTextField
                  label="Component Active List"
                  select
                  id="fullWidth"
                  value={componentActive}
                  onChange={(e) => setComponentChoice(e.target.value)}
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
              <div className="numfield">
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
                <div className="button_field">
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
                      setComponentChoice(null);
                    }}
                  >
                    ADD
                  </Button>
                </div>
              ) : null}
              <div className="tablefield">
                <MaterialTable
                  data={productComponent}
                  columns={columns}
                  editable={{
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
                onClick={postData}
              >
                Add Product
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
          </form>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default ProductPopup;
