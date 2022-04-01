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
import ProductEditPopup from "../Popups/ProductEditPopup";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";

export const Table = (props) => {
  const { listProduct } = props;
  const array = [];

  listProduct.forEach((item) => {
    array.push(item);
  });

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
    {
      title: "Status",
      field: "status",
      render:
        rowData => (rowData.status == 'Inactive')
          ? <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
            <div>
              <AiFillCloseCircle size={40} />
            </div>
          </IconContext.Provider>
          : <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
            <div>
              <AiFillCheckCircle size={40} />
            </div>
          </IconContext.Provider >
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

  const [editDatas, setEditDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  const [productComponent, setListProductComponent] = useState([]);

  const [imageUrl, setProductImage] = useState("");
  const [productId, setProductID] = useState("");
  const [productName, setProductName] = useState("");
  const [price, setProductPrice] = useState("");
  const [amount, setProductAmount] = useState("");
  const [componentAmount, setComponentProductAmount] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");

  const handleEditData = (rowData) => {
    setEditDatas(rowData);
    setOpen(true);
    axios.get("https://localhost:5001/getCompoByProductId/" + rowData.productId).then(
      (res) => setListProductComponent(res.data)
    )
  }

  return (
    <React.Fragment>
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
              handleEditData(rowData);
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
      <ProductEditPopup
        productCompos={productComponent}
        data={editDatas}
        setData={setEditDatas}
        IsOpen={open}
        setOpen={setOpen}
        setSubmittedTime={() => {
          setNewDataSubmitted((prev) => prev + 1);
        }}
      >
        <h3 className="popuptitle">Edit component : {editDatas.productId} </h3>
      </ProductEditPopup>

    </React.Fragment>
  );
};
