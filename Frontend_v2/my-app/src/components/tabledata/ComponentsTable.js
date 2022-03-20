import React, { useState } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

export const Table = (props) => {
    const { listComponent } = props;
    const array = [];

    listComponent.forEach(item => {
        array.push(item)
    });

    function deleteComponent(id) {
        axios.put('https://localhost:5001/delComponent/' + id)
            .then((response) => { console.log(response.data); }
            ).catch((err) => {
                console.log(err);
            })
    };

    const columns = [
        {
            title: 'Component ID', field: 'componentId', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Component Image', field: 'imageUrl', render: rowData => <img style={{ height: '70px', width: '70px' }} src={rowData.imageUrl} />, cellStyle: { fontFamily: 'Arial' }, align: "left"
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
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete Component',
                        onClick: (event, rowData) => deleteComponent(rowData.componentId)
                    }

                ]}
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', },
                }} />
        </div>
    )
}