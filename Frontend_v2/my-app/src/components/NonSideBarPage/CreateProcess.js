import React, { useEffect, useState } from 'react'
import { TextField } from "@material-ui/core";
import './process.css'
import { InputAdornment } from '@mui/material';
import { styled } from '@material-ui/styles';
import '../button/button.css'
import { ImportExcelButton } from '../button/ImportExcelButton';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import DivideProcessPopup from '../Popups/DivideProcessPopup';
import axios from 'axios';
import MaterialTable from 'material-table';
import moment from 'moment';
import swal from 'sweetalert';
function CreateProcess() {

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

    var process = JSON.parse(localStorage.getItem('process'))
    const [tableData, setTableData] = useState([])


    useEffect(() => {
        const processDetail = process.processDetails;
        let datas = []
        let compos = {}
        let promises = processDetail.map((e) => {
            datas.push({ ...e })
            return axios.get('https://localhost:5001/getCompos/sec/' + e.sectionId)
        })
        Promise.all(promises).then((e) =>
            e.map((ele, index) => {
                datas[index].componentName = ele.data.componentName ?? 'Assemble Section'
                datas[index].componentImg = ele.data.imageUrl ?? 'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12'
                compos[processDetail[index].sectionId] = {
                    "componentName": ele.data.componentName ?? 'Assemble Section',
                    "componentImg": ele.data.imageUrl ?? 'no-image.jpg?alt=media&token=c45f5852-28eb-4b4d-87a8-2caefb10df12'
                }
            })
        ).then(() => {
            localStorage.setItem('listComponent', JSON.stringify(compos))
            console.log(datas)
            setTableData(datas)
        })
    }, [])

    const orderDetailId = process.orderDetailId
    const processId = process.processId


    const [totalAmount, setTotalAmount] = useState(process.totalAmount)
    const [finishedAmount, setFinishedAmount] = useState(process.finishedAmount)
    const [neededAmount, setNeededAmount] = useState(process.neededAmount)
    const [createdDate, setCreatedDate] = useState(process.createdDate)
    const [expectedFinishDate, setExpectedFinishDate] = useState(process.expectedFinishDate)
    const [expiryDate, setExpiryDate] = useState(process.expiryDate)
    const [status,] = useState(process.status)
    const [divideProcess, setDivideProcess] = useState(false);

    const listProcess = [
        {
            orderDetailId,
            processId,
            totalAmount,
            finishedAmount,
            neededAmount,
            createdDate,
            expectedFinishDate,
            expiryDate,
            status
        }
    ]
    const generateData = () => {
        let tmp = [...listProcess]
        tmp[0].processDetails = [...tableData]
        return tmp
    }
    const handleSave = (e) => {
        e.preventDefault();
        let datass = generateData()
        axios({
            url: 'https://localhost:5001/addProcessList',
            method: 'POST',
            data: datass
        }).then((response) => {
            swal("Success", "Submit Data", "success", {
                buttons: false,
                timer: 1500,
            }).then((e) => window.location.href = 'http://localhost:3000/orders/orderdetails')
        }).catch((err) => {
            alert('System error, try again later')
        })
    };
    const columns = [
        {
            title: 'Component Name', field: 'componentName', editable: 'false',
            cellStyle: { fontFamily: 'Muli', width: "25%" }, align: 'center'
        },
        {
            title: "Image", field: 'componentImg', align: 'center',
            cellStyle: { fontFamily: "Muli" }, editable: 'false',
            render: (rowData) =>
                <img src={`https://firebasestorage.googleapis.com/v0/b/gspspring2022.appspot.com/o/Images%2F${rowData.componentImg}`}
                    width="100px" height="100px" />
        },
        {
            title: 'Total Amount', field: 'totalAmount', editable: 'false',
            cellStyle: { fontFamily: 'Muli', width: "25%" }, align: 'center'
        },
        {
            title: 'Expiry Date', field: 'expiryDate', cellStyle: { fontFamily: 'Muli', width: "25%" }, align: 'center',
            type: 'date', editComponent: props => (
                < LocalizationProvider dateAdapter={AdapterDateFns} >
                    <DatePicker
                        inputFormat="MM/dd/yyyy"
                        value={props.rowData.expiryDate}
                        minDate={new Date(createdDate)}
                        maxDate={expiryDate == null ? null : new Date(expiryDate)}
                        onChange={(date) => {
                            let dateFm = moment(date).format('MM-DD-YYYY')
                            props.onChange(dateFm)
                        }}
                        renderInput={(params) =>
                            <CssTextField color='secondary' className='datefield' {...params} />}
                    /></LocalizationProvider >
            )
        },
    ]

    return (
        <>
            <div className='boxprocess'
                component="form"
                noValidate
                autoComplete="off"
            >
                <form className='formm'>
                    <div style={{ display: 'block', marginBottom: '5%' }}>
                        <h3 className='h3'>Create Process(s) for Order Detail {process.orderDetailId}</h3>
                        {localStorage.getItem("orderType") == 'false' ?
                            <><ImportExcelButton type="button"
                                onClick={() => {
                                    localStorage.setItem('orderDetail', JSON.stringify(listProcess[0]));
                                    //console.log(localStorage.getItem('orderDetail'));
                                    setDivideProcess(true);
                                }
                                }>Divide Process</ImportExcelButton>
                                <DivideProcessPopup
                                    listProcess={listProcess}
                                    trigger={divideProcess}
                                    setTrigger={setDivideProcess}
                                >
                                    <h3 className="popuptitle1">Enter the total amount for each sub process, separated by comma.</h3>
                                </DivideProcessPopup></>
                            : <ImportExcelButton type="submit"
                                onClick={(e) => handleSave(e)}>Submit</ImportExcelButton>}

                    </div>
                    {/* <div className='start'>
                        <div className='divprocess'>
                            <TextField
                                inputProps={{ readOnly: true, }}
                                className='processfield'
                                label="Order Detail Id"
                                variant="outlined"
                                defaultValue={process.orderDetailId}
                            /></div>
                        <div className='divprocess'>
                            <TextField
                                inputProps={
                                    { readOnly: true, }
                                }
                                className='processfield'
                                label="Process Id"
                                variant="outlined"
                                defaultValue={process.processId} />
                        </div>
                    </div> */}
                    <div className='mid2'>
                        <div className='divprocess'>
                            <TextField
                                type='number'
                                className='processfield'
                                label="Total Amount"
                                variant="outlined"
                                defaultValue={totalAmount}
                                onChange={(e) => setTotalAmount(e.target.value)}
                                value={totalAmount}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Unit</InputAdornment>,
                                }}
                            />
                        </div>
                        <div className='divprocess'>
                            <TextField
                                type='number'
                                className='processfield'
                                label="Needed Amount"
                                variant="outlined"
                                defaultValue={neededAmount}
                                onChange={(e) => {
                                    setNeededAmount(e.target.value)
                                }}
                                value={neededAmount}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Unit</InputAdornment>,
                                }} />
                        </div>
                        <div className='divprocess'>
                            <TextField
                                key={'finishedAmount'}
                                type='number'
                                className='processfield'
                                label="Finished Amount"
                                variant="outlined"
                                //value={finishedAmount}
                                defaultValue={finishedAmount}
                                onChange={(e) => {
                                    setFinishedAmount(e.target.value)
                                }}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Unit</InputAdornment>,
                                }} />
                        </div>

                    </div>
                    <div className='date'>
                        <div className='divprocess'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                inputFormat="MM/dd/yyyy"
                                defaultValue={createdDate}
                                value={createdDate}
                                onChange={date => setCreatedDate(date)}
                                renderInput={(params) => <CssTextField color='secondary' className='datefield' helperText="Created Date"
                                    variant="outlined" {...params} />}
                            /></LocalizationProvider>
                        </div>
                        <div className='divprocess'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                inputFormat="MM/dd/yyyy"
                                defaultValue={expiryDate}
                                value={expiryDate}
                                minDate={new Date(createdDate)}
                                onChange={date => setExpiryDate(date)}
                                renderInput={(params) => <CssTextField type='date' color='secondary' className='datefield' helperText="Expiry Date"
                                    variant="outlined" {...params} />}
                            /></LocalizationProvider>
                        </div>
                        <div className='divprocess'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                inputFormat="MM/dd/yyyy"
                                defaultValue={expectedFinishDate}
                                value={expectedFinishDate}
                                onChange={date => setExpectedFinishDate(date)}
                                renderInput={(params) => <CssTextField color='secondary' className='datefield' helperText="Expected Finished Date"
                                    variant="outlined" {...params} />}
                            /></LocalizationProvider>
                        </div>

                        {/* <div className='divprocess'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                inputFormat="MM/dd/yyyy"
                                defaultValue={finishedDate}
                                value={finishedDate}
                                onChange={date => setFinishedDate(date)}
                                renderInput={(params) => <CssTextField type='date' color='secondary' className='datefield' helperText="Finished Date"
                                    variant="outlined" {...params} />}
                            /></LocalizationProvider>
                        </div> */}
                    </div>
                    <div className='processDetailTable'>
                        <MaterialTable title={"Process Details"}
                            data={tableData}
                            columns={columns}
                            editable={{
                                onBulkUpdate: changes =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                let arr = [...tableData]
                                                Object.keys(changes).map((key) => {
                                                    arr[parseInt(key)] = changes[key].newData
                                                })
                                                setTableData(arr)
                                            }
                                            resolve();
                                        }, 500);
                                    }),
                                onRowUpdate: (newData, oldData) =>
                                    new Promise((resolve, reject) => {
                                        setTimeout(() => {
                                            {
                                                let arr = [...tableData]
                                                const indexDetail = oldData.tableData.id;
                                                arr[indexDetail] = newData
                                                setTableData(arr)
                                            }
                                            resolve();
                                        }, 500);
                                    }),
                            }}
                            options={{
                                addRowPosition: 'first',
                                actionsColumnIndex: -1,
                                exportButton: false,
                                headerStyle: { backgroundColor: '#E30217', color: '#fff' }
                            }} />
                    </div>
                </form>
            </div >
        </>
    )
}

export default CreateProcess