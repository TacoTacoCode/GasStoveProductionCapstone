import React from 'react'
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import { Table } from '../tabledata/ComponentsTable';
import ComponentPopup from '../Popups/ComponentPopup'
import { useState } from 'react'
import AddComponent from './AddComponent';

function Materials() {
  const [addcomponentBtn, setAddcomponentBtn] = useState(false);

  return (
    <>
      <ImportExcelButton type="button"
        onClick={() => {
          setAddcomponentBtn(true)
        }
        }>Add Component</ImportExcelButton>
      <ComponentPopup trigger={addcomponentBtn} setTrigger={setAddcomponentBtn}>
        <AddComponent />
      </ComponentPopup>
      <div className='components'>
        <Table /></div></>
  )
}

export default Materials