import React, { useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export const Table = (props) => {
    const { listProduct } = props;
    const array = [];

    listProduct.forEach(item => {
        array.push(item)
    });

    function deleteProduct(id) {
        axios.put('https://localhost:5001/delProduct/' + id)
            .then((response) => {
                console.log(response.data);
                console.log("ID: " + id);
            }
            ).catch((err) => {
                console.log(err);
            })
    };

    const columns = [
        {
            title: 'Product ID', field: 'productId', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Product Image', field: 'imageUrl', render: rowData => <img style={{ height: '70px', width: '70px' }} src={rowData.imageUrl} />, cellStyle: { fontFamily: 'Arial' }, align: "left"
        },
        {
            title: 'Product Name', field: 'productName', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Price', field: 'price', cellStyle: { fontFamily: 'Muli' }
        },

    ]

    return (
        <div>
            <MaterialTable title={"List of Products"}
                data={array}
                columns={columns}
                // editable={{
                // onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                //     const updatedData = [...array]
                //     updatedData[updatedData.indexOf(oldRow)] = newRow
                //     // setData(updatedData)
                //     setTimeout(() => resolve(), 500)
                // }),
                // onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                //     const updatedData = [...array]
                //     updatedData.splice(updatedData.indexOf(selectedRow), 1)
                //     // setData(updatedData)
                //     setTimeout(() => resolve(), 1000)
                // })
                // }}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete Product',
                        onClick: (event, rowData) => deleteProduct(rowData.productId)
                    }

                ]}
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }} />
        </div>
    )
}