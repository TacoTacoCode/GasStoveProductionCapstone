import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
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
                        {
                            orderDetail.map(data => (
                                <Stack
                                    direction="row"
                                    divider={<Divider orientation="vertical" flexItem />}
                                    spacing={1}>
                                    <p className="content_delivery_content"><text style={{ fontWeight: "500" }}>Product: </text>&ensp;<text>{data.productId}</text></p>
                                    <p className="content_delivery_content"><text style={{ fontWeight: "500" }}>Amount: </text>&ensp;<text>{data.amount}</text></p>
                                    <p className="content_delivery_content"><text style={{ fontWeight: "500" }}>Price: </text>&ensp;<text>{data.price}</text></p>
                                    <p className="content_delivery_content"><text style={{ fontWeight: "500" }}>=</text>&ensp;<text>{data.price * data.amount} VND</text></p>
                                </Stack>
                            ))}

                    </div>
                    : <text className="caution-order-details">*Note: There are currently no products in this order!</text>
            }
        </div>
    );
}