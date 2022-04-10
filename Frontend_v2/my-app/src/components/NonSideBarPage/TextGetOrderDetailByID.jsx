import React, { useState, useEffect } from 'react'
import axios from 'axios';

export const TextGetOrderDetailByID = (props) => {
    const [orderDetail, setOrderDetail] = useState([]);

    useEffect(async () => {
        const res = await axios.get("https://localhost:5001/getOrderDetailsOf/ord/" + props.orderID);
        setOrderDetail(res.data);
    }, [])

    return (
        <div>
            {
                (orderDetail.length != 0)
                    ?
                    <div>
                        <p className="content_delivery_content"><text style={{ fontWeight: "500" }}>Product: </text>&ensp;<text>{orderDetail[0].productId}</text></p>
                        <p className="content_delivery_content"><text style={{ fontWeight: "500" }}>Amount: </text>&ensp;<text>{orderDetail[0].amount}</text></p>
                    </div>
                    : <text className="caution-order-details">*Note: There are currently no products in this order!</text>
            }
        </div>
    );
}