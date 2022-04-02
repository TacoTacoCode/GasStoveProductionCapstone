import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import '../NonSideBarPage/process.css'
import { Box, TextField } from '@material-ui/core';
import { Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { ImportExcelButton } from '../button/ImportExcelButton';
import axios from 'axios';

function DivideProcessTabs() {
    localStorage.removeItem("listProcess")
    const location = useLocation();
    const [aValue, setAValue] = useState(0);
    const arr = location.state;
    var process = JSON.parse(localStorage['process'])
    var listProcesses = [];

    axios.post('https://localhost:5001/distribute', {
            "process": process,
            "ProcessAmmounts": arr,
        })
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("listProcess", JSON.stringify(response.data));
                //listProcesses = response.data
            }
            ).catch((err) => {
                console.log(err);
            })
    return (
        //console.log(listProcesses),
        listProcesses = JSON.parse(localStorage.getItem("listProcess")),
        <>
            <Tabs
                variant="scrollable"
                scrollButtons="on"
                className='tabss'
                value={aValue}
                textColor="primary"
                indicatorColor="primary"
                onChange={(event, newValue) => {
                    setAValue(newValue);
                }}>
                {arr.map((e, index) => (
                    <Tab className='tabb' label={'Sub Process ' + `${index + 1}`}
                    />
                ))}
            </Tabs>
            {arr.map((e, index) => (
                <TabPanel key={index} value={aValue} index={index}>
                    <form key={index}>
                        {/* {totalAmount.map((e, index) => ( */}
                        <TextField key={index} label={'tab' + `${index + 1}`}
                            defaultValue={listProcesses[index].totalAmount}
                        // onBlur={e => {
                        //  process[index].Total = e.target.valuye
                        //    totalAmount.push(e.target.value);
                        //    console.log("foiqwf:" + totalAmount[index]);
                        // }
                        // }
                        />
                        {/* ))} */}
                        {/* <TextField label={'tab' + `${index + 1}`}
                        value={tabValue}
                        onChange={e => {
                            setTabValue(e.target.value);
                        }}/> */}
                    </form>
                </TabPanel>

            ))}
        </>
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            style={{ backgroundColor: "#fff", height: '80vh' }}
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

export default DivideProcessTabs