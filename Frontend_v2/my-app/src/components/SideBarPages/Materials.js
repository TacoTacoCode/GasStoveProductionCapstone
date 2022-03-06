import React from 'react'
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import { Table } from '../tabledata/MaterialTable';
import ComponentPopup from '../Popups/MaterialPopup'
import { useState } from 'react'

function Materials() {
  const [addmaterialBtn, setaddmaterialBtn] = useState(false);

  return (
    <>
      <ImportExcelButton type="button"
        onClick={() => {
          setaddmaterialBtn(true)
        }
        }>Add Material</ImportExcelButton>
      <ComponentPopup trigger={addmaterialBtn} setTrigger={setaddmaterialBtn}>
        <h3 className='popuptitle'>Add a material</h3>
      </ComponentPopup>
      <div className='materials'>
        <Table /></div></>
  )
}

export default Materials