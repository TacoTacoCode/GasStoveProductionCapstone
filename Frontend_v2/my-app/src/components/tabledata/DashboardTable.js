import React, { useState } from 'react';
import MaterialTable from 'material-table';
import '../tabledata/TableDesign.css'

export const Table = (props) => {

    const { listRequestMaterials } = props;
    const array = [];

    listRequestMaterials.forEach(item => {
        array.push(item)
    }, []);

    const columns = [
        {
            title: 'Request ID', field: 'importExportId', cellStyle: { fontFamily: 'Arial' }, align: "left"
        },
        {
            title: 'Section Id', field: 'sectionId', cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        // {
        //     title: 'Material Id', field: 'materialid', cellStyle: { fontFamily: 'Muli' }, align: "left"
        // },
        // {
        //     title: 'Material Name', field: 'material', cellStyle: { fontFamily: 'Muli' }, align: "left"
        // },
        // {
        //     title: 'Request Amount', field: 'amount', cellStyle: { fontFamily: 'Muli' }, align: "left"
        // },
        // {
        //     title: 'Available Amount', field: 'available', cellStyle: { fontFamily: 'Muli' }, align: "left"
        // },
        // {
        //     title: 'Status', field: 'status', cellStyle: { fontFamily: 'Muli' }, align: "left"
        // },
    ]
    return (
        <div>
            <MaterialTable title={"Material Requesting List"}
                data={array}
                columns={columns}
                actions={[
                    {
                        icon: 'check',
                        tooltip: 'Accept this Request',
                        onClick: (event, rowData) => {
                            // deleteComponent(rowData.componentId);
                            // window.location.reload();
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