import {React, useState, useEffect} from 'react'
import '../../../App.css';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import { Table } from '../../tabledata/AccountsTable';
import axios from 'axios'

function WorkerList() {
  const [listAccount, setListAccount] = useState([]);

  useEffect(() => {
    const getAllAccount = 'https://localhost:5001/getActiveAccounts'
    //Gọi API bằng axios
    axios.get(getAllAccount).then((res) => {
      setListAccount(res.data);
    }).catch((err) => {
      console.log(err);
      alert("Xảy ra lỗi");
    })

  }, []);
  return (
    <>
    <ImportExcelButton>Add Worker</ImportExcelButton>
    <div className='products'>
    <Table  listAccount={listAccount}/></div></>
  )
}

export default WorkerList