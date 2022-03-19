import React, { useState } from 'react'
import './Popup.scss'
import CloseIcon from '@mui/icons-material/Close'
import { Button, InputAdornment, makeStyles, MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';

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


function ComponentPopup(props) {
  const [imageUrl, setComponentImage] = useState('');
  const [componentID, setComponentID] = useState('');
  const [componentName, setComponentName] = useState('');
  const [size, setComponentSize] = useState('');
  const [amount, setComponentAmount] = useState('');
  const [substance, setComponentSubstance] = useState('');
  const [weight, setComponentWeight] = useState('');
  const [color, setComponentColor] = useState('');
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
    axios.post("https://localhost:5001/addComponent", {
      componentID,
      componentName,
      amount,
      imageUrl,
      status,
      substance,
      size,
      color,
      weight,
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
            <div className='imagefield'>
              Component's Image
              <input type="file" onChange={saveFile} />
              <button onClick={uploadFile}>Upload</button>
            </div>
            <div className='idname'>
              <div className='idfield'>
                <CssTextField label="Component ID" id="fullWidth" required onChange={(e) => setComponentID(e.target.value)} />
              </div>
              <div className='namefield'>
                <CssTextField label="Component Name" id="fullWidth" required onChange={(e) => setComponentName(e.target.value)} />
              </div>
              <div className='idfield'>
                <CssTextField
                  label="Amount"
                  id="fullWidth"
                  required type={'number'}
                  InputProps={{
                    inputProps: { min: 0, pattern: '[0-9]*' }
                  }}
                  onChange={(e) => setComponentAmount(e.target.value)} />
              </div>
            </div>

            <div className='idname'>
              <div className='txtfield'>
                <CssTextField
                  label="Size"
                  id="fullWidth"
                  required type={'number'}
                  InputProps={{
                    inputProps: { min: 0, pattern: '[0-9]*' }
                  }}
                  onChange={(e) => setComponentSize(e.target.value)} />
              </div>
              <div className='txtfield'>
                <CssTextField
                  label="Weight"
                  id="fullWidth"
                  required type={'number'}
                  InputProps={{
                    inputProps: { min: 0, pattern: '[0-9]*' }
                  }}
                  onChange={(e) => setComponentWeight(e.target.value)} />
              </div>
              <div className='txtfield'>
                <CssTextField
                  label="Color"
                  onChange={(e) => setComponentColor(e.target.value)}
                />
              </div>
              <div className='txtfield'>
                <CssTextField
                  label="Substance"
                  onChange={(e) => setComponentSubstance(e.target.value)}
                />
              </div>
            </div>

            <div className='idname'>
              <div className='txtfield'>
                <CssTextField
                  label="Status"
                  select
                  id="fullWidth" required
                  onChange={(e) => setStatus(e.target.value)}
                  helperText="Choose component status"
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
              >Add Component</Button>
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

export default ComponentPopup