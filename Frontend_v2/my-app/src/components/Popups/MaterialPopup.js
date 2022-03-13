import React, { useState } from 'react'
import './Popup.scss'
import CloseIcon from '@mui/icons-material/Close'
import { Button, InputAdornment, makeStyles, MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import UploadImages from '../upload-images.component';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const statuses = [
    {
        value: 'available',
        label: 'Available'
    },
    {
        value: 'unavailable',
        label: 'Unavailable'
    }
]

const CssTextField = styled(TextField)({
    'width': '100%',
    '& label.Mui-focused': {
        color: 'black',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#e30217',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'black',
        },
        '&:hover fieldset': {
            borderColor: '#e30217',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#e30217',
        },
    },
});

function MaterialPopup(props) {
    const [status, setStatus] = useState('available');
    const [finishedDate, setFinishedDate] = useState(null);
    const [exportDate, setExportDate] = useState(null);

    const handleChangeFinishedDate = (newValue) => {
        setFinishedDate(newValue);
    };

    const handleChangeExportDate = (newValue) => {
        setExportDate(newValue);
    };

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };


    return (props.trigger) ? (
        <div className='componentpopup'>
            <div className='popup-inner'>
                <div><button className='close-btn' onClick={() => props.setTrigger(false)}>
                    <CloseIcon style={{ 'color': "white", }} />
                </button></div>
                {props.children}
                <div className='popup-body'>
                    <form>
                        <div className='imagefield'>
                            Material's Image
                            <UploadImages id="fullWidth" required />
                        </div>
                        <div className='idname'>
                            <div className='idfield'>
                                <CssTextField label="Material ID" id="fullWidth" required />
                            </div>
                            <div className='namefield'>
                                <CssTextField label="Material Name" id="fullWidth" required />
                            </div>
                        </div>
                        <div className='idname'>
                            <div className='txtfield'>
                                <CssTextField label="Type" id="fullWidth" required />
                            </div>
                            <div className='txtfield'>
                                <CssTextField
                                    label="Amount"
                                    id="fullWidth"
                                    required type={'number'}
                                    InputProps={{
                                        inputProps: { min: 0, pattern: '[0-9]*' }
                                    }} />
                            </div>
                            <div className='txtfield'>
                                <CssTextField
                                    label="Status"
                                    select
                                    id="fullWidth" required
                                    value={status}
                                    onChange={handleChangeStatus}
                                    helperText="Choose material status"
                                >
                                    {statuses.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CssTextField>
                            </div>
                        </div>
                        <div className='txtfield'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Finished Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={finishedDate}
                                    onChange={handleChangeFinishedDate}
                                    renderInput={(params) => <CssTextField {...params} id="fullWidth" />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className='txtfield'>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                    label="Export Date"
                                    inputFormat="dd/MM/yyyy"
                                    value={exportDate}
                                    onChange={handleChangeExportDate}
                                    renderInput={(params) => <CssTextField {...params} id="fullWidth" />}
                                />
                            </LocalizationProvider>
                        </div>
                        <div className='btngr'>
                            <Button
                                variant="contained"
                                style={{ fontFamily: 'Muli', borderRadius: 10, backgroundColor: "#e30217", marginRight: '0.5rem' }}
                                size="large"
                            >Add Material</Button>
                            <Button
                                variant="contained"
                                style={{ fontFamily: 'Muli', borderRadius: 10, backgroundColor: "#e30217" }}
                                size="large" onClick={() => props.setTrigger(false)}
                            >Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : "";
}

export default MaterialPopup