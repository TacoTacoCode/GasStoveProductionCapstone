import { React, useState, useEffect } from 'react'
import '../../../App.css';
import { Table } from '../../tabledata/SectionWorkerTable';
import axios from 'axios'

function WorkerList() {
  const [listAccount, setListAccount] = useState([]);
  const [curSectionInfo,] = useState(() => JSON.parse(localStorage['currentSectionInfo']));

  useEffect(() => {
    axios.get(`https://localhost:5001/getAccountsBySectionId/${curSectionInfo.sectionId}`).then((res) => {
      setListAccount(res.data);
    }).catch((err) => {
      console.log(err);
      alert("Xảy ra lỗi");
    })

  }, []);
  return (
    <>
      <div className='products' style={{ padding: '3% 10%' }}>
        <Table listAccount={listAccount} /></div></>
  )
}

export default WorkerList