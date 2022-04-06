import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import {
    TextField,
    Button,
} from "@material-ui/core";
import './process.css'
import { InputAdornment } from '@mui/material';
import { styled } from '@material-ui/styles';
import '../button/button.css'
import { ImportExcelButton } from '../button/ImportExcelButton';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import MaterialPopup from '../Popups/DivideProcessPopup';
import DivideProcessPopup from '../Popups/DivideProcessPopup';
import axios from 'axios';
import MaterialTable from 'material-table';
import ProcessDetailTable from '../tabledata/ProcessDetailTable';

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
    const processDetail = process.processDetails;
    //console.log(processDetail);
    const [tableData, setTableData] = useState([])


    useEffect(() => {
        let datas = []
        let promises = processDetail.map((e, index) =>
            axios.get('https://localhost:5001/getCompos/sec/' + e.sectionId)
        )
        Promise.all(promises).then((e) => e.map((ele, index) =>
            datas.push({
                "componentName": ele.data.componentName ?? 'Assemble Section',
                "totalAmount": processDetail[index].totalAmount,
                "expiryDate": processDetail[index].expiryDate
            })
        )).then(() => {
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
    const [finishedDate, setFinishedDate] = useState(process.finishedDate)
    const [divideProcess, setDivideProcess] = useState(false);
    const location = useLocation();

    // const [sectionId, setSectionId] = useState([]);



    const listProcess = [
        orderDetailId,
        processId,
        totalAmount,
        finishedAmount,
        neededAmount,
        createdDate,
        expectedFinishDate,
        expiryDate,
        finishedDate
    ]

    // const [processDetail, setProcessDetail] = useState([]);

    const handleSave = (e) => {
        e.preventDefault();
        console.log(listProcess);
        axios({
            url: 'https://localhost:5001/addProcessList',
            method: 'POST',
            data: listProcess
        })
            .then((response) => {
                console.log(response.data);
            }).catch((err) => {
                console.log(err);
            })
    };


    const columns = [
        {
            title: 'Component Name', field: 'componentName', cellStyle: { fontFamily: 'Muli', width: "10%" }, align: 'left'
        },
        {
            title: 'Total Amount', field: 'totalAmount', cellStyle: { fontFamily: 'Muli', width: "10%" }, align: 'left'
        },
        {
            title: 'Expiry Date', field: 'expiryDate', cellStyle: { fontFamily: 'Muli', width: "15%" }, align: 'left'
        },
    ]

    return (
        <>
            <div className='boxprocess'
                component="form"
                noValidate
                autoComplete="off"
            >
                <h3 className='h3'>Create Process(s) for Order Detail {process.orderDetailId}</h3>
                <form className='formm'>
                    <div className='start'>
                        <div className='divprocess'>
                            <CssTextField
                                className='processfield'
                                label="Order Detail Id"
                                variant="outlined"
                                defaultValue={process.orderDetailId}
                            /></div>
                        <div className='divprocess'>
                            <CssTextField
                                className='processfield'
                                label="Process Id"
                                variant="outlined"
                                defaultValue={process.processId} /></div>
                    </div>
                    <div className='mid2'>
                        <div className='divprocess'>
                            <CssTextField
                                type='number'
                                className='processfield'
                                label="Total Amount"
                                variant="outlined"
                                defaultValue={totalAmount}
                                onChange={(e) => { setTotalAmount(e.target.value) }}
                                value={totalAmount}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Unit</InputAdornment>,
                                }}
                            /></div>
                        <div className='divprocess'>
                            <CssTextField
                                type='number'
                                className='processfield'
                                label="Finished Amount"
                                variant="outlined"
                                defaultValue={finishedAmount}
                                onChange={(e) => {
                                    setFinishedAmount(e.target.value)
                                }}
                                value={finishedAmount}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Unit</InputAdornment>,
                                }} /></div>
                        <div className='divprocess'>
                            <CssTextField
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
                                }} /></div>
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
                                defaultValue={expectedFinishDate}
                                value={expectedFinishDate}
                                onChange={date => setExpectedFinishDate(date)}
                                renderInput={(params) => <CssTextField color='secondary' className='datefield' helperText="Expected Finish Date"
                                    variant="outlined" {...params} />}
                            /></LocalizationProvider>
                            {/* <CssTextField type='date' className='datefield' variant="outlined" helperText="Expected Finish Date" /> */}
                        </div>
                        <div className='divprocess'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                inputFormat="MM/dd/yyyy"
                                defaultValue={expiryDate}
                                value={expiryDate}
                                onChange={date => setExpiryDate(date)}
                                renderInput={(params) => <CssTextField type='date' color='secondary' className='datefield' helperText="Expiry Date"
                                    variant="outlined" {...params} />}
                            /></LocalizationProvider>
                            {/* <CssTextField type='date' className='datefield' variant="outlined" helperText="Expiry Date" /> */}
                        </div>
                        <div className='divprocess'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                inputFormat="MM/dd/yyyy"
                                defaultValue={finishedDate}
                                value={finishedDate}
                                onChange={date => setFinishedDate(date)}
                                renderInput={(params) => <CssTextField type='date' color='secondary' className='datefield' helperText="Finish Date"
                                    variant="outlined" {...params} />}
                            /></LocalizationProvider>
                            {/* <CssTextField type='date' className='datefield' variant="outlined" helperText="Finished Date" /> */}
                        </div>
                    </div>
                    {console.log(tableData)}
                    <div className='processDetailTable'>
                        <MaterialTable title={"Process Details"}
                            data={tableData}
                            columns={columns}


                            options={{
                                addRowPosition: 'first',
                                actionsColumnIndex: -1,
                                exportButton: false,
                                headerStyle: { backgroundColor: '#E30217', color: '#fff' }
                            }} />
                    </div>

                    {/* <ProcessDetailTable listProcessDetail={tableData}/> */}

                    {localStorage.getItem("orderType") == 'true' ?
                        <><ImportExcelButton type="button"
                            onClick={() => {
                                setDivideProcess(true);
                            }
                            }>Divide Process</ImportExcelButton>
                            <DivideProcessPopup
                                trigger={divideProcess}
                                setTrigger={setDivideProcess}
                            >
                                <h3 className="popuptitle1">Enter the total amount for each sub process, separated by comma.</h3>
                            </DivideProcessPopup></>
                        : <ImportExcelButton type="submit"
                            onClick={(e) => handleSave(e)}>Submit</ImportExcelButton>}
                </form>
            </div >
        </>
    )
}

export default CreateProcess