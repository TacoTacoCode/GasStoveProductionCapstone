import React, { useState } from 'react';
import MaterialTable from 'material-table';
import '../tabledata/TableDesign.css'

export const Table = () => {
    const [data, setData] = useState([
        { id: '123', sectionname: 'Hieu', materialid: '123', material: 'Ống gas', amount: '100', available: '500', status: 'pending' },
        { id: '124', sectionname: 'Taco', materialid: '123', material: 'Ống gas', amount: '200', available: '500', status: 'pending' },
        { id: '125', sectionname: 'Bò', materialid: '123', material: 'Ống gas', amount: '300', available: '500', status: 'pending' },
        { id: '126', sectionname: 'Trung', materialid: '123', material: 'Ống gas', amount: '400', available: '500', status: 'pending' },
    ])
    const columns = [
        {
            title: 'ID', field: 'id', cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'Section Name', field: 'sectionname', cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'Material Id', field: 'materialid', cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'Material Name', field: 'material', cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'Request Amount', field: 'amount', cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'Available Amount', field: 'available', cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'Status', field: 'status', cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
    ]
    return (
        <div>
            <MaterialTable title={"Material Requesting List"}
                data={data}
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