import React, { useState, useEffect } from 'react';
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import { Table } from '../tabledata/AccountsTable';
import AccountPopup from '../Popups/AccountPopup'
import axios from 'axios';

function Accounts() {
  const [addAccountBtn, setaddAccountBtn] = useState(false);
  const [listAccount, setListAccount] = useState([]);

  useEffect(() => {
    const getUserAPI = 'https://localhost:5001/getAllAccounts'

    //Gọi API bằng axios
    axios.get(getUserAPI).then((res) => {
      setListAccount(res.data);
    }).catch((err) => {
      console.log(err);
      alert("Xảy ra lỗi");
    })

  }, [])
  return (
    <>
      <ImportExcelButton type="button"
        onClick={() => {
          setaddAccountBtn(true)
        }}>
        Add Account
      </ImportExcelButton>
      <AccountPopup trigger={addAccountBtn} setTrigger={setaddAccountBtn}>
        <h3 className='popuptitle'>Add an account</h3>
      </AccountPopup>
      <div className='accounts'>
        <Table listAccount={listAccount} />
      </div>
    </>
  )
}

export default Accounts