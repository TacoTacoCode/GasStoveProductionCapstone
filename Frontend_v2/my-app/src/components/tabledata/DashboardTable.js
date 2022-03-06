import React, { useState } from 'react';
import MaterialTable from 'material-table';


export const Table = () => {
    const [data, setData] = useState([
        { id: '123', workername: 'Hieu', material: 'Ống gas', amount: '100' },
        { id: '124', workername: 'Taco', material: 'Ống gas', amount: '200' },
        { id: '125', workername: 'Bò', material: 'Ống gas', amount: '300' },
        { id: '126', workername: 'Trung', material: 'Ống gas', amount: '400' },
    ])
    const columns = [
        {
            title: 'ID', field: 'id', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Worker Name', field: 'workername', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Material', field: 'material', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Muli' }
        },
        // {
        //     title:'Detail', field:'workername'
        // },
        // {
        //     title:'Worker Name', field:'workername'
        // }
    ]
    return (
        <div>
            <MaterialTable title={"Material Requesting List"}
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
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }} />
        </div>
    )
}