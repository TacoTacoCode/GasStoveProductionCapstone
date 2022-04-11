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
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from "axios";
import swal from "sweetalert";

const columns = [
  {
    title: "ID",
    field: "productId",
    cellStyle: { fontFamily: "Arial" },
  },
  {
    title: "Amount",
    field: "amount",
    cellStyle: { fontFamily: "Arial" },
  },
  {
    title: "Price",
    field: "price",
    cellStyle: { fontFamily: "Arial" },
  },
  {
    title: "Note",
    field: "description",
    cellStyle: { fontFamily: "Arial" },
  },
];

const isShortTerms = [
  {
    value: true,
    label: "True",
  },
  {
    value: false,
    label: "False",
  }
];

const statuses = [
  {
    value: 'inprogress',
    label: 'In Progress'
  },
  {
    value: 'finished',
    label: 'Finished'
  }
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

// function createData(productId, amount, price, description) {
//   return { productId, amount, price, description };
// }

function OrderEditPopup(props) {
  const [accountId, setAccountId] = useState({ ...props.data.accountId });
  const [totalPrice, setTotalPrice] = useState({ ...props.data.totalPrice });
  const [expiryDate, setExpiryDate] = useState({ ...props.data.expiryDate });
  const [status, setStatus] = useState({ ...props.data.status });
  const [note, setNote] = useState({ ...props.data.note });
  const [isShorTerm, setIsShortTerm] = useState({ ...props.data.isShorTerm });

  //combobox
  const [accountEditList, setAccountEditList] = useState([{ ...props.customerActive }]);

  //select product
  const [orderProduct, setListOrderProduct] = useState({ ...props.orderProducts });
  const [listProductActive, setProductList] = useState([]);
  // const [productActive, setProductChoice] = useState(null);
  // const [productAmount, setOrderProductAmount] = useState(null);

  useEffect(() => {
    setAccountId(props.data.accountId);
  }, [props.data.accountId])

  useEffect(() => {
    setTotalPrice(props.data.totalPrice);
  }, [props.data.totalPrice])

  useEffect(() => {
    setExpiryDate(props.data.expiryDate);
  }, [props.data.expiryDate])

  useEffect(() => {
    setStatus(props.data.status);
  }, [props.data.status])

  useEffect(() => {
    setNote(props.data.note);
  }, [props.data.note])

  useEffect(() => {
    setIsShortTerm(props.data.isShorTerm);
  }, [props.data.isShorTerm])

  useEffect(() => {
    setListOrderProduct(props.orderProducts);
  }, [props.orderProducts])

  useEffect(() => {
    axios.get("https://localhost:5001/getProducts/Active").then((res) => {
      setProductList(res.data);
    });
  }, []);

  useEffect(() => {
    setAccountEditList(props.customerActive);
  }, [props.customerActive])


  const changeData = (e) => {
    e.preventDefault();
    const jsonObj = {
      orderId: props.data.orderId,
      accountId,
      totalPrice,
      expiryDate: new Date(expiryDate).toISOString(),
      status,
      note,
      isShorTerm,
      // orderDetail: orderProduct
      //   ? orderProduct?.map((item) => {
      //     return {
      //       productId: item.productId,
      //       amount: item.amount,
      //       price: item.price,
      //       note: item.description
      //     };
      //   })
      //   : [],
    }
    axios
      .put("https://localhost:5001/updateOrder", jsonObj)
      .then((res) => {
        swal("Success", "Update order successfully", "success", {
          button: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        swal("Error", "Update order failed", "error", {
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
  };

  const handleCancelClick = () => {
    setAccountId(props.data.accountId);
    setTotalPrice(props.data.totalPrice);
    setExpiryDate(props.data.expiryDate);
    setStatus(props.data.status);
    setNote(props.data.note);
    setIsShortTerm(props.isShorTerm);
    setListOrderProduct(props.orderProducts);
    setAccountEditList(props.customerActive);
    handleClose();
  };

  return props.IsOpen ? (
    <div className="orderpopup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setOpen(false)}>
            <CloseIcon style={{ color: "white" }} />
          </button>
        </div>
        {props.children}
        <div className="popup-body">
          <form>
            <br />
            <text className="content_choose">Order : </text>
            <div className="idname">
              <div className="datefield">
                <CssTextField
                  label="Customer"
                  id="fullWidth"
                  disabled
                  onChange={(e) => setAccountId(e.target.value)}
                  helperText="Choose customer"
                >

                </CssTextField>
              </div>
              <div className="idfield">
                <CssTextField
                  label="Total Price"
                  id="fullWidth"
                  value={totalPrice}
                  required
                  type={"number"}
                  InputProps={{
                    inputProps: { min: 0, pattern: "[0-9]*" },
                  }}
                  onChange={(e) => setTotalPrice(e.target.value)}
                />
              </div>
              <div className='datefield'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Expiry Date"
                    inputFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    required
                    selected={expiryDate}
                    onChange={(e) => setExpiryDate(e)}
                    value={expiryDate}
                    onSelect={(e) => setExpiryDate(e)}
                    renderInput={(params) => <CssTextField {...params} id="fullWidth" />}
                  />
                </LocalizationProvider>
              </div>
            </div>
            <div className="idname">
              {/* <div className='namefield'>
                <CssTextField
                  label="Status"
                  select
                  value={status}
                  id="fullWidth" required
                  onChange={(e) => setStatus(e.target.value)}
                  helperText="Choose Account status"
                >
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div> */}
              <div className='txtfield'>
                <CssTextField
                  label="Short Term"
                  select
                  value={isShorTerm}
                  id="fullWidth" required
                  onChange={(e) => setIsShortTerm(e.target.value)}
                >
                  {isShortTerms.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div>
              <div className="namefield">
                <CssTextField
                  label="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
            <br />
            <br />
            <text className="content_choose">Order Detail : </text>
            <div className="idname">
              {/* <div className="txtfield">
                <CssTextField
                  label="Product List"
                  select
                  id="fullWidth"
                  value={productActive}
                  onChange={(e) => setProductChoice(e.target.value)}
                  helperText="Choose Product"
                >
                  {listProductActive
                    .filter((item) => {
                      return !orderProduct.find(
                        (item2) => item2.productId === item.productId
                      );
                    })
                    .map((product) => (
                      <MenuItem key={product.productId} value={product}>
                        {product.productId}
                      </MenuItem>
                    ))}
                </CssTextField>
              </div>
              <div className="numfield">
                <CssTextField
                  label="Amount"
                  id="fullWidth"
                  value={productAmount}
                  type={"number"}
                  InputProps={{
                    inputProps: { min: 0, pattern: "[0-9]*" },
                  }}
                  onChange={(e) => setOrderProductAmount(e.target.value)}
                />
              </div>
              {productActive != null &&
                productAmount != null &&
                productAmount > 0 ? (
                <div className="button_field">
                  <Button
                    style={{
                      fontFamily: "Muli",
                      borderRadius: 10,
                      backgroundColor: "#e30217",
                      color: "white",
                    }}
                    onClick={() => {
                      setListOrderProduct((orderProduct) => [
                        ...orderProduct,
                        createData(
                          productActive.productId,
                          productAmount,
                          productActive.price,
                          productActive.description
                        ),
                      ]);
                      setOrderProductAmount(0);
                      setProductChoice(null);
                    }}
                  >
                    ADD
                  </Button>
                </div>
              ) : null} */}

              <div className="tablefield">
                <MaterialTable
                  data={orderProduct}
                  columns={columns}
                  // editable={{
                  //   onRowUpdate: (newData, oldData) =>
                  //     new Promise((resolve, reject) => {
                  //       setTimeout(() => {
                  //         const dataUpdate = [...orderProduct];
                  //         const index = oldData.tableData.id;
                  //         dataUpdate[index] = newData;
                  //         setListOrderProduct([...dataUpdate]);
                  //         resolve();
                  //       }, 1)
                  //     }),
                  //   onRowDelete: (oldData) =>
                  //     new Promise((resolve, reject) => {
                  //       setTimeout(() => {
                  //         const dataDelete = [...orderProduct];
                  //         const index = oldData.tableData.id;
                  //         dataDelete.splice(index, 1);
                  //         setListOrderProduct([...dataDelete]);
                  //         resolve();
                  //       }, 1);
                  //     }),
                  // }}
                  options={{
                    toolbar: false,
                    maxBodyHeight: 200,
                    search: false,
                    paging: false,
                    addRowPosition: "first",
                    actionsColumnIndex: -1,
                    showTitle: false,
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
                Edit Order
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

export default OrderEditPopup;