import React, { useEffect, useState } from 'react'
import { Table } from '../../tabledata/DashboardTable';
import '../../../App.css';
import { FaClipboardList } from 'react-icons/fa';
import { AiFillFileExcel } from 'react-icons/ai';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import axios from 'axios';

export default function DashBoard() {
  useEffect(() => {
    document.title = "UFA - Dashboard"
  }, []);

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
      <ImportExcelButton>
        <div>
          <FaClipboardList size={24} style={{ verticalAlign: "middle" }} />
          &ensp;
          <text style={{ verticalAlign: "middle" }}>Attendance List</text>
        </div>
      </ImportExcelButton>
      <ImportExcelButton>
        <div>
          <AiFillFileExcel size={24} style={{ verticalAlign: "middle" }} />
          &ensp;
          <text style={{ verticalAlign: "middle" }}>Import from Excel</text>
        </div>
      </ImportExcelButton>
      <div className='dashboard'>
        <Table listRequestMaterials={listRequestMaterials} />
      </div>
    </>
  );
}
