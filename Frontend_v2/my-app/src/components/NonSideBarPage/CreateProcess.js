import React, { useState } from 'react'
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

    var process = JSON.parse(localStorage['process'])
    const [createdDate, setCreatedDate] = useState(process.createdDate)
    const [expectedFinishDate, setExpectedFinishDate] = useState(process.expectedFinishDate)
    const [expiryDate, setExpiryDate] = useState(process.expiryDate)
    const [finishedDate, setFinishedDate] = useState(process.finishedDate)
    const [divideProcess, setDivideProcess] = useState(false);
    const location = useLocation();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...values,
    //         showPassword: !values.showPassword,
    //     });
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    const ColorButton = styled(Button)(({ theme }) => ({
        color: '#fff',
        backgroundColor: '#e30217',
        '&:hover': {
            backgroundColor: ' rgba(227, 2, 23, 1.4)',
        },
    }));

    return (

        // <>
        //     <div className='App'>
        //         <h3>Create Process(s) for Order Detail {process.orderDetailId}</h3>
        //         <center>
        //             <FormControl>

        //             </FormControl>
        //         </center></div></>
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
                                defaultValue={process.orderDetailId} /></div>
                        <div className='divprocess'>
                            <CssTextField
                                className='processfield'
                                label="Process Id"
                                variant="outlined"
                                defaultValue={process.processId} /></div>
                    </div>
                    {/* <div className='mid1'>
                        <div className='divorderdetail'>
                            <CssTextField
                                className='orderdetail'
                                label="Order Detail"
                                variant="outlined"
                                defaultValue={process.orderDetail} /></div>
                    </div> */}
                    <div className='mid2'>
                        <div className='divprocess'>
                            <CssTextField
                                type='number'
                                className='processfield'
                                label="Total Amount"
                                variant="outlined"
                                defaultValue={process.totalAmount}
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
                                defaultValue={process.finishedAmount}
                                // value={process.finishedAmount}
                                InputProps={{
                                    endAdornment: <InputAdornment position="end">Unit</InputAdornment>,
                                }} /></div>
                        <div className='divprocess'>
                            <CssTextField
                                type='number'
                                className='processfield'
                                label="Needed Amount"
                                variant="outlined"
                                defaultValue={process.neededAmount}
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
                    {/* <div className='status'>
                        <CssTextField
                            className='processfield'
                            label="Status"
                            variant="outlined"
                            value={process.status}
                        /></div> */}
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
                            onClick={() => { }}>Submit</ImportExcelButton>}
                </form>
            </div >
        </>
    )
}

export default CreateProcess