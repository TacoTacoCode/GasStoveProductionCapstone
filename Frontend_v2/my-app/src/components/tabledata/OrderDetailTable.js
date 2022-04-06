import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import * as FaIcons from 'react-icons/fa';
import {
    Button,
    TextField,
} from "@mui/material";
import { color } from '@mui/system';
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from 'axios';
import OrderPopup from "../Popups/OrderPopup";
import { styled } from '@material-ui/styles';
import OrderDetailEditPopup from '../Popups/OrderDetailEditPopup';

export const OrderDetailTable = (props) => {
    useEffect(() => {
        document.title = "UFA - Order Details"
    }, []);

    const [orderDetailId, setOrderDetailId] = useState();
    const [orderId, setOrderId] = useState();
    const [productId, setProductId] = useState();
    const [amount, setAmount] = useState();
    const [price, setPrice] = useState();
    const [note, setNote] = useState();
    // const [addcomponentBtn, setAddcomponentBtn] = useState(false);

    function createProcess(orderDetail) {
        // console.log({ orderDetail })
        // setOrderDetailId(orderDetail.orderDetailId);
        // setOrderId(orderDetail.orderId);
        // setProductId(orderDetail.productId);
        // setAmount(orderDetail.amount);
        // setPrice(orderDetail.price);
        // setNote(orderDetail.note);
        axios.post('https://localhost:5001/createProcess', {
            "orderDetailId": orderDetail.orderDetailId,
            "orderId": orderDetail.orderId,
            "productId": orderDetail.productId,
            "amount": orderDetail.amount,
            "price": orderDetail.price,
            "note": orderDetail.note
        })
            .then((response) => {
                //console.log(response.data);
                localStorage.setItem('process', JSON.stringify(response.data))
                navigate('/createProcess')
            }
            ).catch((err) => {
                console.log(err);
            })

    };


    let navigate = useNavigate();

    const { listOrderDetail } = props;
    const array = [];

    listOrderDetail.forEach(item => {
        array.push(item)
    }, []);
    // const routeChange = () => {
    //     let path = 'orderdetails';
    //     navigate(path);
    // }
    const columns = [
        {
            title: 'ID', field: 'orderDetailId', cellStyle: { fontFamily: 'Muli', width: "10%" }, align: 'left'
        },
        {
            title: 'Order ID', field: 'orderId', cellStyle: { fontFamily: 'Muli', width: "10%" }, align: 'left'
        },
        {
            title: 'Product ID', field: 'productId', cellStyle: { fontFamily: 'Muli', width: "15%" }, align: 'left'
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Muli', width: "15%" }, align: 'left'
        },
        {
            title: 'Price', field: 'price', cellStyle: { fontFamily: 'Muli', width: "20%" }, align: 'left'
        },
        {
            title: 'Note', field: 'note', cellStyle: { fontFamily: 'Muli', width: "20%" }, align: 'left'
        },
    ]

    const [editDatas, setEditDatas] = useState(null);
    const [open, setOpen] = useState(false);

    const handleEditData = (rowData) => {
        setEditDatas(rowData);
        setOpen(true);
        // axios.get("https://localhost:5001/getProducts/Active").then(
        //     (res) => setListProduct(res.data)
        // );
    }

    return (
        <div>
            <div className="back_button">
                <Button onClick={() => window.location.href = "http://localhost:3000/orders/"}>
                    <FaIcons.FaArrowLeft size={40} color="white" />
                </Button>
            </div>
            <MaterialTable title={"List of Order Details"}
                data={array}
                columns={columns}
                localization={{
                    header: {
                        actions: 'Create Process',
                    }
                }}
                // onRowClick={(event, data) => {
                //     // console.log("rowdata: " + data.totalprice);
                //     // <OrderDetails data={data} />
                //     navigate('/orderdetails', {state: data});
                // }}
                actions={[
                    {
                        icon: "edit",
                        tooltip: "Edit this order detail",
                        onClick: (event, rowData) => {
                            handleEditData(rowData);
                        },
                    },
                    {
                        icon: () => <AddBoxIcon />,
                        tooltip: 'Create Process(s) for this Order Detail',
                        onClick: (event, rowData) => {
                            //console.log(rowData);
                            createProcess(rowData);
                            // console.log("data: " + createProcess(rowData));
                            //navigate('/createProcess')
                            // setAddcomponentBtn(true);
                            // deleteComponent(rowData.componentId);
                            // window.location.reload();
                        }
                    }
                ]}
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff' }
                }} />
            {editDatas &&
                <OrderDetailEditPopup
                    data={editDatas}
                    setData={setEditDatas}
                    IsOpen={open}
                    setOpen={setOpen}
                >
                    <h3 className="popuptitle">Edit order detail : {editDatas.orderDetailId} </h3>
                </OrderDetailEditPopup>
            }
        </div>
    )
}