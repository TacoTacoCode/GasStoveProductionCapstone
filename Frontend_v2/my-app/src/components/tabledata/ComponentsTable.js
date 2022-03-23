import React, { useState } from 'react';
import MaterialTable from 'material-table';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@material-ui/core";
import { alpha, styled } from '@mui/material/styles';
import '../../App.css';
import '../Popups/Popup.scss'
import CloseIcon from '@mui/icons-material/Close'
import { Button, InputAdornment, makeStyles, MenuItem, TextField } from '@mui/material';
import axios from 'axios';

export const Table = (props) => {
    const { listComponent } = props;
    const array = [];

    listComponent.forEach(item => {
        array.push(item)
    });

    function deleteComponent(id) {
        axios.put('https://localhost:5001/delComponent/' + id)
            .then((response) => { console.log(response.data); }
            ).catch((err) => {
                console.log(err);
            })
    };

    const columns = [
        {
            title: 'Component ID', field: 'componentId', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Component Image', field: 'imageUrl', render: rowData => <img style={{ height: '70px', width: '70px' }} src={rowData.imageUrl} />, cellStyle: { fontFamily: 'Arial' }, align: "left"
        },
        {
            title: 'Component Name', field: 'componentName', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Arial' }
        },
        {
            title: 'Unit', field: 'substance', cellStyle: { fontFamily: 'Arial' }
        },
    ]

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

    const [open, setOpen] = React.useState(false);
    const [imageUrl, setComponentImage] = useState('');
    const [componentId, setComponentId] = useState('');
    const [componentName, setComponentName] = useState('');
    const [size, setComponentSize] = useState('');
    const [amount, setComponentAmount] = useState('');
    const [materialAmount, setMaterialComponentAmount] = useState('');
    const [substance, setComponentSubstance] = useState('');
    const [weight, setComponentWeight] = useState('');
    const [color, setComponentColor] = useState('');
    const [status, setStatus] = useState('Active');
    const [description, setDescription] = useState('');

    const handleClickOpen = (component) => {
        setOpen(true);
        console.log(component);
        // setComponent(component)
        setComponentId(component.componentId);
        setComponentName(component.componentName);
        setComponentSize(component.size);
        setComponentSubstance(component.substance);
        setComponentWeight(component.weight);
        setComponentColor(component.color)
        setComponentAmount(component.amount);
        setStatus(component.status);
        setDescription(component.description);
    };

    const handleSaveData = () => {
        console.log("test save");
        console.log(componentId + " - " + componentName);
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <MaterialTable title={"List of Components"}
                data={array}
                columns={columns}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete this component',
                        onClick: (event, rowData) => {
                            deleteComponent(rowData.componentId);
                            window.location.reload();
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit this component',
                        onClick: (event, rowData) => {
                            handleClickOpen(rowData);
                        }
                    },
                ]}

                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', },
                }} />

            <Dialog open={open} onClose={handleClose}
                // component={component}
                componentId={componentId}
                componentName={componentName}
                substance={substance}
                size={size}
                color={color}
                weight={weight}
                amount={amount}
                status={status}
                description={description}>
                <div className='componentpopup'>
                    <div className='popup-inner'>
                        <div>
                            <button className='close-btn' onClick={handleClose}>
                                <CloseIcon style={{ 'color': "white", }} />
                            </button>
                        </div>
                        <h3 className='popuptitle'>Edit Component: {componentId}</h3>
                        <div className='popup-body'>
                            <form>
                                <div className='idname'>
                                    <div className='idfield'>
                                        <CssTextField label="Component ID" id="fullWidth" required value={componentId} />
                                    </div>
                                    <div className='namefield'>
                                        <CssTextField label="Component Name" id="fullWidth" required value={componentName} onChange={(e) => setComponentName(e.target.value)} />
                                    </div>
                                    <div className='idfield'>
                                        <CssTextField
                                            label="Amount"
                                            id="fullWidth"
                                            value={amount}
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
                                            value={size}
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
                                            value={weight}
                                            InputProps={{
                                                inputProps: { min: 0, pattern: '[0-9]*' }
                                            }}
                                            onChange={(e) => setComponentWeight(e.target.value)} />
                                    </div>
                                    <div className='txtfield'>
                                        <CssTextField
                                            label="Color"
                                            value={color}
                                            onChange={(e) => setComponentColor(e.target.value)}
                                        />
                                    </div>
                                    <div className='txtfield'>
                                        <CssTextField
                                            label="Substance"
                                            value={substance}
                                            onChange={(e) => setComponentSubstance(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className='idname'>
                                    <div className='txtfield'>
                                        <CssTextField
                                            label="Status"
                                            select
                                            value={status}
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
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
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