import React from 'react'
import 'D:/capstone-frontend/my-app/my-app/src/App.css';
import {ImportExcelButton} from 'D:/capstone-frontend/my-app/my-app/src/components/button/ImportExcelButton';
import { Table } from '../tabledata/MaterialTable';
import MaterialRequest from 'D:/capstone-frontend/my-app/my-app/src/components/Popups/MaterialRequest'
import { useState } from 'react'

function SectionMaterials() {
  const [addmaterialBtn, setaddmaterialBtn] = useState(false);

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
    <Table/></div></>
  )
}

export default SectionMaterials