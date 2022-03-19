import React, { useState } from 'react'
import './Popup.scss'
import CloseIcon from '@mui/icons-material/Close'
import { Button, InputAdornment, makeStyles, MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';
import SingleImageUploadComponent from '../SingleImageUploadComponent'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';

const statuses = [
    {
        value: 'Active',
        label: 'Active'
    },
    {
        value: 'Unactive',
        label: 'Unactive'
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
    const [imageUrl, setMaterialImage] = useState('');
    const [materialID, setMaterialID] = useState('');
    const [materialName, setMaterialName] = useState('');
    const [unit, setMaterialUnit] = useState('');
    const [amount, setMaterialAmount] = useState('');
    const [status, setStatus] = useState('Active');
    const [description, setDescription] = useState('');

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
            const res = await axios.post(
                "http://localhost:3000/upload",
                formData
            );
            console.log(res);
        } catch (ex) {
            console.log(ex);
        }
    };

    const postData = () => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        axios.post("https://localhost:5001/addMaterial", {
            materialID,
            materialName,
            amount,
            unit,
            imageUrl,
            status,
            description
        })
    }

    return (props.trigger) ? (
        <div className='componentpopup'>
            <div className='popup-inner'>
                <div><button className='close-btn' onClick={() => props.setTrigger(false)}>
                    <CloseIcon style={{ 'color': "white", }} />
                </button></div>
                {props.children}
                <div className='popup-body'>
                    <form>
                        <div className='idname'>
                            <div className='imagefield'>
                                Material's Image
                                {/* <SingleImageUploadComponent /> */}
                                <input type="file" onChange={saveFile} />
                                <button onClick={uploadFile}>Upload</button>
                            </div>
                        </div>
                        <div className='idname'>
                            <div className='idfield'>
                                <CssTextField label="Material ID" id="fullWidth" required onChange={(e) => setMaterialID(e.target.value)} />
                            </div>
                            <div className='namefield'>
                                <CssTextField label="Material Name" id="fullWidth" required onChange={(e) => setMaterialName(e.target.value)} />
                            </div>
                            <div className='idfield'>
                                <CssTextField label="Unit" id="fullWidth" required onChange={(e) => setMaterialUnit(e.target.value)} />
                            </div>

                        </div>
                        <div className='idname'>
                            <div className='txtfield'>
                                <CssTextField
                                    label="Amount"
                                    id="fullWidth"
                                    required type={'number'}
                                    InputProps={{
                                        inputProps: { min: 0, pattern: '[0-9]*' }
                                    }}
                                    onChange={(e) => setMaterialAmount(e.target.value)} />
                            </div>
                            <div className='txtfield'>
                                <CssTextField
                                    label="Status"
                                    select
                                    id="fullWidth" required
                                    onChange={(e) => setStatus(e.target.value)}
                                    helperText="Choose material status"
                                >
                                    {statuses.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </CssTextField>
                            </div>
                            <div className='txtfield'>
                                <CssTextField
                                    label="Description"
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className='btngr'>
                            <Button
                                type='submit'
                                variant="contained"
                                style={{ fontFamily: 'Muli', borderRadius: 10, backgroundColor: "#e30217", marginRight: '0.5rem' }}
                                size="large" onClick={postData}
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