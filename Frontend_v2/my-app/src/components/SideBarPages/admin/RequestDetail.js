import { styled } from '@material-ui/styles';
import { TextField, Tooltip, Typography } from '@mui/material';
import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import '../../NonSideBarPage/process.css'
import { BsFileEarmarkCheck } from 'react-icons/bs';
import swal from 'sweetalert';
function RequestDetail() {

    const CssTextField = styled(TextField)({
        width: "100%",
        "& label.Mui-focused": {
            color: "black",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#bd162c",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "black",
            },
            "&:hover fieldset": {
                borderColor: "#ff4747",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#bd162c",
            },
        },
    });


    const [requestDetail, setRequestDetail] = useState([])
    var itemType = localStorage.getItem('itemType')
    var importExportId = parseInt(localStorage.getItem('importExportId'))
    const [tableData, setTableData] = useState([])
    const [supplying, setSupplying] = useState([])

    const updateSupplyingAmountChanged = (e, index, max) => {
        let aValue = 0
        if (e.target.value != '')
            aValue = parseInt(e.target.value)
        aValue = aValue < 0 ? 0 : aValue
        aValue = aValue > max ? max : aValue
        let newArr = [...supplying];
        newArr[index] = aValue
        setSupplying(newArr);
    }

    useEffect(() => {
        console.log(importExportId);
        axios.get('https://localhost:5001/getDetailsOf/ImEx/' + importExportId)
            .then((response) => {
                setRequestDetail(response.data)
            }
            ).catch((err) => {
                console.log(err);
            })
    }, [])

    useEffect(() => {
        let datas = []
        let promises = requestDetail.length === 0 ? null : requestDetail.map((e, index) =>
            axios.get(itemType === 'M' ?
                ('https://localhost:5001/getMaterial/' + e.itemId) :
                ('https://localhost:5001/getComponent/' + e.itemId))
        )
        if (promises != null) {
            Promise.all(promises).then((e) => e.map((ele, index) =>
                itemType === 'M' ? (datas.push({
                    "materialName": ele.data.materialName,
                    "amount": requestDetail[index].amount,
                    "exportedAmount": requestDetail[index].exportedAmount,
                    "processDetailId": requestDetail[index].processDetailId,
                    "importExportDetailId": requestDetail[index].importExportDetailId,
                    "itemId": requestDetail[index].itemId
                })) : (datas.push({
                    "componentName": ele.data.componentName ?? 'Assemble Section',
                    "amount": requestDetail[index].amount,
                    "exportedAmount": requestDetail[index].exportedAmount,
                    "processDetailId": requestDetail[index].processDetailId,
                    "importExportDetailId": requestDetail[index].importExportDetailId,
                    "itemId": requestDetail[index].itemId
                }))
            )).then(() => {
                setTableData(datas)
            })
        }
    }, [requestDetail])


    const columns = [
        {
            title: 'Process Detail ID', field: 'processDetailId', cellStyle: { fontFamily: 'Muli', fontSize: '18px', paddingRight: '4%' }, align: "center"
        },
        {
            title: itemType === 'M' ? 'Material Name' : 'Component Name', field: itemType === 'M' ? 'materialName' : 'componentName', cellStyle: { fontFamily: 'Muli', fontSize: '18px', paddingRight: '3%' }, align: "center"
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Muli', fontSize: '18px', paddingRight: '4%' }, align: "center"
        },
        {
            title: 'Exported Amount', field: 'exportedAmount', cellStyle: { fontFamily: 'Muli', fontSize: '18px', paddingRight: '4%' }, align: "center",
            render: rowData => rowData.exportedAmount ?? 0
        },
        localStorage['currentRole'] === 'Section Department' ? {} : {
            title: 'Supplying Amount', field: 'supplyField',
            render: rowData => <Tooltip title={`Maximum is ${rowData.exportedAmount == undefined ? rowData.amount : rowData.amount - rowData.exportedAmount}`}>
                <CssTextField defaultValue={supplying[rowData.tableData.id] == 0 ? 0 : supplying[rowData.tableData.id]}
                    onBlur={(e) => updateSupplyingAmountChanged(e, rowData.tableData.id, rowData.exportedAmount == undefined ? rowData.amount : rowData.amount - rowData.exportedAmount)}
                    InputProps={{
                        inputProps: { min: 0, max: rowData.exportedAmount == undefined ? rowData.amount : rowData.amount - rowData.exportedAmount },
                    }}
                    disabled={rowData.amount == rowData.exportedAmount}
                    type='number' label="Supplying Amount" />
            </Tooltip>,
            cellStyle: { fontFamily: 'Muli' }, align: "center"
        },
    ]




    function handleAccept(data) {
        if (supplying[data.tableData.id] == 0)
            return
        axios.post('https://localhost:5001/provideItem', {
            "importExportId": importExportId,
            "itemId": data.itemId,
            "importExportDetailId": data.importExportDetailId,
            "processDetailId": data.processDetailId,
            "amount": data.amount,
            "itemType": itemType,
            "exportedAmount": supplying[data.tableData.id]
        }).then((response) => {
            if (response.data.includes('enough')) {
                swal("Warning", response.data, "warning");
            } else if (response.data.includes('exceed')) {
                swal("Warning", response.data, "warning");
            } else {
                window.location.reload();
            }

        }).catch((err) => {
            console.log(err)

        })
    };

    const MyNewTitle = ({ text = "Table Title", variant = "h6" }) => (
        <Typography
            variant={variant}
            style={{ color: '#333C83', fontFamily: 'Muli' }}
        >
            {text}
        </Typography>
    );
    return (
        <>
            <div className='tableRequestDetails'>
                <MaterialTable title={<MyNewTitle variant="h6" text="Requests Details List" />}
                    data={tableData}
                    columns={columns}
                    localization={{
                        header: {
                            actions: 'Accept'
                        },
                        body: {
                            editTooltip: "Edit Exported Amount"
                        }
                    }}

                    actions={localStorage['currentRole'] === 'Section Department' ? [] : [
                        rowData => ({
                            icon: () => <BsFileEarmarkCheck />,
                            tooltip: 'Accept this request',
                            disabled: rowData.amount == rowData.exportedAmount,
                            onClick: (event, rowData) => {
                                handleAccept(rowData)
                            }
                        })
                    ]}
                    options={{
                        searchFieldVariant: 'outlined',
                        searchFieldStyle: {
                            fontFamily: 'Muli',
                            color: '#0E185F',
                            marginTop: '2%',
                            marginBottom: '2%',
                        },
                        addRowPosition: 'first',
                        actionsColumnIndex: -1,
                        exportButton: false,
                        headerStyle: { backgroundColor: '#bd162c', color: '#fff', fontSize: '18px' },
                    }} />
            </div>
        </>
    )
}

export default RequestDetail