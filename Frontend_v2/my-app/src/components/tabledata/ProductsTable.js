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
    const { listProduct } = props;
    const array = [];

    listProduct.forEach(item => {
        array.push(item)
    });

    function deleteProduct(id) {
        axios.put('https://localhost:5001/delProduct/' + id)
            .then((response) => { console.log(response.data); }
            ).catch((err) => {
                console.log(err);
            })
    };

    const columns = [
        {
            title: 'Product ID', field: 'productId', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Product Image', field: 'imageUrl', render: rowData => <img style={{ height: '70px', width: '70px' }} src={rowData.imageUrl} />, cellStyle: { fontFamily: 'Arial' }, align: "left"
        },
        {
            title: 'Product Name', field: 'productName', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Muli' }
        },
        {
            title: 'Price', field: 'price', cellStyle: { fontFamily: 'Muli' }
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
    const [imageUrl, setProductImage] = useState('');
    const [productId, setProductID] = useState('');
    const [productName, setProductName] = useState('');
    const [price, setProductPrice] = useState('');
    const [amount, setProductAmount] = useState('');
    const [componentAmount, setComponentProductAmount] = useState('');
    const [status, setStatus] = useState('Active');
    const [description, setDescription] = useState('');

    const handleClickOpen = (product) => {
        setOpen(true);
        console.log(product);
        // setMaterial(material)
        setProductID(product.productId);
        setProductName(product.productName);
        setProductPrice(product.price);
        setProductAmount(product.amount);
        setStatus(product.status);
        setDescription(product.description);
    };

    const handleSaveData = () => {
        console.log("test save");
        console.log(productId + " - " + productName);
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <MaterialTable title={"List of Products"}
                data={array}
                columns={columns}
                actions={[
                    {
                        icon: 'delete',
                        tooltip: 'Delete this Material',
                        onClick: (event, rowData) => {
                            deleteProduct(rowData.productId);
                            window.location.reload();
                        }
                    },
                    {
                        icon: 'edit',
                        tooltip: 'Edit this Component',
                        onClick: (event, rowData) => {
                            handleClickOpen(rowData);
                        }
                    }

                ]}
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }} />

            <Dialog open={open} onClose={handleClose}
                // material={material}
                productId={productId}
                productName={productName}
                price={price}
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
                        <h3 className='popuptitle'>Edit material: {productId}</h3>
                        <div className='popup-body'>
                            <form>
                                <div className='idname'>
                                    <div className='idfield'>
                                        <CssTextField label="Product ID" id="fullWidth" required value={productId} />
                                    </div>
                                    <div className='namefield'>
                                        <CssTextField label="Product Name" id="fullWidth" required value={productName} onChange={(e) => setProductName(e.target.value)} />
                                    </div>
                                    <div className='idfield'>
                                        <CssTextField
                                            label="Amount"
                                            id="fullWidth"
                                            required type={'number'}
                                            InputProps={{
                                                inputProps: { min: 0, pattern: '[0-9]*' }
                                            }}
                                            value={amount}
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
                                            value={price}
                                            onChange={(e) => setProductPrice(e.target.value)} />
                                    </div>
                                    <div className='txtfield'>
                                        <CssTextField
                                            label="Status"
                                            select
                                            name="status"
                                            id="Status" required
                                            onChange={e => setStatus(e.target.value)}
                                            value={status}
                                            helperText="Choose product status">
                                            {statuses.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </CssTextField>
                                    </div>
                                    <div className='txtfield'>
                                        <CssTextField
                                            id='description'
                                            label="Description"
                                            name="description"
                                            value={description}
                                            onChange={e => setDescription(e.target.value)} />
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
        </div>
    )
}