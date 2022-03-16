import React, { useState } from 'react';
import MaterialTable from 'material-table';


export const Table = (props) => {
    const { listProduct } = props;
    const array = [];

    listProduct.forEach(item => {
        array.push(item)
    });

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
                editable={{
                    // onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                    //     const updatedData = [...array]
                    //     updatedData[updatedData.indexOf(oldRow)] = newRow
                    //     // setData(updatedData)
                    //     setTimeout(() => resolve(), 500)
                    // }),
                    onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                        const updatedData = [...array]
                        updatedData.splice(updatedData.indexOf(selectedRow), 1)
                        // setData(updatedData)
                        setTimeout(() => resolve(), 1000)
                    })
                }}
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }} />
        </div>
    )
}