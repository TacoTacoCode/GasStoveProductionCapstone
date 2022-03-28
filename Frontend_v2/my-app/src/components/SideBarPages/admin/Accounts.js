import React, { useState, useEffect } from "react";
import "../../../App.css";
import { ImportExcelButton } from "../../button/ImportExcelButton";
import { Table } from "../../tabledata/AccountsTable";
import AccountPopup from "../../Popups/AccountPopup";
import axios from "axios";

function Accounts() {
  const [addAccountBtn, setaddAccountBtn] = useState(false);
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
    //hieulam
    <>
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
      ></AccountPopup>
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
