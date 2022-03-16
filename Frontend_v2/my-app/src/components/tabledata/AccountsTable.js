import React, { useState } from 'react';
import MaterialTable from 'material-table';
import AccountPopup from '../Popups/AccountPopup'


export const Table = () => {
    const [addAccountBtn, setaddAccountBtn] = useState(false);
    const [data, setData] = useState([
        { id: '123', workername: 'Hieu', avt: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg', gender: 'Male', dob: '100' },
        { id: '124', workername: 'Taco', avt: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg', gender: 'Female', dob: '200' },
        { id: '125', workername: 'Bò', avt: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg', gender: 'Male', dob: '300' },
        { id: '126', workername: 'Trung', avt: 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg', gender: 'Female', dob: '400' },
    ])
    const columns = [
        {
            title: 'ID', field: 'id', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Worker Name', field: 'workername', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Avatar', field: 'avt', render: rowData => <img style={{ height: '60px', width: '60px' }} src={rowData.avt} />, cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Gender', field: 'gender', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Date of Birth', field: 'dob', cellStyle: { fontFamily: 'Muli' }
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
            <AccountPopup trigger={addAccountBtn} setTrigger={setaddAccountBtn}>
                <h3 className='popuptitle'>Add an account</h3>
            </AccountPopup>
            <MaterialTable title={"List of Accounts"}
                data={data}
                columns={columns}
                onRowClick={(event, data) => {
                    setaddAccountBtn(true)
                }}
                editable={{
                    // onRowUpdate: (newRow, oldRow) => new Promise((resolve, reject) => {
                    //     const updatedData = [...data]
                    //     updatedData[updatedData.indexOf(oldRow)] = newRow
                    //     setData(updatedData)
                    //     setTimeout(() => resolve(), 500)
                    // }),
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