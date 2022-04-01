import React, { useState, useEffect, useRef, useReducer, useCallback } from "react";
import "../../styles/Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  InputAdornment,
  makeStyles,
  MenuItem,
  TextField,
} from "@mui/material";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import { alpha, styled } from "@mui/material/styles";
import axios from "axios";
import swal from "sweetalert";

const statuses = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];

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
      borderColor: "#e30217",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#e30217",
    },
  },
});

function AccountEditPopup(props) {
  const [avatarUrl, setAvatarUrl] = useState({ ...props.data.avatarUrl });
  const [accountID, setAccountID] = useState({ ...props.data.accountId });
  const [accountName, setAccountName] = useState({ ...props.data.name });
  const [password, setAccountPassword] = useState({ ...props.data.password });
  const [email, setAccountEmail] = useState({ ...props.data.email });
  const [gender, setAccountGender] = useState({ ...props.data.gender });
  const [dateOfBirth, setAccountDateOfBirth] = useState({ ...props.data.dateOfBirth });
  const [address, setAccountAddress] = useState({ ...props.data.address });
  const [phone, setAccountPhone] = useState({ ...props.data.phone });
  const [roleID, setAccountRole] = useState({ ...props.data.roleId });
  const [sectionID, setAccountSection] = useState({ ...props.data.sectionId });
  const [isActive, setStatus] = useState({ ...props.data.isActive });

  const [roles, setRoleList] = useState([]);
  const [sections, setSectionList] = useState([]);

  useEffect(() => {
    setAvatarUrl(props.data.avatarUrl);
  }, [props.data.avatarUrl])

  useEffect(() => {
    setAccountID(props.data.accountId);
  }, [props.data.accountId])

  useEffect(() => {
    setAccountName(props.data.name);
  }, [props.data.name])

  useEffect(() => {
    setAccountPassword(props.data.password);
  }, [props.data.password])

  useEffect(() => {
    setAccountEmail(props.data.email);
  }, [props.data.email])

  useEffect(() => {
    setAccountGender(props.data.gender);
  }, [props.data.gender])

  useEffect(() => {
    setAccountDateOfBirth(props.data.dateOfBirth);
  }, [props.data.dateOfBirth])

  useEffect(() => {
    setAccountAddress(props.data.address);
  }, [props.data.address])

  useEffect(() => {
    setAccountPhone(props.data.phone);
  }, [props.data.phone])

  useEffect(() => {
    setAccountRole(props.data.roleId);
  }, [props.data.roleId])

  useEffect(() => {
    setAccountSection(props.data.sectionId);
  }, [props.data.sectionId])

  useEffect(() => {
    setStatus(props.data.isActive);
  }, [props.data.isActive])


  useEffect(() => {
    axios.get("https://localhost:5001/getRoles").then(res => {
      setRoleList(res.data)
    });
    axios.get("https://localhost:5001/getAllSections").then(res => {
      setSectionList(res.data)
    });
  }, [])

  // const [file, setFile] = useState();
  // const [fileName, setFileName] = useState("");

  const handlePreviewAvatar = (e) => {
    console.log(e.target.value);
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    // setMaterialImage(file);
    // setFile(e.target.files[0]);
    // setFileName(e.target.files[0].name);
    console.log(file.preview);
  };

  const changeData = (e) => {
    e.preventDefault();
    //thêm ảnh lên server
    //uploadFile();
    const jsonObj = {
      accountId: accountID,
      // password,
      email,
      name: accountName,
      gender,
      dateOfBirth: new Date(dateOfBirth).toISOString(), //convert to ISO string
      address,
      phone,
      avatarUrl: "string", //parse url here
      roleId: roleID,
      sectionId: sectionID,
      isActive: isActive === 'Active' ? true : false
    };
    console.log(JSON.stringify(jsonObj));
    axios
      .put("https://localhost:5001/updateAccount", jsonObj)
      .then((res) => {
        swal("Success", "Update account successfully", "success", {
          button: false,
          timer: 2000,
        });
        handleCancelClick();
      })
      .catch((err) => {
        swal("Error", "Update account failed", "error", {
          button: false,
          timer: 2000,
        });
      });
    handleClose();
  };

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  const handleClose = () => {
    props.setOpen(false);
    delay(function () { window.location.reload(); }, 1000);
  };

  const handleCancelClick = () => {
    setAccountID(props.data.accountId);
    setAccountName(props.data.name);
    setAccountPassword(props.data.password);
    setAccountEmail(props.data.email);
    setAccountGender(props.data.gender);
    setAccountDateOfBirth(props.data.dateOfBirth);
    setAccountAddress(props.data.address);
    setAccountPhone(props.data.phone);
    setAccountRole(props.data.roleId);
    setAccountSection(props.data.sectionId);
    setStatus(props.data.isActive);
    setAvatarUrl('');
    props.setOpen(false);
  };

  return props.IsOpen ? (
    <div className="componentpopup">
      <div className="popup-inner">
        <div>
          <button className="close-btn" onClick={() => props.setOpen(false)}>
            <CloseIcon style={{ color: "white" }} />
          </button>
        </div>
        {props.children}
        <div className="popup-body">
          <form>
            <div className="idname">
              <div className="imagefield">
                Account's Image
                <input type="file" onChange={handlePreviewAvatar} />
              </div>
            </div>
            <div>
              {avatarUrl ? (
                <img src={avatarUrl.preview} alt="avatar" width="100px" />
              ) : null}
            </div>
            <div className='idname'>
              <div className='namefield'>
                <CssTextField label="Account Name" value={accountName} id="fullWidth" required onChange={(e) => setAccountName(e.target.value)} />
              </div>
              <div className='txtfield'>
                <CssTextField
                  label="Gender"
                  select
                  value={gender}
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
                  value={phone}
                  required type={'tel'}
                  InputProps={{
                    inputProps: { min: 0, max: 11, pattern: '[0-9]*' }
                  }}
                  onChange={(e) => setAccountPhone(e.target.value)} />
              </div>
            </div>
            <div className='idname'>
              {/* <div className='txtfield'>
                <CssTextField label="Password" type={'password'} value={password} id="fullWidth" required onChange={(e) => setAccountPassword(e.target.value)} />
              </div> */}
              <div className='datefield'>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Day of Birth"
                    inputFormat="dd/MM/yyyy"
                    selected={dateOfBirth}
                    onChange={(e) => setAccountDateOfBirth(e)}
                    value={dateOfBirth}
                    onSelect={(e) => setAccountDateOfBirth(e)}
                    renderInput={(params) => <CssTextField {...params} id="fullWidth" />}
                  />
                </LocalizationProvider>
              </div>
              <div className='txtfield'>
                <CssTextField
                  label="Status"
                  select
                  id="fullWidth"
                  required
                  value={isActive}
                  selected={isActive}
                  onChange={(e) => setStatus(e.target.value)}
                  onSelect={(e) => setStatus(e.target.value)}
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
                <CssTextField label="Email" type={'email'} value={email} id="fullWidth" required onChange={(e) => setAccountEmail(e.target.value)} />
              </div>
              <div className='namefield'>
                <CssTextField label="Address" id="fullWidth" value={address} required onChange={(e) => setAccountAddress(e.target.value)} />
              </div>

            </div>
            <div className='idname'>
              <div className='txtfield'>
                <CssTextField
                  label="Role"
                  select
                  value={roleID}
                  id="fullWidth" required
                  onChange={(e) => setAccountRole(e.target.value)}
                  helperText="Choose Role"
                >
                  {roles.map((option) => (
                    <MenuItem key={option.roleId} value={option.roleId}>
                      {option.name}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div>

              <div className='txtfield'>
                <CssTextField
                  label="Section"
                  select
                  value={sectionID}
                  id="fullWidth" required
                  onChange={(e) => setAccountSection(e.target.value)}
                  helperText="Choose Section"
                >
                  {sections.map((option) => (
                    <MenuItem key={option.sectionId} value={option.sectionId}>
                      {option.sectionId}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div>
            </div>

            <div className="btngr">
              <Button
                type="submit"
                variant="contained"
                style={{
                  fontFamily: "Muli",
                  borderRadius: 10,
                  backgroundColor: "#e30217",
                  marginRight: "0.5rem",
                }}
                size="large"
                onClick={changeData}
              >
                Edit Account
              </Button>
              <Button
                variant="contained"
                style={{
                  fontFamily: "Muli",
                  borderRadius: 10,
                  backgroundColor: "#e30217",
                }}
                size="large"
                onClick={handleCancelClick}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div >
    </div >
  ) : (
    ""
  );
}

export default AccountEditPopup;