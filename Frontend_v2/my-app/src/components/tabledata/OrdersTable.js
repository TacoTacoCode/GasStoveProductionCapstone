import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { TextField } from '@mui/material';
import { styled } from '@material-ui/styles';
import OrderEditPopup from '../Popups/OrderEditPopup';
import axios from "axios";
import Bell from "../../img/bell.png";
import "../../styles/notifcation.css";
import { Tooltip } from '@material-ui/core';
import { TextGetSectionLeader } from "../NonSideBarPage/TextGetSectionLeader";

const CssTextField = styled(TextField)({
    width: "100%",
    "& .MuiOutlinedInput-root": {
        "& fieldset": {
            border: "none",
        },
    },
});
export const Table = (props) => {
    let navigate = useNavigate();
    const { listOrder } = props;
    const processingOrder = [];
    const waitOrder = [];
    listOrder.forEach(item => {
        if (item.status == "Waiting")
            waitOrder.push(item)
        else
            processingOrder.push(item)
    }, []);

    const columns = [
        {
            title: 'ID', field: 'orderId', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Account ID', field: 'accountId', cellStyle: { fontFamily: 'Muli' },
            render:
                rowData => (rowData.accountId != null)
                    ? <TextGetSectionLeader accountID={rowData.accountId} />
                    : "Unknown User"
        },
        {
            title: 'Expiry Date',
            field: 'expiryDate',
            cellStyle: { fontFamily: 'Muli' },
            render:
                rowData => moment(rowData.expiryDate).format('DD MMM, YYYY'),
        },
        {
            title: 'Total Price', field: 'totalPrice', cellStyle: { fontFamily: 'Muli' },
        },
        {
            title: 'Status', field: 'status', cellStyle: { fontFamily: 'Muli' },
            render:
                ((rowData) => {
                    switch (rowData.status) {
                        case 'new':
                            return <div style={{ fontWeight: "500", marginTop: "0.5%", float: 'left', border: '1px solid RED', backgroundColor: 'red' }} className="text_square">
                                <text style={{ color: 'white', fontWeight: "500" }}>NEW</text>
                            </div>
                        case 'processing':
                            return <div style={{ fontWeight: "500", marginTop: "0.5%", float: 'left', border: '1px solid DARKBLUE', backgroundColor: 'DARKBLUE' }} className="text_square">
                                <text style={{ color: 'white', fontWeight: "500" }}>PROCESSING</text>
                            </div>
                        case 'completed':
                            return <div style={{ fontWeight: "500", marginTop: "0.5%", float: 'left', border: '1px solid BLUE', backgroundColor: 'BLUE' }} className="text_square">
                                <text style={{ color: 'white', fontWeight: "500" }}>COMPLETED</text>
                            </div>
                        case 'delivery':
                            return <div style={{ fontWeight: "500", marginTop: "0.5%", float: 'left', border: '1px solid #99ff66', backgroundColor: '#99ff66' }} className="text_square">
                                <text style={{ color: 'white', fontWeight: "500" }}>DELIVERIED</text>
                            </div>
                    }
                })
        },
        {
            title: 'Note', field: 'note', cellStyle: { fontFamily: 'Muli' }
        },
    ]

    const [editDatas, setEditDatas] = useState(null);
    const [open, setOpen] = useState(false);
    const [orderProduct, setListOrderProduct] = useState([]);
    const [customerList, setCustomerList] = useState([]);
    const [seeWaiting, setSeeWaiting] = useState(false);
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

    return (<>

        {waitOrder.length > 0 && <div className="icon">
            <Tooltip className="icon" title={`You have ${waitOrder.length} new order(s)`}>
                <img src={Bell} className="iconImg" alt="" onClick={() => setSeeWaiting(prevState => !prevState)} />
            </Tooltip>
            <div className="counter">{waitOrder.length}</div>
        </div>}
        <React.Fragment>
            <MaterialTable title={"List of Orders"}
                data={seeWaiting ? waitOrder : processingOrder}
                columns={columns}
                onRowClick={(event, data) => {
                    console.log("test short term: " + data.isShorTerm);
                    localStorage.setItem("orderType", data.isShorTerm)
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
        </React.Fragment></>
    )
}