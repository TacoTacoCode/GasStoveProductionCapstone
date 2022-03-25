import {React, useEffect} from 'react'
import '../../../App.css';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import { Table } from '../../tabledata/MaterialTable';
import MaterialRequest from '../../Popups/MaterialRequest'
import { useState } from 'react'
import axios from 'axios';

function SectionMaterials() {
  const [addmaterialBtn, setaddmaterialBtn] = useState(false);
  const [listMaterial, setListMaterial] = useState([]);

  useEffect(() => {
    const getUserAPI = 'https://localhost:5001/getAllMaterials'
    //Gọi API bằng axios
    axios.get(getUserAPI).then((res) => {
      setListMaterial(res.data);
    }).catch((err) => {
      console.log(err);
      alert("Xảy ra lỗi");
    })

  }, [])
  return (
    <>
    <ImportExcelButton type="button"
    onClick={() => {
    setaddmaterialBtn(true)}
      }>Request Material</ImportExcelButton>
    <MaterialRequest trigger={addmaterialBtn} setTrigger={setaddmaterialBtn}>
      <h3 className='popuptitle'>Form Request Material</h3>
    </MaterialRequest>
    {/* <ImportExcelButton type="button"
    onClick={() => {
      setaddmaterialBtn(true)}
      }>Add Material</ImportExcelButton>
    <MaterialPopup trigger={addmaterialBtn} setTrigger={setaddmaterialBtn}>
      <h3 className='popuptitle'>Add a material</h3>
    </MaterialPopup> */}
    <div className='materials'>
    <Table listMaterial={listMaterial}/></div></>
  )
}

export default SectionMaterials