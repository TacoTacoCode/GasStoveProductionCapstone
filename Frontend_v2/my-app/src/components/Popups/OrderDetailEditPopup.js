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

function OrderDetailEditPopup(props) {
  const [productId, setProductId] = useState({ ...props.data.productId });
  const [amount, setAmount] = useState({ ...props.data.amount });
  const [note, setNote] = useState({ ...props.data.note });

  //combobox
  const [productList, setProductList] = useState([{ ...props.customerActive }]);
  const [dataSet, setDataSet] = useState();

  useEffect(() => {
    setProductId(props.data.productId);
  }, [props.data.productId])

  useEffect(() => {
    setAmount(props.data.amount);
  }, [props.data.amount])

  useEffect(() => {
    setNote(props.data.note);
  }, [props.data.note])

  useEffect(() => {
    axios.get("https://localhost:5001/getProducts/Active").then((res) => {
      setProductList(res.data);
    });
    console.log(productList);
  }, []);

  const changeData = (e) => {
    e.preventDefault();
    const jsonObj = {
      orderDetailId: props.data.orderDetailId,
      orderId: props.data.orderId,
      productId,
      amount,
      price: props.data.price,
      note,
    }
    axios
      .put("https://localhost:5001/updateOrderDetail", jsonObj)
      .then((res) => {
        swal("Success", "Update order detail successfully", "success", {
          button: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        swal("Error", "Update order detail failed", "error", {
          button: false,
          timer: 2000,
        })
      }).finally(() => {
        handleCancelClick();
        window.location.reload();
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
    delay(function () { }, 1000);
  };

  const handleCancelClick = () => {
    setProductId(props.data.productId);
    setAmount(props.data.amount);
    setNote(props.data.note);
    setDataSet(null);

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
            <div className="idname">
              <div className="datefield">
                <CssTextField
                  label="Customer"
                  select
                  id="fullWidth"
                  value={productId}
                  required
                  disabled
                  onChange={(e) => setProductId(e.target.value)}
                >
                  {productList.map((option) => (
                    <MenuItem key={option.productId} value={option.productId}>
                      {option.productName}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div>
              <div className='idfield'>
                <CssTextField
                  label="Amount"
                  id="fullWidth"
                  value={amount}
                  required
                  type={"number"}
                  InputProps={{
                    inputProps: { min: 0, pattern: "[0-9]*" },
                  }}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className='idfield'>
                <CssTextField
                  label="Price"
                  id="fullWidth"
                  value={props.data.price}
                  disabled
                  required
                  type={"number"}
                  InputProps={{
                    inputProps: { min: 0, pattern: "[0-9]*" },
                  }}
                />
              </div>
              <div className="txtfield">
                <CssTextField
                  label="Note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
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

export default OrderDetailEditPopup;