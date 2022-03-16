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
            title: 'ID', field: 'materialId', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Name', field: 'materialName', cellStyle: { fontFamily: 'Muli' }
        },
    ]

    return (
        <div>
            <MaterialTable title={"List of Materials"}
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
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }} />
        </div>
    )
}