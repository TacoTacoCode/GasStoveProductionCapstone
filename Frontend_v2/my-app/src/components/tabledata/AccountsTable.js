import React, { Fragment, useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import '../Popups/Popup.scss'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { Button, InputAdornment, makeStyles, MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import axios from 'axios';

export const Table = (props) => {

    const { listAccount } = props;
    const array = [];

    listAccount.forEach(item => {
        array.push(item)
    }, []);

    function deleteAccount(id) {
        axios.put('https://localhost:5001/delAccount/' + id)
            .then((response) => { console.log(response.data); }
            ).catch((err) => {
                console.log(err);
            })
    };


    const [addAccountBtn, setaddAccountBtn] = useState(false);
    const columns = [
        {
            title: 'ID', field: 'accountId', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Worker Name', field: 'name', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Avatar', field: 'avatarUrl', render: rowData => <img style={{ height: '60px', width: '60px' }} src={rowData.avt} />, cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'Gender', field: 'gender', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Date of Birth', field: 'accountId', cellStyle: { fontFamily: 'Arial' }
        }
    ]

    const statuses = [
        {
            value: true,
            label: 'Active'
        },
        {
            value: false,
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
            value: "1  ",
            label: 'Admin'
        },
        {
            value: "2  ",
            label: 'Manufacturer Deparment'
        },
        {
            value: "3  ",
            label: 'Order Department'
        },
        {
            value: "4  ",
            label: 'Guest'
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
        },
        {
            value: 5,
            label: 'Section4'
        },
        {
            value: 6,
            label: 'Section4'
        },
        {
            value: 7,
            label: 'Section4'
        },
        {
            value: 8,
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

    const [open, setOpen] = React.useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [accountId, setAccountID] = useState('');
    const [name, setname] = useState('');
    const [password, setAccountPassword] = useState('');
    const [email, setAccountEmail] = useState('');
    const [gender, setAccountGender] = useState(true);
    const [dateOfBirth, setAccountDateOfBirth] = useState(null);
    const [address, setAccountAddress] = useState('');
    const [phone, setAccountPhone] = useState('');
    const [roleId, setAccountRole] = useState('');
    const [sectionId, setAccountSection] = useState('');
    const [isActive, setStatus] = useState('Active');

    const handleClickOpen = (account) => {
        setOpen(true);
        console.log(account);
        // setMaterial(material)
        setAccountID(account.accountId);
        setname(account.name);
        setAccountPassword(account.password);
        setAccountEmail(account.email);
        setAccountGender(account.gender);
        setAccountDateOfBirth(account.dateOfBirth);
        setAccountAddress(account.address);
        setAccountPhone(account.phone);
        setAccountRole(account.roleId);
        setAccountSection(account.sectionId);
        setStatus(account.isActive);
    };

    const handleSaveData = () => {
        console.log("test save");
        console.log(accountId + " - " + name);
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <MaterialTable title={"List of Accounts"}
                data={array}
                columns={columns}
                // onRowClick={(event, array) => {
                //     setaddAccountBtn(true)
                // }}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete User',
                        onClick: (event, rowData) => {
                            deleteAccount(rowData.accountId);
                            window.location.reload();
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit this Account',
                        onClick: (event, rowData) => {
                            handleClickOpen(rowData);
                        }
                    },
                ]}
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }}
            />
            <Dialog open={open} onClose={handleClose}
                accountId={accountId}
                name={name}
                password={password}
                gender={gender}
                email={email}
                dateOfBirth={dateOfBirth}
                address={address}
                phone={phone}
                roleId={roleId}
                isActive={isActive}
                sectionId={sectionId}>
                <div className='componentpopup'>
                    <div className='popup-inner'>
                        <div>
                            <button className='close-btn' onClick={handleClose}>
                                <CloseIcon style={{ 'color': "white", }} />
                            </button>
                        </div>
                        <h3 className='popuptitle'>Edit account: {accountId}</h3>
                        <div className='popup-body'>
                            <form>
                                <div className='idname'>
                                    <div className='namefield'>
                                        <CssTextField label="Account Name" id="fullWidth" value={name} required onChange={(e) => setname(e.target.value)} />
                                    </div>
                                    <div className='txtfield'>
                                        <CssTextField
                                            label="Gender"
                                            select
                                            id="fullWidth" required
                                            value={gender}
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
                                    <div className='txtfield'>
                                        <CssTextField label="Password" type={'password'} id="fullWidth" value={password} required onChange={(e) => setAccountPassword(e.target.value)} />
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
                                            value={isActive}
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
                                        <CssTextField label="Email" value={email} type={'email'} id="fullWidth" required onChange={(e) => setAccountEmail(e.target.value)} />
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
                                            value={roleId}
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
                                            value={sectionId}
                                            onChange={(e) => setAccountSection(e.target.value)}
                                            helperText="Choose Section"
                                        >
                                            {sections.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}s
                                        </CssTextField>
                                    </div>
                                </div>
                                <div className='btngr'>
                                    <Button
                                        type='submit'
                                        variant="contained"
                                        style={{ fontFamily: 'Muli', borderRadius: 10, backgroundColor: "#e30217", marginRight: '0.5rem' }}
                                        size="large" onClick={handleSaveData}
                                    >Save</Button>
                                    <Button
                                        variant="contained"
                                        style={{ fontFamily: 'Muli', borderRadius: 10, backgroundColor: "#e30217" }}
                                        size="large" onClick={handleClose}
                                    >Cancel</Button>
                                </div>
                            </form>
                        </div >
                    </div>
                </div>
            </Dialog>
        </React.Fragment>
    )
}