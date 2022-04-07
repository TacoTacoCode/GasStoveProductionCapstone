import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import * as FaIcons from 'react-icons/fa';
import {
    Button,
    TextField,
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import swal from "sweetalert";
import OrderDetailEditPopup from "../Popups/OrderDetailEditPopup";
import axios from 'axios';

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
            title: 'Price', field: 'price', cellStyle: { fontFamily: 'Muli', width: "15%" }, align: 'left'
        },
        {
            title: 'Note', field: 'note', cellStyle: { fontFamily: 'Muli', width: "20%" }, align: 'left'
        },
        {
            title: "No of process",
            field: "No_Process",
            cellStyle: { fontFamily: 'Muli', width: "20%" }, align: 'left'
        },
    ]

    function deleteOrderDetail(id) {
        axios
            .put("https://localhost:5001/delOrderDetail/" + id)
            .then((response) => {
                swal("Success", "Delete this Order Detail successfully", "success", {
                    button: false,
                    timer: 2000,
                });
            })
            .catch((err) => {
                swal("Error", "Delete this Order Detail failed", "error", {
                    button: false,
                    time: 2000,
                });
            });
    }

    const [editDatasDetail, setEditDatasDetail] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);
    const [newDataSubmitted, setNewDataSubmitted] = useState(1);

    const handleEditData = (rowData) => {
        setEditDatasDetail(rowData);
        setOpenDetail(true);
    }

    function getNoProcess(orderDetailId) {
        var noProcess = 0;
        try {
            axios.get("https://localhost:5001/getNoProcess/" + orderDetailId)
                .then((res) => {
                    noProcess = res.data;
                });
        } catch (e) {
            return 5;
        }
        return noProcess;
    }

    const newData = array.map((value) => ({ ...value, No_Process: getNoProcess(value.orderDetailId) }));

    return (
        <React.Fragment>
            <div className='caution-message'>
                <text>*Note: When you want to edit the item of order details, you have to delete this item and add the new one!</text>
            </div>
            <br />
            <div className="back_button">
                <Button onClick={() => window.location.href = "http://localhost:3000/orders/"}>
                    <FaIcons.FaArrowLeft size={40} color="white" />
                </Button>
            </div>
            <MaterialTable title={"List of Order Details"}
                data={newData}
                columns={columns}
                localization={{
                    header: {
                        actions: 'Actions',
                    }
                }}
                // onRowClick={(event, data) => {
                //     // console.log("rowdata: " + data.totalprice);
                //     // <OrderDetails data={data} />
                //     navigate('/orderdetails', {state: data});
                // }}
                actions={[
                    rowData => ({
                        icon: "delete",
                        tooltip: "Delete this item",
                        onClick: (event, rowData) => {
                            deleteOrderDetail(rowData.orderDetailId);
                            window.location.reload();
                        },
                        disabled: (rowData.isActive == false)
                    }),
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
                }}
            />

            {editDatasDetail &&
                <OrderDetailEditPopup
                    dataDetail={editDatasDetail}
                    setDataDetail={setEditDatasDetail}
                    IsOpenDetail={openDetail}
                    setOpenDetail={setOpenDetail}
                >
                    <h3 className="popuptitle">Edit order detail : {editDatasDetail.orderDetailId} </h3>
                </OrderDetailEditPopup>
            }
        </React.Fragment>
    )
}