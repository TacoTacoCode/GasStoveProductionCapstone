import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';

export const OrderDetailTable = (props) => {
    const [data1, setData1] = useState('');
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
            title: 'ID', field: 'orderDetailId', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Order ID', field: 'orderId', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Product ID', field: 'productId', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Price', field: 'price', cellStyle: { fontFamily: 'Muli' },
        },
        {
            title: 'Note', field: 'note', cellStyle: { fontFamily: 'Muli' }
        },
    ]
    return (
        <div>
            <MaterialTable title={"List of Order Details"}
                data={array}
                columns={columns}
                // onRowClick={(event, data) => {
                //     // console.log("rowdata: " + data.totalprice);
                //     // <OrderDetails data={data} />
                //     navigate('/orderdetails', {state: data});
                // }}
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }, selection: true,
                }} />
        </div>
    )
}