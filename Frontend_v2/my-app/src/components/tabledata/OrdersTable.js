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

    // const date = new Date(array.expiryDate).toLocaleDateString;

    // const handleShowTable = () => {
    //     setOpenTable(true);
    // };

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
    return (
        <div>
            <MaterialTable title={"List of Orders"}
                data={array}
                columns={columns}
                onRowClick={(event, data) => {
                    console.log("aiujf: " + data.isShorTerm);
                    localStorage.setItem("orderType", data.isShorTerm)
                    // localStorage.setItem("orderid", data.accountid)
                    // console.log("OrderId: "+ localStorage.getItem("orderid"));
                    // handleShowTable();
                    navigate('/orders/orderdetails', { state: data });
                }}
                // onRowSelected
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }} />
            {/* {openTable
                ? <OrderDetailTable data={data.accountid} />
                : null
            } */}

        </div>
    )
}