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
  const { listProduct } = props;
  const array = [];

  listProduct.forEach((item) => {
    array.push(item);
  });

  function createData(componentId, componentName, amount) {
    return { componentId, componentName, amount };
  }

  const [productComponent, setListProductComponent] = useState([]);
  const [listComponentActive, setComponentList] = useState([]);
  const [componentActive, setComponentChoice] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:5001/getComponents/Active").then((res) => {
      setComponentList(res.data);
    });
  }, []);

  function deleteProduct(id) {
    axios
      .put("https://localhost:5001/delProduct/" + id)
      .then((response) => {
        swal("Success", "Delete Product successfully", "success", {
          button: false,
          timer: 2000,
        });
        props.setSubmittedTime();
      })
      .catch((err) => {
        swal("Error", "Delete Product failed", "error", {
          button: false,
          time: 2000,
        });
      });
  }

  const columns = [
    {
      title: "Product ID",
      field: "productId",
      cellStyle: { fontFamily: "Muli" },
    },
    {
      title: "Product Image",
      field: "imageUrl",
      render: (rowData) => (
        <img style={{ height: "70px", width: "70px" }} src={rowData.imageUrl} />
      ),
      cellStyle: { fontFamily: "Arial" },
      align: "left",
    },
    {
      title: "Product Name",
      field: "productName",
      cellStyle: { fontFamily: "Muli" },
    },
    {
      title: "Amount",
      field: "amount",
      cellStyle: { fontFamily: "Muli" },
    },
    {
      title: "Price",
      field: "price",
      cellStyle: { fontFamily: "Muli" },
    },
  ];

  const componentColumns = [
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
  const [imageUrl, setProductImage] = useState("");
  const [productId, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setProductPrice] = useState("");
  const [amount, setProductAmount] = useState("");
  const [componentAmount, setComponentProductAmount] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");

  const handleClickOpen = (product) => {
    setOpen(true);
    // setMaterial(material)
    setProductID(product.productId);
    setProductName(product.productName);
    setProductPrice(product.price);
    setProductAmount(product.amount);
    setStatus(product.status);
    setDescription(product.description);
  };

  const handleSaveData = (e) => {
    e.preventDefault();

    const jsonObj = {
      productId: productId,
      productName: productName,
      price: price,
      amount: amount,
      status: status,
      description: description,
      imageUrl: imageUrl,
      productComponents: productComponent?.map((item) => {
        return {
          productId: productId,
          componentId: item.componentId,
          amount: item.amount,
        };
      }),
    };
    axios
      .put("https://localhost:5001/updateProduct", jsonObj)
      .then((res) => {
        swal("Success", "Update product success", "success", {
          button: false,
          time: 2000,
        });
      })
      .catch((ex) => {
        swal("Error", "Update product fail", "error", {
          button: false,
          time: 2000,
        });
      });
    props.setSubmittedTime();
    handleClose();
    window.location.reload();
  };

  const handleClose = () => {
    setOpen(false);
    setListProductComponent([]);
  };

  return (
    <div>
      <MaterialTable
        title={"List of Products"}
        data={array}
        columns={columns}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete this Material",
            onClick: (event, rowData) => {
              deleteProduct(rowData.productId);
              window.location.reload();
            },
          },
          {
            icon: "edit",
            tooltip: "Edit this Component",
            onClick: (event, rowData) => {
              handleClickOpen(rowData);
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
        productId={productId}
        productName={productName}
        price={price}
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
            <h3 className="popuptitle">Edit material: {productId}</h3>
            <div className="popup-body">
              <form>
                <div className="idname">
                  <div className="idfield">
                    <CssTextField
                      label="Product ID"
                      id="fullWidth"
                      required
                      value={productId}
                    />
                  </div>
                  <div className="namefield">
                    <CssTextField
                      label="Product Name"
                      id="fullWidth"
                      required
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div className="idfield">
                    <CssTextField
                      label="Amount"
                      id="fullWidth"
                      required
                      type={"number"}
                      InputProps={{
                        inputProps: { min: 0, pattern: "[0-9]*" },
                      }}
                      value={amount}
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
                      type={"number"}
                      InputProps={{
                        inputProps: { min: 0, pattern: "[0-9]*" },
                      }}
                      value={price}
                      onChange={(e) => setProductPrice(e.target.value)}
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
                      id="description"
                      label="Description"
                      name="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="txtfield">
                  <CssTextField
                    label="Material Active List"
                    select
                    id="fullWidth"
                    value={componentActive}
                    onChange={(e) => setComponentChoice(e.target.value)}
                    helperText="Choose Active Material"
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
                            componentActive.componentName,
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
                    columns={componentColumns}
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
    </div>
  );
};
