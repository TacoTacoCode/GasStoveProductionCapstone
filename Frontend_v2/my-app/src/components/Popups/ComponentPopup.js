import React, { useEffect, useState } from 'react'
import '../../styles/Popup.scss'
import CloseIcon from '@mui/icons-material/Close';
import MaterialTable from 'material-table';
import { Button, InputAdornment, makeStyles, MenuItem, TextField } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import axios from 'axios';

function createData(materialId, materialName, amount) {
  return { materialId, materialName, amount };
}

const columns = [
  {
    title: 'ID', field: 'materialId', cellStyle: { fontFamily: 'Arial' }
  },
  {
    title: 'Name', field: 'materialName', cellStyle: { fontFamily: 'Arial' }
  },
  {
    title: 'Amount', field: 'amount', cellStyle: { fontFamily: 'Arial' }
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


function ComponentPopup(props) {
  //set a map from combobox then add them to the table
  const [componentMaterial, setListComponentMaterial] = React.useState([]);
  const [listMaterialActive, setMaterialList] = React.useState([]);
  const [materialActive, setMaterialChoose] = React.useState(null);

  useEffect(() => {
    axios.get("https://localhost:5001/getMaterials/Active").then(res => {
      setMaterialList(res.data)
    });
  }, [])

  const [importExportDetail, setimportExportDetailTest] = React.useState(null);
  const [productComponent, setProductComponent] = React.useState(null);
  const [section, setSection] = React.useState(null);
  const [imageUrl, setComponentImage] = useState('');
  const [componentID, setComponentID] = useState('');
  const [componentName, setComponentName] = useState('');
  const [size, setComponentSize] = useState('');
  const [amount, setComponentAmount] = useState('');
  const [materialAmount, setMaterialComponentAmount] = useState(null);
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
      description,
      componentMaterial,
      importExportDetail,
      productComponent,
      section
    });
    setMaterialChoose(null);
    setMaterialComponentAmount(null);
    setListComponentMaterial(null);
  }

  return (props.trigger) ? (
    <div className='componentpopup'>
      <div className='popup-inner'>
        <div><button className='close-btn' onClick={() => props.setTrigger(false)}>
          <CloseIcon style={{ 'color': "white", }} />
        </button></div>
        {props.children}
        <div className='popup-body'>
          <form id="Form1">
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

            <div className='idname'>
              <div className='txtfield1'>
                <CssTextField
                  label="Material Active List"
                  select
                  id="fullWidth" required
                  onChange={(e) => setMaterialChoose(e.target.value)}
                  helperText="Choose Active Material"
                >
                  {listMaterialActive.map((material) => (
                    <MenuItem key={material.materialId} value={material}>
                      {material.materialName} - Amount : {material.amount}
                    </MenuItem>
                  ))}
                </CssTextField>
              </div>
              <div className='numfield1'>
                <CssTextField
                  label="Amount"
                  id="fullWidth"
                  required type={'number'}
                  InputProps={{
                    inputProps: { min: 0, pattern: '[0-9]*' }
                  }}
                  onChange={(e) => setMaterialComponentAmount(e.target.value)} />
              </div>

              {
                materialActive != null && materialAmount != null
                  ? <div className='button_field'>
                    <Button style={{ fontFamily: 'Muli', borderRadius: 10, backgroundColor: "#e30217", color: "white" }}
                      onClick={() => {
                        setListComponentMaterial(componentMaterial => [...componentMaterial, createData(materialActive.materialId, materialActive.materialName, materialAmount)]);
                        console.log("Add: " + componentMaterial)
                      }}>ADD</Button>
                  </div>
                  : <div className='button_field'>
                    <Button style={{ fontFamily: 'Muli', borderRadius: 10, backgroundColor: "#e30217", color: "white" }} disabled={true} onClick={console.log('No add')}>CAN'T ADD</Button>
                  </div>
              }
              <div className='tablefield'>
                <MaterialTable
                  data={componentMaterial}
                  columns={columns}
                  editable={{
                    onRowDelete: (oldData) =>
                      new Promise((resolve, reject) => {
                        setTimeout(() => {
                          const dataDelete = [...componentMaterial];
                          const index = oldData.tableData.id;
                          dataDelete.splice(index, 1);
                          setListComponentMaterial([...dataDelete]);
                          console.log("Delete: " + componentMaterial)
                          resolve();
                        }, 1);
                      })
                  }}

                  options={{
                    toolbar: false,
                    maxBodyHeight: 200,
                    search: false,
                    paging: false,
                    showTitle: false,
                    addRowPosition: 'first',
                    actionsColumnIndex: -1,
                    exportButton: false,
                    headerStyle: { backgroundColor: '#E30217', color: '#fff', }
                  }}
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
                size="large" onClick={() => {
                  props.setTrigger(false);
                  setMaterialChoose(null);
                  setMaterialComponentAmount(null);
                  setListComponentMaterial([]);
                }}
              >Cancel</Button>
            </div>
          </form>
        </div>
      </div >
    </div >
  ) : "";
}

export default ComponentPopup