
import { React, useEffect } from 'react'
import '../../../App.css';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import { OrderDetailTable } from '../../tabledata/OrderDetailTable';
import OrderDetailPopup from '../../Popups/OrderDetailPopup';
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function OrderDetails() {
    const [addOrderDetailsBtn, setAddOrderDetailsBtn] = useState(false);
    const location = useLocation();
    const [listOrderDetail, setListOrderDetail] = useState([])
    const [listOrder, setListOrder] = useState([]);
    const [newDataSubmitted, setNewDataSubmitted] = useState(1);

    useEffect(() => {
        const getAllOrderDetail = 'https://localhost:5001/getOrderDetailsOf/ord/' + location.state.orderId
        //Gọi API bằng axios
        axios.get(getAllOrderDetail).then((res) => {
            setListOrderDetail(res.data);
        }).catch((err) => {
            console.log(err);
            alert("Xảy ra lỗi");
        })

    }, []);

    return (
        <>
            <ImportExcelButton type="button"
                onClick={() => {
                    setAddOrderDetailsBtn(true)
                }
                }>Add Order Detail</ImportExcelButton>
            <OrderDetailPopup
                orderId={location.state.orderId}
                trigger={addOrderDetailsBtn}
                setTrigger={setAddOrderDetailsBtn}
                setSubmittedTime={() => {
                    setNewDataSubmitted((prevState) => prevState + 1);
                }}>
                <h3 className="popuptitle">Add a Order Detail</h3>
            </OrderDetailPopup>
            <div className='components'>
                <OrderDetailTable listOrderDetail={listOrderDetail} listOrder={listOrder} />
            </div></>
    )
}

export default OrderDetails