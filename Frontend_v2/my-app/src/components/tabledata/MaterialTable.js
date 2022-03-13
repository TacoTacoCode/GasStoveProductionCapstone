import React, { useState } from 'react';
import MaterialTable from 'material-table';


export const Table = (props) => {
    // const [data, setData] = useState([
    //     { id: '123', materialname: 'Hieu', materialimg: 'https://static.thenounproject.com/png/3262985-200.png', amount: '100', unit: '100' },
    //     { id: '124', materialname: 'Taco', materialimg: 'https://static.thenounproject.com/png/3262985-200.png', amount: '200', unit: '200' },
    //     { id: '125', materialname: 'Bò', materialimg: 'https://static.thenounproject.com/png/3262985-200.png', amount: '400', unit: '300' },
    //     { id: '126', materialname: 'Trung', materialimg: 'https://static.thenounproject.com/png/3262985-200.png', amount: '600', unit: '400' },
    // ])
    const { listMaterial } = props;
    const array = [];

    listMaterial.forEach(item => {
        array.push(item)
    });

    // const columns = [
    //     {
    //         title: 'ID', field: 'id', cellStyle: { fontFamily: 'Muli' }
    //     },
    //     {
    //         title: 'Material Name', field: 'materialname', cellStyle: { fontFamily: 'Muli' }
    //     },
    //     {
    //         title: 'Image', field: 'materialimg', render: rowData => <img style={{ height: '60px', width: '60px' }} src={rowData.materialimg} />, cellStyle: { fontFamily: 'Muli' }
    //     },
    //     {
    //         title: 'Unit', field: 'unit', cellStyle: { fontFamily: 'Muli' }
    //     },
    //     {
    //         title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Muli' }
    //     },
    // ]

    const columns = [
        {
            title: 'Name', field: 'name', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Email', field: 'email', cellStyle: { fontFamily: 'Muli' }
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