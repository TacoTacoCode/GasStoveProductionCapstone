import React, { useState, useEffect } from "react";
import "../../../App.css";
import { FaClipboardList, FaPlus } from 'react-icons/fa';
import { AiFillFileExcel } from 'react-icons/ai';
import { ImportExcelButton } from "../../button/ImportExcelButton";
import { Table } from "../../tabledata/AccountsTable";
import AccountPopup from "../../Popups/AccountPopup";
import axios from "axios";
import ImportFilePopup from "../../Popups/ImportFilePopup";

function Accounts() {
  useEffect(() => {
    document.title = "UFA - Manage Accounts"
  }, []);

  const [addAccountBtn, setaddAccountBtn] = useState(false);
  const [importFile, setImportFile] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  //biến này giúp tải lại dữ liệu mà không cần load lại trang (khi update data)
  const [listAccount, setListAccount] = useState([]);

  useEffect(() => {
    const getAllAccount = "https://localhost:5001/getAllAccounts";
    //có thể liên hệ BE tạo API gọi theo số lượng và trang, không cần phải tải toàn bộ dữ liệu
    //Gọi API bằng axios
    axios
      .get(getAllAccount)
      .then((res) => {
        setListAccount(res.data);
      })
      .catch((err) => {
        console.log(err);
        alert("Xảy ra lỗi");
      });
  }, [newDataSubmitted]);
  return (
    <>
      <ImportExcelButton><div>
        <FaClipboardList size={24} style={{ verticalAlign: "middle" }} />
        &ensp;
        <text style={{ verticalAlign: "middle" }}>Attendance List</text>
      </div></ImportExcelButton>
      <ImportExcelButton
        type="button"
        onClick={() => {
          setImportFile(true);
        }}
      >
        <div>
          <AiFillFileExcel size={24} style={{ verticalAlign: "middle" }} />
          &ensp;
          <text style={{ verticalAlign: "middle" }}>Import Account File</text>
        </div>
      </ImportExcelButton>
      <ImportFilePopup
        trigger={importFile}
        setTrigger={setImportFile}
        dataType="account"
      >
        <h3 className="popuptitle">Import Account File</h3>
      </ImportFilePopup>
      <ImportExcelButton
        type="button"
        onClick={() => {
          setaddAccountBtn(true);
        }}
      >
        <div>
          <FaPlus size={24} style={{ verticalAlign: "middle" }} />
          &ensp;
          <text style={{ verticalAlign: "middle" }}>Add Account</text>
        </div>
      </ImportExcelButton>
      <AccountPopup
        trigger={addAccountBtn}
        setTrigger={setaddAccountBtn}
        setSubmittedTime={() => {
          setNewDataSubmitted((prevState) => prevState + 1);
        }}
      >
        <h3 className="popuptitle">Add an account</h3>
      </AccountPopup>
      <div className="accounts">
        <Table
          listAccount={listAccount}
          setSubmittedTime={() =>
            setNewDataSubmitted((prevState) => prevState + 1)
          }
        />
      </div>
    </>
  );
}

export default Accounts;
