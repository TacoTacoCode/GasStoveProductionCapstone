import React, { useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export const Table = (props) => {
    const { listMaterial } = props;
    const array = [];

    listMaterial.forEach(item => {
        array.push(item)
    });

    function deleteMaterial(id) {
        axios.put('https://localhost:5001/delMaterial/' + id)
            .then((response) => { console.log(response.data); }
            ).catch((err) => {
                console.log(err);
            })
    };

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
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete this Material',
                        onClick: (event, rowData) => {
                            deleteMaterial(rowData.materialId);
                            window.location.reload();
                        }
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