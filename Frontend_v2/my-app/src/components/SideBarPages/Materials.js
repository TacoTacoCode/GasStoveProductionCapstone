import React, { useState, useEffect } from 'react';
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import { Table } from '../tabledata/MaterialTable';
import ComponentPopup from '../Popups/MaterialPopup'
import axios from 'axios';

function Materials() {
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
          setaddmaterialBtn(true)
        }}>Add Material</ImportExcelButton>
      <ComponentPopup trigger={addmaterialBtn} setTrigger={setaddmaterialBtn}>
        <h3 className='popuptitle'>Add a material</h3>
      </ComponentPopup>
      <div className='materials'>
        <Table listMaterial={listMaterial} />
      </div>
    </>
  )
}

export default Materials