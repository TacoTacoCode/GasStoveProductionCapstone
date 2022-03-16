import React, { useState } from 'react';
import MaterialTable from 'material-table';


export const Table = (props) => {
    const { listMaterial } = props;
    const array = [];

    listMaterial.forEach(item => {
        array.push(item)
    });

    const columns = [
        {
            title: 'Material ID', field: 'materialId', cellStyle: { fontFamily: 'Arial', fontSize: "20px" }
        },
        {
            title: 'Image', field: 'imageUrl', render: rowData => <img style={{ height: '60px', width: '60px' }} src={rowData.imageUrl} />
        },
        {
            title: 'Material Name', field: 'materialName', cellStyle: { fontFamily: 'Arial', fontSize: "20px" }
        },
        {
            title: 'Unit', field: 'unit', cellStyle: { fontFamily: 'Arial', fontSize: "20px", fontWeight: "500" }
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Arial', fontSize: "20px" }
        },
    ]

    return (
        <div>
            <MaterialTable title={"List of Materials"}
                data={array}
                columns={columns}
                editable={{
                    onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                        const updatedData = [...array]
                        updatedData.splice(updatedData.indexOf(selectedRow), 1)
                        // setData(updatedData)
                        setTimeout(() => resolve(), 1000)
                    }
                    )
                }
                }
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }} />
        </div>
    )
}