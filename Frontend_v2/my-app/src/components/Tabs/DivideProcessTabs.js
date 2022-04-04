import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
// import Tab from "@material-ui/core/Tab";
// import Tabs from "@material-ui/core/Tabs";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '../NonSideBarPage/process.css'
import { Box, TextField } from '@material-ui/core';
import { List, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ImportExcelButton } from '../button/ImportExcelButton';
import axios from 'axios';
import { styled } from '@material-ui/styles';
import 'react-tabs/style/react-tabs.css';
import '../Tabs/tabs.css'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
function DivideProcessTabs() {
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

    const location = useLocation();
    const arr = location.state;
    var process = JSON.parse(localStorage['process'])
    var listProcesses = [];

    const [listProcessTest, setListProcessTest] = useState([...arr]);
    const [listProcess, setListProcess] = useState([]);

    const [toggleState, setToggleState] = useState(1);
    const toggleTab = (index) => {
        setToggleState(index);
    };

    const updateTotalAmountChanged = (e, index) => {
        var newArr = [...listProcess];
        newArr[index].totalAmount = parseInt(e.target.value);
        setListProcess(newArr);
    }

    const updateNeededAmountChanged = (e, index) => {
        var newArr = [...listProcess];
        newArr[index].neededAmount = parseInt(e.target.value);
        setListProcess(newArr);
    }

    const updateFinishedAmountChanged = (e, index) => {
        var newArr = [...listProcess];
        newArr[index].finishedAmount = parseInt(e.target.value);
        setListProcess(newArr);
    }

    const updateCreatedDateChanged = (index, date) => {
        var newArr = [...listProcess];
        newArr[index].createdDate = date;
        setListProcess(newArr);
        console.log(listProcess);
    }

    const updateExpiryDateChanged = (index, date) => {
        var newArr = [...listProcess];
        newArr[index].expiryDate = date
        setListProcess(newArr);
    }

    const updateFinishedDateChanged = (index, date) => {
        var newArr = [...listProcess];
        newArr[index].finishedDate = date
        setListProcess(newArr);
    }

    const updateExpectedFinishDateChanged = (index, date) => {
        var newArr = [...listProcess];
        newArr[index].expectedFinishDate = date
        setListProcess(newArr);
    }

    useEffect(() => {
        axios.post('https://localhost:5001/distribute', {
            "process": process,
            "ProcessAmmounts": arr,
        })
            .then((response) => {
                //setListProcessTest(response.data);
                // localStorage.setItem("listProcess", JSON.stringify(response.data));
                setListProcess(response.data)
            }
            ).catch((err) => {
                console.log(err);
            })
    }, [])

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

    return (
        // listProcesses = JSON.parse(localStorage.getItem("listProcess")),
        <>
            <div className="container">
                <div className="bloc-tabs">
                    {arr.map((e, index) => (
                        <button
                            className={toggleState === (index + 1) ? "tabs active-tabs" : "tabs"}
                            onClick={() => toggleTab(index + 1)}
                        >
                            Process {index + 1}
                        </button>
                    ))}
                </div>

                <div className="content-tabs">
                    {arr.map((e, index) => (
                        <div
                            className={toggleState === (index + 1) ? "content  active-content" : "content"}
                        >
                            <h2>Sub Process {index + 1}</h2>
                            <hr />
                            <div className='number'>
                                <div className='divnum'>
                                    <CssTextField variant="outlined" className='numberfield' type='number' label={'Total Amount ' + `${index + 1}`}
                                        defaultValue={listProcess[index] === undefined ? 0 : listProcess[index].totalAmount}
                                        onBlur={(e) =>
                                            updateTotalAmountChanged(e, index)
                                        }
                                    /></div>
                                <div className='divnum'>
                                    <CssTextField variant="outlined" className='numberfield' type='number' label={'Needed Amount ' + `${index + 1}`}
                                        defaultValue={listProcess[index] === undefined ? 0 : listProcess[index].neededAmount}
                                        onBlur={(e) =>
                                            updateNeededAmountChanged(e, index)
                                        }
                                    /></div>
                                <div className='divnum'>
                                    <CssTextField variant="outlined" color='secondary' className='numberfield' type='number' label={'Finished Amount ' + `${index + 1}`}
                                        defaultValue={listProcess[index] === undefined ? 0 : listProcess[index].finishedAmount}
                                        onBlur={(e) =>
                                            updateFinishedAmountChanged(e, index)
                                        }
                                    />
                                </div>
                            </div>
                            <div className='date1'>
                                <div className='divdate'>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                        inputFormat="MM/dd/yyyy"
                                        defaultValue={listProcess[index] === undefined ? 0 : listProcess[index].createdDate}
                                        value={listProcess[index] === undefined ? 0 : listProcess[index].createdDate}
                                        onChange={(date) => updateCreatedDateChanged(index, date)}
                                        renderInput={(params) => <CssTextField color='secondary' className='datefield' helperText="Created Date"
                                            variant="outlined" {...params} />}
                                    /></LocalizationProvider>
                                </div>
                                <div className='divdate'>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                        inputFormat="MM/dd/yyyy"
                                        defaultValue={listProcess[index] === undefined ? 0 : listProcess[index].expiryDate}
                                        value={listProcess[index] === undefined ? 0 : listProcess[index].expiryDate}
                                        onChange={(date) => updateExpiryDateChanged(index, date)}
                                        renderInput={(params) => <CssTextField color='secondary' className='datefield' helperText="Expiry Date"
                                            variant="outlined" {...params} />}
                                    /></LocalizationProvider>
                                </div>
                            </div>
                            <div className='date2'>
                                <div className='divdate'>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                        inputFormat="MM/dd/yyyy"
                                        defaultValue={listProcess[index] === undefined ? 0 : listProcess[index].finishedDate}
                                        value={listProcess[index] === undefined ? 0 : listProcess[index].finishedDate}
                                        onChange={(date) => updateFinishedDateChanged(index, date)}
                                        renderInput={(params) => <CssTextField color='secondary' className='datefield' helperText="Finished Date"
                                            variant="outlined" {...params} />}
                                    /></LocalizationProvider>
                                </div>
                                <div className='divdate'>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}><DatePicker
                                        inputFormat="MM/dd/yyyy"
                                        defaultValue={listProcess[index] === undefined ? 0 : listProcess[index].expectedFinishDate}
                                        value={listProcess[index] === undefined ? 0 : listProcess[index].expectedFinishDate}
                                        onChange={(date) => updateExpectedFinishDateChanged(index, date)}
                                        renderInput={(params) => <CssTextField color='secondary' className='datefield' helperText="Expected Finished Date"
                                            variant="outlined" {...params} />}
                                    /></LocalizationProvider>
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
            <ImportExcelButton type='submit' onClick={(e) => handleSave(e)}>Submit</ImportExcelButton>
        </>
    )
}


export default DivideProcessTabs