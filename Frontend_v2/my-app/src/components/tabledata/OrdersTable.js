import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import OrderDetails from '../SideBarPages/orderdepartment/OrderDetails';
import { OrderDetailTable } from './OrderDetailTable';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { styled } from '@material-ui/styles';
import OrderEditPopup from '../Popups/OrderEditPopup';
import axios from "axios";

export const Table = (props) => {
    // const [openTable, setOpenTable] = React.useState(false);
    // const navigate = useNavigate();
    // const [data1, setData1] = useState('');
    let navigate = useNavigate();
    const CssTextField = styled(TextField)({
        width: "100%",
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                border: "none",
            },
        },
    });
    const { listOrder } = props;
    const array = [];

    listOrder.forEach(item => {
        array.push(item)
    }, []);

    const columns = [
        {
            title: 'ID', field: 'orderId', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Account ID', field: 'accountId', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Expiry Date', field: 'expiryDate', render:
                rowData => <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
                    disableOpenPicker
                    inputFormat="MM/dd/yyyy"
                    value={array[0].expiryDate}
                    renderInput={(params) => <CssTextField disabled {...params} />}
                /></LocalizationProvider>
            , cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Total Price', field: 'totalPrice', cellStyle: { fontFamily: 'Muli' },
        },
        {
            title: 'Status', field: 'status', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Note', field: 'note', cellStyle: { fontFamily: 'Muli' }
        },
        // {
        //     title: 'Order Category', field: 'category', cellStyle: { fontFamily: 'Muli' }
        // },
    ]

    const [editDatas, setEditDatas] = useState(null);
    const [open, setOpen] = useState(false);
    const [orderProduct, setListOrderProduct] = useState([]);
    const [customerList, setCustomerList] = useState([]);

    const handleEditData = (rowData) => {
        setEditDatas(rowData);
        setOpen(true);
        axios.get("https://localhost:5001/getOrderDetailsOf/ord/" + rowData.orderId).then(
            (res) => setListOrderProduct(res.data)
        );
        axios.get("https://localhost:5001/getAllAccounts")
            .then((res) => {
                for (let index = 0; index < res.data.length; index++) {
                    if (res.data[index].roleId == "CUS") {
                        customerList.push(res.data[index]);
                    }
                }
                console.log(customerList);
            })
            .catch((err) => {
                console.log(err);
                alert("Xảy ra lỗi");
            });
    }

    return (
        <React.Fragment>
            <MaterialTable title={"List of Orders"}
                data={array}
                columns={columns}
                onRowClick={(event, data) => {
                    console.log("test short term: " + data.isShorTerm);
                    localStorage.setItem("orderType", data.isShorTerm)
                    // localStorage.setItem("orderid", data.accountid)
                    // console.log("OrderId: "+ localStorage.getItem("orderid"));
                    // handleShowTable();
                    navigate('/orders/orderdetails', { state: data });
                }}
                actions={[
                    {
                        icon: "edit",
                        tooltip: "Edit this order",
                        onClick: (event, rowData) => {
                            handleEditData(rowData);
                        },
                    },
                ]}
                // onRowSelected
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }} />
            {editDatas &&
                <OrderEditPopup
                    customerActive={customerList}
                    orderProducts={orderProduct}
                    data={editDatas}
                    setData={setEditDatas}
                    IsOpen={open}
                    setOpen={setOpen}
                >
                    <h3 className="popuptitle">Edit order : {editDatas.orderId} </h3>
                </OrderEditPopup>
            }
        </React.Fragment>
    )
}