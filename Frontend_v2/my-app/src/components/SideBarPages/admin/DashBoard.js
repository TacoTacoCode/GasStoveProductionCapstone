import React, { useEffect, useState } from 'react'
import { Table } from '../../tabledata/DashboardTable';
import '../../../App.css';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import axios from 'axios';

export default function DashBoard() {
  const [listRequestMaterials, setListRequestMaterials] = useState([]);

  useEffect(() => {
    const getRequestMaterials = 'https://localhost:5001/getImExs'
    //Gọi API bằng axios
    axios.get(getRequestMaterials).then((res) => {
      setListRequestMaterials(res.data);
    }).catch((err) => {
      console.log(err);
      alert("Xảy ra lỗi");
    })

  }, []);

  return (
    <>
    <h1>{localStorage.getItem('currentUser')}</h1>
      <ImportExcelButton>Import from Excel</ImportExcelButton>
      <div className='dashboard'>
        <Table listRequestMaterials={listRequestMaterials}/>
      </div>
    </>
  );
}
