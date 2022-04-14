import React from 'react';
import MaterialTable from 'material-table';
import '../tabledata/TableDesign.css'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { styled } from '@material-ui/styles';
import { TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Table = (props) => {

    const navigate = useNavigate();
    const { listRequestMaterials } = props;
    const array = [];

    listRequestMaterials.forEach(item => {
        array.push(item)
    }, []);
    const CssTextField = styled(TextField)({
        width: "100%",
        "& .MuiOutlinedInput-root": {
            fontFamily: "Muli",
            fontSize: "18px",

            "& fieldset": {
                border: "none",
            },
        },
        "& .MuiOutlinedInput-input": {
            textAlign: 'center',
            fontFamily: "Muli",
        }
    });

    function getImExDetail(importExportId, itemType) {
        localStorage.setItem('itemType', itemType)
        localStorage.setItem('importExportId', importExportId)
        navigate('/requestDetail'
        )

    };

    const columns = [
        {
            title: 'Request ID', field: 'importExportId', cellStyle: { fontFamily: 'Muli', fontSize: '18px', paddingBottom: '1%' }, align: "center"
        },
        {
            title: 'Section Id', field: 'sectionId', cellStyle: { fontFamily: 'Muli', fontSize: '18px', paddingBottom: '1%' }, align: "center"
        },
        {
            title: 'Created Date', field: 'createdDate', render:
                rowData => <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
                    disableOpenPicker
                    inputFormat="MM/dd/yyyy"
                    value={array[0].expiryDate}
                    renderInput={(params) => <CssTextField
                        inputProps={{ readOnly: true }} style={{ width: "fit-content", textAlign: "center" }} disabled {...params} />}
                /></LocalizationProvider>,
            cellStyle: { fontFamily: 'Muli' }, align: "center"
        },
        {
            title: 'First Export Date', field: 'firstExportDate',
            render:
                rowData => <LocalizationProvider dateAdapter={AdapterDateFns}><DesktopDatePicker
                    disableOpenPicker
                    inputFormat="MM/dd/yyyy"
                    value={array[0].expiryDate}
                    renderInput={(params) => <CssTextField InputProps={{ style: { fontFamily: 'Muli' } }} inputProps={{ readOnly: true }} style={{ width: "fit-content", textAlign: "center" }} disabled {...params} />}
                /></LocalizationProvider>, align: "center"
        },
    ]

    const MyNewTitle = ({ text = "Table Title", variant = "h6" }) => (
        <Typography
            variant={variant}
            style={{ color: '#333C83', fontFamily: 'Muli' }}
        >
            {text}
        </Typography>
    );



    return (
        <div>
            <MaterialTable
                title={<MyNewTitle variant="h6" text="Material Requests List" />}
                data={array}
                columns={columns}
                onRowClick={(event, rowData) => {
                    getImExDetail(rowData.importExportId, rowData.itemType)
                }
                }
                options={{
                    searchFieldVariant: 'outlined',
                    searchFieldStyle: {
                        fontFamily: 'Muli',
                        color: '#0E185F',
                        marginTop: '2%',
                        marginBottom: '2%',
                    },
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#bd162c', color: '#fff ', fontSize: '18px', paddingLeft: '4%' }
                }} />
        </div>
    )
}