import React from 'react'
import './MaterialRequest.scss'
import CloseIcon from '@mui/icons-material/Close'
import { Button, InputAdornment, makeStyles, MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';


const statuses = [
    {
        value: 'inprogress',
        label: 'In Progress'
    },
    {
        value: 'finished',
        label: 'Finished'
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
    const [status, setStatus] = React.useState('inprogress');

    const handleChangeStatus = (event) => {
        setStatus(event.target.value);
    };


    return (props.trigger) ? (
        <div className='componentpopup'>
            <div className='popup-inner'>
                <div><button className='close-btn' onClick={() => props.setTrigger(false)}>
                    <CloseIcon style={{ 'color': "white", 'widtth': "100%", 'height': "100%", }} />
                </button></div>
                {props.children}
                <div className='popup-body'>
                    <form>
                        <div className='idname'>
                            <div className='idfield'>
                                <CssTextField label="Material ID" id="fullWidth" required />
                            </div>
                            <div className='namefield'>
                                <CssTextField label="Material Name" id="fullWidth" required />
                            </div>
                        </div>
                        <div className='sectionfield'>
                            <CssTextField label="Section Name" id="fullWidth" required />
                        </div>
                        <div className='idname'>
                            <div className='datefield'>
                                <CssTextField id="fullWidth" required type="date" helperText="Export Date" />
                            </div>
                            <div className='txtfield'>
                                <CssTextField
                                    label="Quantity"
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
                                    helperText="Choose form status"
                                >
                                    {statuses.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CssTextField>
                            </div>
                        </div>
                        <div className='btngr'>
                            <Button
                                variant="contained"
                                style={{ fontFamily: 'Muli', borderRadius: 10, backgroundColor: "#e30217", marginRight: '0.5rem' }}
                                size="large"
                            >Send Form</Button>
                            <Button
                                variant="contained"
                                style={{ fontFamily: 'Muli', borderRadius: 10, backgroundColor: "#e30217" }}
                                size="large"
                            >Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : "";
}

export default MaterialPopup