import React, { useState } from 'react';
import MaterialTable from 'material-table';
import '../tabledata/TableDesign.css'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { styled } from '@material-ui/styles';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Table = (props) => {

    const navigate = useNavigate();
    const { listRequestComponents } = props;
    const array = [];

    listRequestComponents.forEach(item => {
        array.push(item)
    }, []);
    const CssTextField = styled(TextField)({
        width: "100%",
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                border: "none",
            },
        },
    });

    function getImExDetail(importExportId, itemType) {
        localStorage.setItem('itemType', itemType)
        localStorage.setItem('importExportId', importExportId)
        navigate('/manufacturer/requestDetail')

    };

    const columns = [
        {
            title: 'Request ID', field: 'importExportId', cellStyle: { fontFamily: 'Arial' }, align: "left"
        },
        {
            title: 'Section Id', field: 'sectionId', cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'Created Date', field: 'createdDate', render:
                rowData => <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
                    disableOpenPicker
                    inputFormat="MM/dd/yyyy"
                    value={array[0].expiryDate}
                    renderInput={(params) => <CssTextField inputProps={{ readOnly: true }} style={{ width: "50%" }} disabled {...params} />}
                /></LocalizationProvider>,
            cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
        {
            title: 'First Export Date', field: 'firstExportDate',
            render:
                rowData => <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
                    disableOpenPicker
                    inputFormat="MM/dd/yyyy"
                    value={array[0].expiryDate}
                    renderInput={(params) => <CssTextField inputProps={{ readOnly: true }} style={{ width: "50%" }} disabled {...params} />}
                /></LocalizationProvider>, cellStyle: { fontFamily: 'Muli' }, align: "left"
        },
    ]
    return (
        <div>
            <MaterialTable title={"Component Requesting List"}
                data={array}
                columns={columns}
                onRowClick={(event, rowData) => {
                    getImExDetail(rowData.importExportId, rowData.itemType)
                    // navigate("/requestDetail") 
                    // , { state: rowData }
                }
                }
                // actions={[
                //     {
                //         icon: 'check',
                //         tooltip: 'Accept this Request',
                //         onClick: (event, rowData) => {
                //             // deleteComponent(rowData.componentId);
                //             // window.location.reload();
                //         }
                //     }

                // ]}
                options={{
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                }} />
        </div>
    )
}