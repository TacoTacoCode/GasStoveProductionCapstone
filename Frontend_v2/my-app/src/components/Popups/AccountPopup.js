import React, { useState } from 'react'
import './Popup.scss'
import CloseIcon from '@mui/icons-material/Close'
import { Button, InputAdornment, makeStyles, MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
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

const genders = [
  {
    value: true,
    label: 'Male'
  },
  {
    value: false,
    label: 'Female'
  }
]

//demo
const roles = [
  {
    value: 1,
    label: 'Role1'
  },
  {
    value: 2,
    label: 'Role2'
  },
  {
    value: 3,
    label: 'Role3'
  },
  {
    value: 4,
    label: 'Role4'
  }
]

//demo
const sections = [
  {
    value: 1,
    label: 'Section1'
  },
  {
    value: 2,
    label: 'Section2'
  },
  {
    value: 3,
    label: 'Section3'
  },
  {
    value: 4,
    label: 'Section4'
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


function AccountPopup(props) {
  const [avatarUrl, setAvatarUrl] = useState('');
  const [accountID, setAccountID] = useState('');
  const [accountName, setAccountName] = useState('');
  const [password, setAccountPassword] = useState('');
  const [email, setAccountEmail] = useState('');
  const [gender, setAccountGender] = useState(true);
  const [dateOfBirth, setAccountDateOfBirth] = useState(null);
  const [address, setAccountAddress] = useState('');
  const [phone, setAccountPhone] = useState('');
  const [roleID, setAccountRole] = useState('');
  const [sectionID, setAccountSection] = useState('');
  const [isActive, setStatus] = useState('Active');

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
    axios.post("https://localhost:5001/addAccount", {
      accountID,
      password,
      email,
      accountName,
      gender,
      dateOfBirth,
      address,
      phone,
      avatarUrl,
      roleID,
      sectionID,
      isActive
    })
  }

  return (props.trigger) ? (
    <div className='Accountpopup'>
      <div className='popup-inner'>
        <div><button className='close-btn' onClick={() => props.setTrigger(false)}>
          <CloseIcon style={{ 'color': "white", }} />
        </button></div>
        {props.children}
        <div className='popup-body'>
          <form>
            <div className='imagefield'>
              Account's Image
              <input type="file" onChange={saveFile} />
              <button onClick={uploadFile}>Upload</button>
            </div>
            <div className='idname'>
              <div className='namefield'>
                <CssTextField label="Account Name" id="fullWidth" required onChange={(e) => setAccountName(e.target.value)} />
              </div>
              <div className='txtfield'>
                <CssTextField
                  label="Gender"
                  select
                  id="fullWidth" required
                  onChange={(e) => setAccountGender(e.target.value)}
                  helperText="Choose gender"
                >
                  {genders.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div>
              <div className='txtfield'>
                <CssTextField
                  label="Phone"
                  id="fullWidth"
                  required type={'tel'}
                  InputProps={{
                    inputProps: { min: 0, max: 11, pattern: '[0-9]*' }
                  }}
                  onChange={(e) => setAccountPhone(e.target.value)} />
              </div>
            </div>
            <div className='idname'>
              <div className='txtfield'>
                <CssTextField label="Password" type={'password'} id="fullWidth" required onChange={(e) => setAccountPassword(e.target.value)} />
              </div>
              <div className='txtfield'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Day of Birth"
                    inputFormat="dd/MM/yyyy"
                    value={dateOfBirth}
                    onChange={(e) => setAccountDateOfBirth(e)}
                    renderInput={(params) => <CssTextField {...params} id="fullWidth" />}
                  />
                </LocalizationProvider>
              </div>
              <div className='txtfield'>
                <CssTextField
                  label="Status"
                  select
                  id="fullWidth" required
                  onChange={(e) => setStatus(e.target.value)}
                  helperText="Choose Account status"
                >
                  {statuses.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div>
            </div>
            <div className='idname'>
              <div className='txtfield'>
                <CssTextField label="Email" type={'email'} id="fullWidth" required onChange={(e) => setAccountEmail(e.target.value)} />
              </div>
              <div className='namefield'>
                <CssTextField label="Address" id="fullWidth" required onChange={(e) => setAccountAddress(e.target.value)} />
              </div>

            </div>
            <div className='idname'>
              <div className='txtfield'>
                <CssTextField
                  label="Role"
                  select
                  id="fullWidth" required
                  onChange={(e) => setAccountRole(e.target.value)}
                  helperText="Choose Role"
                >
                  {roles.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div>

              <div className='txtfield'>
                <CssTextField
                  label="Section"
                  select
                  id="fullWidth" required
                  onChange={(e) => setAccountSection(e.target.value)}
                  helperText="Choose Section"
                >
                  {sections.map((option) => (
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
                size="large" onClick={postData}>Add Account</Button>
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


export default AccountPopup