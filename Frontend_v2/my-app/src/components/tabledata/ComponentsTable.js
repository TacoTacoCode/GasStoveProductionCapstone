import React, { useState } from 'react';
import MaterialTable from 'material-table';


export const Table = (props) => {
    const { listComponent } = props;
    const array = [];

    listComponent.forEach(item => {
        array.push(item)
    });

    const columns = [
        {
            title: 'Component ID', field: 'componentId', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Component Image', field: 'imageUrl',render: rowData => <img style={{ height: '70px', width: '70px' }} src={rowData.imageUrl} />, cellStyle: { fontFamily: 'Arial' }, align: "left"
        },
        {
            title: 'Component Name', field: 'componentName', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Unit', field: 'substance', cellStyle: { fontFamily: 'Arial' }
        },
    ]

    return (
        <div>
            <MaterialTable title={"List of Components"}
                data={array}
                columns={columns}
                editable={{
                    onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                        const updatedData = [...array]
                        updatedData[updatedData.indexOf(oldRow)] = newRow
                        // setData(updatedData)
                        setTimeout(() => resolve(), 500)
                    }),
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
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }, 
                }} />
        </div>
    )
}