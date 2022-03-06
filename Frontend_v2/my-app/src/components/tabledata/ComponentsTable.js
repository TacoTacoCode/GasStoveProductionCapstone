import React, { useState } from 'react';
import MaterialTable from 'material-table';


export const Table = () => {
    const [data, setData] = useState([
        { id: '123', componentname: 'Hieu', componentimg: 'https://i7.uihere.com/icons/64/348/833/replication-components-e8a65c404485d039363d58ae93c6af60.png', amount: '100' },
        { id: '124', componentname: 'Taco', componentimg: 'https://i7.uihere.com/icons/64/348/833/replication-components-e8a65c404485d039363d58ae93c6af60.png', amount: '200' },
        { id: '125', componentname: 'Bò', componentimg: 'https://i7.uihere.com/icons/64/348/833/replication-components-e8a65c404485d039363d58ae93c6af60.png', amount: '400' },
        { id: '126', componentname: 'Trung', componentimg: 'https://i7.uihere.com/icons/64/348/833/replication-components-e8a65c404485d039363d58ae93c6af60.png', amount: '600' },
    ])
    const columns = [
        {
            title: 'ID', field: 'id', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Component Name', field: 'componentname', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Image', field: 'componentimg', render: rowData => <img style={{ height: '60px', width: '60px' }} src={rowData.componentimg} />, cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Muli' }
        },
    ]
    return (
        <div>
            <MaterialTable title={"List of Products"}
                data={data}
                columns={columns}
                editable={{
                    onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                        const updatedData = [...data]
                        updatedData[updatedData.indexOf(oldRow)] = newRow
                        setData(updatedData)
                        setTimeout(() => resolve(), 500)
                    }),
                    onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                        const updatedData = [...data]
                        updatedData.splice(updatedData.indexOf(selectedRow), 1)
                        setData(updatedData)
                        setTimeout(() => resolve(), 1000)
                    }
                    )
                }
                }
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }, selection: true,
                }} />
        </div>
    )
}