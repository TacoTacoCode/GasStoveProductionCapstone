
import { React, useEffect } from 'react'
import '../../../App.css';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import { OrderDetailTable } from '../../tabledata/OrderDetailTable';
import ComponentPopup from '../../Popups/ComponentPopup'
import { useState } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function OrderDetails() {
    const [addOrderDetailsBtn, setAddOrderDetailsBtn] = useState(false);
    const location = useLocation();
    const [listOrderDetail, setListOrderDetail] = useState([])
    const [listOrder, setListOrder] = useState([]);


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
            {/* <ComponentPopup trigger={addOrderDetailsBtn} setTrigger={setAddOrderDetailsBtn}>
                <h3>ComponentPopup</h3>
            </ComponentPopup> */}
            <div className='components'>
                <OrderDetailTable listOrderDetail={listOrderDetail} listOrder={listOrder} /></div></>
    )
}

export default OrderDetails