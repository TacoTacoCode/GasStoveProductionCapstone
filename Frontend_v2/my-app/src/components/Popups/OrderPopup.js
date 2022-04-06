import React, { useState, useEffect } from "react";
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
import { Checkbox } from "@material-ui/core";

function createData(productId, productName, amount, price, description) {
  return { productId, productName, amount, price, description };
}

const columns = [
  {
    title: "ID",
    field: "productId",
    cellStyle: { fontFamily: "Arial" },
  },
  {
    title: "Name",
    field: "productName",
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

function OrderPopup(props) {
  const [accountId, setAccountId] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [status, setStatus] = useState("inprogress");
  const [note, setNote] = useState("");
  const [isShorTerm, setIsShortTerm] = useState(true);

  //combobox
  const [accountList, setAccountList] = useState([]);

  //select product
  const [orderProduct, setListOrderProduct] = useState([]);
  const [listProductActive, setProductList] = useState([]);
  const [productActive, setProductChoice] = useState(null);
  const [productAmount, setOrderProductAmount] = useState(null);

  useEffect(() => {
    axios.get("https://localhost:5001/getProducts/Active").then((res) => {
      setProductList(res.data);
    });
    axios.get("https://localhost:5001/getAllAccounts")
      .then((res) => {
        for (let index = 0; index < res.data.length; index++) {
          if (res.data[index].roleId == "CUS") {
            accountList.push(res.data[index]);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Xảy ra lỗi");
      })
      .finally(() => {
        // console.log(accountList);
      })
  }, []);


  const postData = (e) => {
    // const formData = new FormData();
    // formData.append("accountId", accountId);
    // formData.append("totalPrice", totalPrice);
    // formData.append("expiryDate", expiryDate);
    // formData.append("status", status);
    // formData.append("note", note);
    // formData.append("isShorTerm", isShorTerm);
    const jsonObj = {
      accountId: accountId,
      totalPrice,
      expiryDate: new Date(expiryDate).toISOString(),
      status,
      note,
      isShorTerm,
      orderDetail: orderProduct
        ? orderProduct?.map((item) => {
          return {
            productId: item.productId,
            amount: item.amount,
            price: item.price,
            note: item.description
          };
        })
        : [],
    }
    axios.post("https://localhost:5001/addOrder", jsonObj)
      .then(res => {
        swal("Success", "Add new order successfully", "success", {
          buttons: false,
          timer: 2000,
        })
        //reset data
        handleCancelClick();
      }).catch(err => {
        swal("Error", "Add new order failed", "error", {
          buttons: false,
          timer: 2000,
        })
        console.log(err)
        window.location.reload();
      }).finally(() => {
        window.location.reload();
      });
  }

  const resetData = () => {
    //reset data
    setAccountId("");
    setTotalPrice("");
    setExpiryDate("");
    setStatus("inprogress");
    setNote("");
    setIsShortTerm(true);
    setOrderProductAmount("");
    setListOrderProduct([]);
    setProductChoice(null);
  };

  const handleCancelClick = () => {
    //reset data
    resetData();
    props.setTrigger(false);
  };

  return (props.trigger) ? (
    <div className="orderpopup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setTrigger(false)}>
            <CloseIcon style={{ color: "white" }} />
          </button>
        </div>
        {props.children}
        <div className="popup-body">
          <form>
            <div className="idname">
              <div className="datefield">
                <CssTextField
                  label="Customer"
                  select
                  id="fullWidth"
                  value={accountId}
                  required
                  onChange={(e) => setAccountId(e.target.value)}
                  helperText="Choose customer"
                >
                  {accountList.map((option) => (
                    <MenuItem key={option.accountId} value={option.accountId}>
                      {option.name}
                    </MenuItem>
                  ))}
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
              <div className='namefield'>
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
              </div>
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
            </div>
            <div className="idname">
              <div className="txtfield">
                <CssTextField
                  label="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                />
              </div>
            </div>
            <div className="idname">
              <div className="txtfield">
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
                          productActive.productName,
                          productAmount,
                          productActive.price,
                          ""
                        ),
                      ]);
                      setOrderProductAmount(0);
                      setProductChoice(null);
                    }}
                  >
                    ADD
                  </Button>
                </div>
              ) : null}
              <div className="tablefield">
                <MaterialTable
                  data={orderProduct}
                  columns={columns}
                  editable={{
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...orderProduct];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setListOrderProduct([...dataDelete]);
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
                Add Order
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

export default OrderPopup;
