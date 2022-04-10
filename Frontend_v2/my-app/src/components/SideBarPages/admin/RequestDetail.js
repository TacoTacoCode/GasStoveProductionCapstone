import { styled } from '@material-ui/styles';
import { InputAdornment, TextField } from '@mui/material';
import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ImportExcelButton } from '../../button/ImportExcelButton';
import '../../NonSideBarPage/process.css'
import CheckIcon from '@mui/icons-material/Check';
import { BsFileEarmarkCheck } from 'react-icons/bs';
function RequestDetail() {
    const location = useLocation();

    const CssTextField = styled(TextField)({
        width: "100%",
        "& label.Mui-focused": {
            color: "black",
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "#e30217",
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "black",
            },
            "&:hover fieldset": {
                borderColor: "#ff4747",
            },
            "&.Mui-focused fieldset": {
                borderColor: "#e30217",
            },
        },
    });
    

    const [requestDetail, setRequestDetail] = useState([])
    let check = []
    //location.state
   // console.log(location.state);
    var itemType = localStorage.getItem('itemType')
    var importExportId = parseInt(localStorage.getItem('importExportId'))
    const [tableData, setTableData] = useState([])
    const [supplying, setSupplying] = useState([])

    const updateSupplyingAmountChanged = (e, index) => {
        var newArr = [...supplying];
        newArr[index] = parseInt(e.target.value);
        setSupplying(newArr);
    }

    useEffect(() => {
        // if(requestDetail == 0)
      //  {
        console.log(importExportId);
            axios.get('https://localhost:5001/getDetailsOf/ImEx/' + importExportId)
            .then((response) => {
                console.log(response.data);
                setRequestDetail(response.data)
                console.log(requestDetail);
                // localStorage.setItem('itemType', itemType)
                // localStorage.setItem('importExportId', importExportId)
                // navigate('/requestDetail'
                //     //  , { state: check}
                // )
                // , { state: JSON.stringify(response.data)
                // console.log(JSON.stringify(response.data));
                //}
                // )
            }
            ).catch((err) => {
                console.log(err);
            })
        //}

    }, [])

    useEffect(() => {
        let datas = []
        let promises = requestDetail.length === 0 ? null : requestDetail.map((e, index) =>
            axios.get(itemType === 'M' ?
                ('https://localhost:5001/getMaterial/' + e.itemId) :
                ('https://localhost:5001/getComponent/' + e.itemId))
        )
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
    }, [requestDetail])


    const columns = [
        {
            title: 'Process Detail ID', field: 'processDetailId', cellStyle: { fontFamily: 'Arial', width: '15%' }, align: "left", editable: false
        },
        {
            title: itemType === 'M' ? 'Material Name' : 'Component Name', field: itemType === 'M' ? 'materialName' : 'componentName', cellStyle: { fontFamily: 'Arial', width: '20%' }, align: "left", editable: false
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Arial', width: '20%' }, align: "left", editable: false
        },
        {
            title: 'Exported Amount', field: 'exportedAmount', cellStyle: { fontFamily: 'Arial', width: '15%' }, align: "left"
        },
        {
            title: 'Supplying Amount', field: 'supplyField', render: rowData => <CssTextField defaultValue={supplying[rowData.tableData.id] == 0 ? 0 : supplying[rowData.tableData.id]}
                onBlur={(e) => updateSupplyingAmountChanged(e, rowData.tableData.id)}
                type='number' label="Supplying Amount" />,
            cellStyle: { fontFamily: 'Arial', width: '20%', padding: "1%" }, align: "left"
        }
    ]

    // const [exportDetailId, setExportDetailId] = useState(location.state.map(a => a.importExportDetailId))
    // const [exportId, setExportId] = useState(location.state.map(a => a.importExportId))
    // const [processDetailId, setProcessDetailId] = useState(location.state.map(a => a.processDetailId))
    // const [itemId, setItemId] = useState(location.state.map(a => a.itemId))
    // const [amount, setAmount] = useState(location.state.map(a => a.amount))
    // const [exportedAmount, setExportedAmount] = useState(location.state.map(a => a.exportedAmount))



    function handleAccept(data) {
        // const listAccept = {
        //     importExportId,
        //     data.itemId,
        //     data.importExportDetailId,
        //     data.processDetailId,
        //     data.amount,
        //     itemType,
        //     data.exportedAmount
        // }
        console.log("uiqfbiaf " + supplying);
        axios.post('https://localhost:5001/provideItem', {
            "importExportId": importExportId,
            "itemId": data.itemId,
            "importExportDetailId": data.importExportDetailId,
            "processDetailId": data.processDetailId,
            "amount": data.amount,
            "itemType": itemType,
            "exportedAmount": supplying[data.tableData.id]
        })
            .then((response) => {
                console.log(response.data);
                window.location.reload();
            }
            ).catch((err) => {
                console.log(err);
            })
    };

    // console.log(JSON.parse(location.state));

    // var importExport = JSON.parse(localStorage.getItem('importExport'))
    // console.log(location.state.importExportId);
    return (
        <>
            <div className='tableRequestDetails'>
                <MaterialTable title="Request Details"
                    data={tableData}
                    columns={columns}
                    localization={{
                        header: {
                            actions: 'Accept Request'
                        },
                        body: {
                            editTooltip: "Edit Exported Amount"
                        }
                    }}

                    actions={[
                        {
                            icon: () => <BsFileEarmarkCheck />,
                            tooltip: 'Accept this request',
                            onClick: (event, rowData) => {
                                handleAccept(rowData)
                                //console.log(rowData);
                                // createProcess(rowData);
                                // conszole.log("data: " + createProcess(rowData));
                                //navigate('/createProcess')
                                // setAddcomponentBtn(true);
                                // deleteComponent(rowData.componentId);
                                // window.location.reload();
                            }
                        }
                    ]}
                    options={{

                        addRowPosition: 'first',
                        actionsColumnIndex: -1,
                        exportButton: false,
                        headerStyle: { backgroundColor: '#E30217', color: '#fff' },
                        paging: true,
                        pageSizeOptions: [7, 20, 30, 40, 50, 60, 70, 80, 90, 100],
                        pageSize: 7
                    }} />
            </div>
        </>
    )
}

export default RequestDetail