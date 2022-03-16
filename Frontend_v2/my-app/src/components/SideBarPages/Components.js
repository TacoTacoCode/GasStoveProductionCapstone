import React, { useState, useEffect } from 'react'
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import { Table } from '../tabledata/ComponentsTable';
import ComponentPopup from '../Popups/ComponentPopup'
import axios from 'axios';

function Components() {
  const [addcomponentBtn, setAddcomponentBtn] = useState(false);
  const [listComponent, setListComponent] = useState([]);

  useEffect(() => {
    const getAllComponents = 'https://localhost:5001/getAllComponents'

    //Gọi API bằng axios
    axios.get(getAllComponents).then((res) => {
      setListComponent(res.data);
    }).catch((err) => {
      console.log(err);
      alert("Xảy ra lỗi");
    })

  }, [])

  return (
    <>
      <ImportExcelButton type="button"
        onClick={() => {
          setAddcomponentBtn(true)
        }
        }>Add Component</ImportExcelButton>
      <ComponentPopup trigger={addcomponentBtn} setTrigger={setAddcomponentBtn}>
        <h3 className='popuptitle'>Add a component</h3>
      </ComponentPopup>
      <div className='components'>
        <Table listComponent={listComponent} /></div></>
  )
}

export default Components