import React, { useEffect, useState } from 'react'
import { Table } from '../../tabledata/DashboardTable';
import '../../../App.css';
import axios from 'axios';

export default function DashBoard() {
  useEffect(() => {
    document.title = "UFA - Dashboard"
  }, []);

  const [listRequestMaterials, setListRequestMaterials] = useState([]);

  useEffect(() => {
    const getRequestMaterials = `${process.env.REACT_APP_API_URL}getExByType/M`
    axios.get(getRequestMaterials).then((res) => {
      setListRequestMaterials(res.data);
    }).catch((err) => {
      console.log(err);
      alert("Xảy ra lỗi");
    })

  }, []);

  return (
    <>
      <div className='dashboard'>
        <Table listRequestMaterials={listRequestMaterials} />
      </div>
    </>
  );
}
