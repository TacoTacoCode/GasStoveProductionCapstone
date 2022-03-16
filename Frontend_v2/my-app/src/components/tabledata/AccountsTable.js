import React, { useState } from 'react';
import MaterialTable from 'material-table';
import AccountPopup from '../Popups/AccountPopup'


export const Table = (props) => {

    const { listAccount } = props;
    const array = [];

    listAccount.forEach(item => {
        array.push(item)
    });

    const [addAccountBtn, setaddAccountBtn] = useState(false);
    const columns = [
        {
            title: 'ID', field: 'accountId', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Worker Name', field: 'name', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Avatar', field: 'avatarUrl', render: rowData => <img style={{ height: '60px', width: '60px' }} src={rowData.avt} />, cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'Gender', field: 'gender', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Date of Birth', field: 'accountId', cellStyle: { fontFamily: 'Arial' }
        }
    ]
    return (
        <div>
            <AccountPopup trigger={addAccountBtn} setTrigger={setaddAccountBtn}>
                <h3 className='popuptitle'>Add an account</h3>
            </AccountPopup>
            <MaterialTable title={"List of Accounts"}
                data={array}
                columns={columns}
                onRowClick={(event, array) => {
                    setaddAccountBtn(true)
                }}
                editable={{
                    //     // onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                    //     //     const updatedData = [...data]
                    //     //     updatedData[updatedData.indexOf(oldRow)] = newRow
                    //     //     setData(updatedData)
                    //     //     setTimeout(() => resolve(), 500)
                    //     // }),
                    // onRowDelete: (selectedRow) => new Promise((resolve, reject) => {
                    //     const updatedData = [...data]
                    //     updatedData.splice(updatedData.indexOf(selectedRow), 1)
                    //     // setData(updatedData)
                    //     setTimeout(() => resolve(), 1000)
                    // }
                    //)
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