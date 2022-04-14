import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { alpha, styled } from "@mui/material/styles";
import "../../App.css";
import "../../styles/Popup.scss";
import {
  TextField,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import ProductEditPopup from "../Popups/ProductEditPopup";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import Avatar from '@mui/material/Avatar';

export const Table = (props) => {
  const { listProduct } = props;
  const array = [];

  listProduct.forEach((item) => {
    array.push(item);
  });

  function deleteProduct(id) {
    swal({
      title: "Are you sure to delete this product?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          try {
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
          } catch (error) {
            console.log(error);
          }
          delay(function () { window.location.reload(); }, 1000);
        } else {
          swal({
            title: "Your Product is safe!",
            icon: "info",
          });
        }
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
        (rowData.imageUrl != null)
          ? <img style={{ height: "80px", width: "80px" }} src={"https://firebasestorage.googleapis.com/v0/b/gspspring2022.appspot.com/o/Images%2F" + rowData.imageUrl} />
          : <Avatar sx={{ width: 80, height: 80 }} variant="square" />
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
        rowData => (rowData.status == 'Unactive')
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

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  const [editDatas, setEditDatas] = useState(null);
  const [open, setOpen] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  const [productComponent, setListProductComponent] = useState([]);

  const handleEditData = (rowData) => {
    setEditDatas(rowData);
    setOpen(true);
    axios.get("https://localhost:5001/getProCompo/" + rowData.productId).then(
      (res) => setListProductComponent(res.data)
    )
  }

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  return (
    <React.Fragment>
      <MaterialTable
        title={"List of Products"}
        data={array}
        columns={columns}
        actions={[
          rowData => ({
            icon: "delete",
            tooltip: "Delete Product",
            onClick: (event, rowData) => {
              deleteProduct(rowData.productId);
            },
            disabled: (rowData.status == 'Unactive')
          }),
          {
            icon: "edit",
            tooltip: "Edit this Product",
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
      {editDatas &&
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
      }
    </React.Fragment>
  );
};
