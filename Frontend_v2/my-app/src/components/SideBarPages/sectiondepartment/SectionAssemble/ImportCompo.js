import React, { useState } from "react";
import MaterialTable from "material-table";
import { MenuItem, Select, TextField } from "@material-ui/core";
import DoneOutlineTwoToneIcon from '@mui/icons-material/DoneOutlineTwoTone';
import swal from "sweetalert";
import axios from "axios";

export const ImportCompo = (props) => {
    const datas = JSON.parse(localStorage.getItem('datas'))
    const [tableData, setTableData] = useState([])
    const [secInfo, setSecInfo] = useState(() => JSON.parse(localStorage['currentSectionInfo']));

    const columns = [
        {
            title: "Task Id",
            field: "processDetailId",
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
            render: (rowData) =>
                <Select
                    id="demo-simple-select"
                    disableUnderline
                    value={tableData[rowData.tableData.id].processDetailId}
                    onChange={(e) => handleChangeData(e.target.value, rowData.tableData.id)}
                >
                    {
                        datas.map((e) => (
                            <MenuItem
                                value={e.processDetailId}
                                key={e.processDetailId}
                                alignItems='center'
                            >
                                {e.processDetailId}
                            </MenuItem>))
                    }
                </Select>
        },
        {
            title: "Product Name",
            field: "productName",
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
            render: (e) => tableData[e.tableData.id].productName
        },
        {
            title: "Amount",
            field: "amount",
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
            render: (rowData) =>
                <TextField
                    value={tableData[rowData.tableData.id].amount}
                    type={"number"}
                    InputProps={{
                        disableUnderline: true,
                        inputProps: { min: 0 },
                    }}
                    onChange={(e) => handleChangeAmount(e.target.value, rowData.tableData.id)}
                />

        }
    ]
    const handleAddRow = () => {
        let arr = [...tableData]
        arr.push({
            'processDetailId': '',
            'productName': '',
            'amount': 0,
            'itemId': '',
        })
        setTableData(arr)
    }
    const handleChangeData = (value, index) => {
        let arr = [...tableData]
        const ele = findData(value)
        arr[index].processDetailId = value
        arr[index].productName = ele.product.productName
        arr[index].itemId = ele.product.productId
        setTableData(arr)
    }
    const findData = (value) => {
        let result = null
        for (let i = 0; i < datas.length; i++) {
            if (datas[i].processDetailId == value) {
                result = datas[i]
                break;
            }
        }
        return result
    }
    const handleChangeAmount = (value, index) => {
        let arr = [...tableData]
        if (value === '') {
            arr[index].amount = 0
        }
        else {
            let aValue = parseInt(value)
            if (arr[index].maxAmount < aValue) {
                arr[index].amount = arr[index].maxAmount
            }
            else if (0 > aValue) {
                arr[index].amount = 0
            }
            else {
                arr[index].amount = aValue
            }
        }
        setTableData(arr)
    }
    const generateSubmitData = () => {
        if (tableData.length == 0) {
            return []
        } else if (!tableData.every((value) => value.amount > 0 && value.processDetailId.toString().length > 0 && value.itemId.length > 0)) {
            return undefined
        }
        else {
            let arr = []
            tableData.map((value) => {
                let obj = arr.find((e) => (e.processDetailId === value.processDetailId && e.itemId === value.itemId))
                if (obj !== undefined) {
                    obj.amount += value.amount
                } else {
                    arr.push({
                        'processDetailId': value.processDetailId,
                        'amount': value.amount,
                        'itemId': value.itemId,
                    })
                }

            })
            return arr
        }
    }
    const handleSubmit = () => {
        const data = generateSubmitData();

        if (data == undefined) {
            swal("Warning", "Please fill all the field", "warning", {
                buttons: false,
                timer: 1500,
            })
        } else if (data.length == 0) {
            swal("Info", "There is nothing to submit", "info", {
                buttons: false,
                timer: 1500,
            })
        }
        else {
            const submitData = {
                "sectionId": secInfo.sectionId,
                "createdDate": new Date().toLocaleDateString(),
                "itemType": "P",
                'isImport': true,
                "importExportDetails": data
            }
            axios.post('https://localhost:5001/addImEx', submitData)
                .then(() => {
                    swal("Success", "Submit Data", "success", {
                        buttons: false,
                        timer: 1500,
                    }).then((e) => window.location.href = 'http://localhost:3000/section/processDetail')
                })
        }
    }
    const handleDelete = (index) => {
        let arr = [...tableData]
        arr.splice(index, 1)
        setTableData(arr)
    }


    return <div className="export" style={{ margin: "50px 20%" }}>
        {datas.length > 0 ?
            <MaterialTable
                title={"Import Prouduct Form"}
                data={tableData}
                columns={columns}
                actions={[
                    {
                        icon: 'add',
                        tooltip: 'Add a request',
                        isFreeAction: true,
                        onClick: () => handleAddRow()
                    },
                    {
                        icon: DoneOutlineTwoToneIcon,
                        tooltip: 'Submit this request',
                        isFreeAction: true,
                        onClick: () => handleSubmit()
                    },
                    rowData => ({
                        icon: 'delete',
                        tooltip: 'Delete this item',
                        onClick: () => handleDelete(rowData.tableData.id),
                    })
                ]}
                options={{
                    addRowPosition: "first",
                    actionsColumnIndex: -1,
                    exportButton: false,
                    search: false,
                    headerStyle: { backgroundColor: "#E30217", color: "#fff", textAlign: 'center' },
                }}
            /> : null}
    </div>
}