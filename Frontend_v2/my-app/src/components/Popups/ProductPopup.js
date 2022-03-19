import React, { useState } from 'react'
import './Popup.scss'
import CloseIcon from '@mui/icons-material/Close'
import { Button, InputAdornment, makeStyles, MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
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


function ProductPopup(props) {
  const [imageUrl, setProductImage] = useState('');
  const [productID, setProductID] = useState('');
  const [productName, setProductName] = useState('');
  const [price, setProductPrice] = useState('');
  const [amount, setProductAmount] = useState('');
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
    axios.post("https://localhost:5001/addProduct", {
      productID,
      productName,
      amount,
      price,
      imageUrl,
      status,
      description
    })
  }

  return (props.trigger) ? (
    <div className='Productpopup'>
      <div className='popup-inner'>
        <div><button className='close-btn' onClick={() => props.setTrigger(false)}>
          <CloseIcon style={{ 'color': "white", }} />
        </button></div>
        {props.children}
        <div className='popup-body'>
          <form>
            <div className='imagefield'>
              Product's Image
              <input type="file" onChange={saveFile} />
              <button onClick={uploadFile}>Upload</button>
            </div>
            <div className='idname'>
              <div className='idfield'>
                <CssTextField label="Product ID" id="fullWidth" required onChange={(e) => setProductID(e.target.value)} />
              </div>
              <div className='namefield'>
                <CssTextField label="Product Name" id="fullWidth" required onChange={(e) => setProductName(e.target.value)} />
              </div>
              <div className='idfield'>
                <CssTextField
                  label="Amount"
                  id="fullWidth"
                  required type={'number'}
                  InputProps={{
                    inputProps: { min: 0, pattern: '[0-9]*' }
                  }}
                  onChange={(e) => setProductAmount(e.target.value)} />
              </div>
            </div>

            <div className='idname'>
              <div className='txtfield'>
                <CssTextField
                  label="Price"
                  id="fullWidth"
                  required type={'number'}
                  InputProps={{
                    inputProps: { min: 0, pattern: '[0-9]*' }
                  }}
                  onChange={(e) => setProductPrice(e.target.value)} />
              </div>
              <div className='txtfield'>
                <CssTextField
                  label="Status"
                  select
                  id="fullWidth" required
                  onChange={(e) => setStatus(e.target.value)}
                  helperText="Choose product status"
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
              >Add Product</Button>
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

export default ProductPopup