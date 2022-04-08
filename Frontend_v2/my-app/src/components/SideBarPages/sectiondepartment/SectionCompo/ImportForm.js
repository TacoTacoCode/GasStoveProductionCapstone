import React, { useEffect, useState } from "react";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from "axios";
import { ImportExcelButton } from "../../../button/ImportExcelButton";
import swal from "sweetalert";
import { Button, FormControl, InputLabel, MenuItem, Select, makeStyles, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        float: 'center'
    },
}));

const ImportForm = () => {
    const [listProcessDetail, setListProcessDetail] = useState(() => JSON.parse(localStorage['listProcessDetail']));
    const [secInfo, setSecInfo] = useState(() => JSON.parse(localStorage['currentSectionInfo']));
    const [selected, setSelected] = useState([])


    const addSelected = () => {
        let arr = [...selected]
        arr.push({
            'itemId': secInfo.componentId,
            'processDetailId': '',
            'amount': 0
        })
        setSelected(arr)
    }

    const deleteItem = (index) => {
        let arr = [...selected]
        arr.splice(index, 1)
        setSelected(arr)
    }

    const handleSelectedInput = (index, value) => {
        let arr = [...selected]
        arr[index]['processDetailId'] = value
        setSelected(arr)
    }

    const handleAmountInput = (index, value) => {
        let arr = [...selected]
        if (value === '') {
            arr[index].amount = 0
        }
        else {
            let aValue = parseInt(value)
            if (arr[index].maxAmount < aValue) {
                arr[index].amount = arr[index].maxAmount
            }
            else if (0 > aValue) {
                arr[index].amount = 0
            }
            else {
                arr[index].amount = aValue
            }
        }
        setSelected(arr)
    }
    const classes = useStyles();

    const submit = () => {
        const submitData = {
            "sectionId": secInfo.sectionId,
            "createdDate": new Date().toLocaleDateString(),
            "itemType": "C",
            'isImport': true,
            "importExportDetails": selected
        }
        axios.post('https://localhost:5001/addImEx', submitData)
            .then(() => {
                swal("Success", "Submit Data", "success", {
                    buttons: false,
                    timer: 1500,
                }).then((e) => window.location.href = 'http://localhost:3000/section/processDetail')
            })
    }
    return (
        <div className="flow" style={{ margin: "50px 35%" }}>
            <h1 style={{ textAlign: 'center', marginBottom: '32px' }}>{secInfo.isAssemble ? 'Components Import Form' : 'Materials Import Form'}</h1>
            {
                selected.map((value, index) =>
                    <div
                        className={`item${index}`}
                        style={{
                            display: 'block', alignItems: 'center',
                            marginBottom: '16px',
                            borderRadius: '25px',
                            padding: '3% 8%',
                            border: '1px solid',
                            boxShadow: '5px 10px #888888',
                        }}
                        key={`item${index}`}>
                        <FormControl className={classes.formControl}>
                            <InputLabel
                                id="demo-simple-select-label"
                                shrink
                            >
                                Choose Task
                            </InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={value['processDetailId']}
                                onChange={(e) => handleSelectedInput(index, e.target.value)}
                            >
                                {listProcessDetail.map((e) => (
                                    <MenuItem
                                        value={e.processDetailId}
                                        key={e.processDetailId}
                                    >
                                        {e.processDetailId}
                                    </MenuItem>))}
                            </Select>
                        </FormControl>
                        <FormControl>
                            <TextField
                                value={value['amount']}
                                type={'number'}
                                inputProps={{ min: '0' }}
                                style={{
                                    display: 'inline-block', float: 'center',
                                    marginInline: '5%', marginTop: '5.5%'
                                }}
                                onChange={(e) => handleAmountInput(index, e.target.value)}
                            />
                        </FormControl>
                        <IconButton
                            aria-label="delete" size="large"
                            style={{
                                display: 'inline', float: 'right',
                                alignSelf: 'center', margin: '1% auto'
                            }}
                            onClick={() => {
                                deleteItem(index)
                            }}
                        >
                            <DeleteIcon fontSize="inherit" />
                        </IconButton>

                    </div>
                )
            }
            <ImportExcelButton
                aria-label="add" size="large"
                style={{ display: 'inline', float: 'right' }}
                onClick={addSelected}>
                Add
            </ImportExcelButton>
            {selected.length > 0 ? <ImportExcelButton
                onClick={() => submit()}
            >
                Submit
            </ImportExcelButton> : <ImportExcelButton
                onClick={() => window.location.href = 'http://localhost:3000/section/processDetail'}
            >
                Back
            </ImportExcelButton>}
        </div >
    );

};

export default ImportForm;
