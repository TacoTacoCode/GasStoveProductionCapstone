import React, { useState, useEffect } from "react";
import "../../../App.css";
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
      <ImportExcelButton
        type="button"
        onClick={() => {
          setImportFile(true);
        }}
      >
        Import Account File
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
        Add Account
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
