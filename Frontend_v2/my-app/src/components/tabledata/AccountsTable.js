import React, { Fragment, useEffect, useState } from "react";
import MaterialTable from "material-table";
import "../../styles/Popup.scss";
import axios from "axios";
import swal from "sweetalert";
import AccountEditPopup from "../Popups/AccountEditPopup";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import moment from 'moment';

export const Table = (props) => {
  const { listAccount } = props;
  const array = [];

  listAccount.forEach((item) => {
    array.push(item);
  }, []);

  function deleteAccount(id) {
    axios
      .put("https://localhost:5001/delAccount/" + id)
      .then((response) => {
        swal("Success", "Delete account successfully", "success", {
          buttons: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        swal("Error", "Something went wrong", "error", {
          buttons: false,
          timer: 2000,
        });
      });
  }

  const [addAccountBtn, setaddAccountBtn] = useState(false);
  const columns = [
    {
      title: "ID",
      field: "accountId",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Worker Name",
      field: "name",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Avatar",
      field: "avatarUrl",
      render: (rowData) =>
        <img
          style={{ height: "60px", width: "60px" }}
          src={"https://firebasestorage.googleapis.com/v0/b/gspspring2022.appspot.com/o/Images%2F" + rowData.avatarUrl}
        />
      ,
      cellStyle: { fontFamily: "Muli" },
      align: "left",
    },
    {
      title: "Gender",
      field: "gender",
      cellStyle: { fontFamily: "Arial" },
      render:
        rowData => (rowData.gender == true)
          ? "Male" : "Female"
    },
    {
      title: "Date of Birth",
      field: "dateOfBirth",
      cellStyle: { fontFamily: "Arial" },
      render:
        rowData => moment(rowData.dateOfBirth).format('DD MMM, YYYY'),
    },
    {
      title: "Status",
      field: "status",
      render:
        rowData => (rowData.isActive == false)
          ? <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
            <div>
              <AiFillCloseCircle size={40} />
            </div>
          </IconContext.Provider>
          : <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
            <div>
              <AiFillCheckCircle size={40} />
            </div>
          </IconContext.Provider >
    },
  ];

  const [editDatas, setEditDatas] = useState(null);
  const [open, setOpen] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);

  // const [roles, setRoleList] = useState([]);
  // const [sections, setSectionList] = useState([]);

  // useEffect(() => {
  //   axios.get("https://localhost:5001/getRoles").then((res) => {
  //     setRoleList(res.data);
  //   });
  //   axios.get("https://localhost:5001/getAllSections").then((res) => {
  //     setSectionList(res.data);
  //   });
  // }, []);

  const handleEditData = (rowData) => {
    setEditDatas(rowData);
    setOpen(true);
  }

  return (
    <React.Fragment>
      <MaterialTable
        title={"List of Accounts"}
        data={array}
        columns={columns}
        actions={[
          rowData => ({
            icon: "delete",
            tooltip: "Delete User",
            onClick: (event, rowData) => {
              deleteAccount(rowData.accountId);
              window.location.reload();
            },
            disabled: (rowData.isActive == false)
          }),
          {
            icon: "edit",
            tooltip: "Edit this Account",
            onClick: (event, rowData) => {
              handleEditData(rowData);
            },
          },
        ]}
        options={{
          addRowPosition: "first",
          actionsColumnIndex: -1,
          exportButton: false,
          headerStyle: { backgroundColor: "#E30217", color: "#fff" },
        }}
      />
      {editDatas &&
        <AccountEditPopup
          data={editDatas}
          setData={setEditDatas}
          IsOpen={open}
          setOpen={setOpen}
          setSubmittedTime={() => {
            setNewDataSubmitted((prev) => prev + 1);
          }}
        >
          <h3 className="popuptitle">Edit account : {editDatas.name} </h3>
        </AccountEditPopup>
      }
    </React.Fragment>
  );
};