import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { useNavigate } from 'react-router-dom';
import OrderDetails from '../NonSideBarPage/OrderDetails';

export const Table = (props) => {
    const navigate = useNavigate();
    // let navigate = useNavigate();
    // const routeChange = () => {
    //     let path = 'orderdetails';
    //     navigate(path);
    // }
    const [data, setData] = useState([
        { id: 'Lê Hưng Thịnh', accountid: '123', expirydate: '123', totalprice: '123', status: '123', note: '123', category: '123' },
        { id: '123', accountid: '123', expirydate: '123', totalprice: '789', status: '123', note: '123', category: '123' }
    ])
    const columns = [
        {
            title: 'ID', field: 'id', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Account ID', field: 'accountid', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Expiry Date', field: 'expirydate', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Total Price', field: 'totalprice', cellStyle: { fontFamily: 'Muli' },
        },
        {
            title: 'Status', field: 'status', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Note', field: 'note', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Order Category', field: 'category', cellStyle: { fontFamily: 'Muli' }
        },
    ]
    return (
        <div>
            <MaterialTable title={"List of Orders"}
                data={data}
                columns={columns}
                onRowClick={(event, data) => {
                    // console.log("rowdata: " + data.totalprice);
                    // <OrderDetails data={data} />
                    navigate('/orderdetails', { state: data });
                }}
                // editable={{
                //     onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                //         const updatedData = [...data]
                //         updatedData[updatedData.indexOf(oldRow)] = newRow
                //         setData(updatedData)
                //         setTimeout(() => resolve(), 500)
                //     }),
                //     onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                //         const updatedData = [...data]
                //         updatedData.splice(updatedData.indexOf(selectedRow), 1)
                //         setData(updatedData)
                //         setTimeout(() => resolve(), 1000)
                //     }
                //     )
                // }
                // }
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }, selection: true,
                }} />
        </div>
    )
}