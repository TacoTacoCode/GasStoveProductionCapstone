import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import * as FaIcons from 'react-icons/fa';
import {
    Button,
    TextField,
    Typography,
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import swal from "sweetalert";
import OrderDetailEditPopup from "../Popups/OrderDetailEditPopup";
import axios from 'axios';
import { WarningAmber } from '@mui/icons-material';

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

    const columns = [
        {
            title: 'ID', field: 'orderDetailId', cellStyle: { fontFamily: 'Muli', fontSize: '18px' }, align: 'left'
        },
        {
            title: 'Order ID', field: 'orderId', cellStyle: { fontFamily: 'Muli', fontSize: '18px' }, align: 'left'
        },
        {
            title: 'Product ID', field: 'productId', cellStyle: { fontFamily: 'Muli', fontSize: '18px' }, align: 'left'
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Muli', fontSize: '18px' }, align: 'left'
        },
        {
            title: 'Price', field: 'price', cellStyle: { fontFamily: 'Muli', fontSize: '18px' }, align: 'left'
        },
        {
            title: 'Note', field: 'note', cellStyle: { fontFamily: 'Muli', fontSize: '18px' }, align: 'left'
        },
    ]
    function deleteOrderDetail(id) {
        axios.put("https://localhost:5001/delOrderDetail/" + id)
            .then((response) => {
                swal("Success", "Delete this Order Detail successfully", "success", {
                    button: false,
                    timer: 2000,
                });
            }).catch((err) => {
                swal("Error", "Delete this Order Detail failed", "error", {
                    button: false,
                    time: 2000,
                });
            })
        // .finally(function () {
        //     window.location.reload();
        // });
    }
    function confirmDelete(id) {
        let countProcess = getNoProcess(id)
        if (countProcess != 0) {
            let warning = `This order detail has ${countProcess} process(es)!\n` +
                'Once deleted, current processes will be shut down'
            swal({
                title: "Are you sure to delete this order?",
                text: warning,
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    deleteOrderDetail(id)
                }
            });
        } else {
            deleteOrderDetail(id)
        }
    }

    const [editDatasDetail, setEditDatasDetail] = useState(null);
    const [openDetail, setOpenDetail] = useState(false);

    const handleEditData = (rowData) => {
        setEditDatasDetail(rowData);
        setOpenDetail(true);
    }

    function getNoProcess(orderDetailId) {
        axios.get("https://localhost:5001/getNoProcess/" + orderDetailId)
            .then((res) => { return res.data })
    }

    const newData = array.map((value) => ({ ...value, No_Process: getNoProcess(value.orderDetailId) }));

    const MyNewTitle = ({ text = "Table Title", variant = "h6" }) => (
        <Typography
            variant={variant}
            style={{ color: '#333C83', fontFamily: 'Muli' }}
        >
            {text}
        </Typography>
    );

    return (
        <React.Fragment>
            <div className='caution-message'>
                <text>*Note: When you want to edit the item of order details, you have to delete this item and add the new one!</text>
            </div>
            <br />
            {/* <div className="back_button">
                <Button onClick={() => window.location.href = "http://localhost:3000/orders/"}>
                    <FaIcons.FaArrowLeft size={40} color="white" />
                </Button>
            </div> */}
            <MaterialTable title={<MyNewTitle variant="h6" text="Order Details List" />}
                data={newData}
                columns={columns}
                actions={[
                    rowData => ({
                        icon: "delete",
                        tooltip: "Delete this item",
                        onClick: (event, rowData) => {
                            confirmDelete(rowData.orderDetailId);
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
                    searchFieldVariant: 'outlined',
                    searchFieldStyle: {
                        fontFamily: 'Muli',
                        color: '#0E185F',
                        marginTop: '2%',
                        marginBottom: '2%',
                    },
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    actionsCellStyle: {
                        display: 'flex',
                        justifyContent: 'center',
                        width: '100%',
                    },
                    headerStyle: { backgroundColor: '#bd162c', color: '#fff', fontSize: '18px' }
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