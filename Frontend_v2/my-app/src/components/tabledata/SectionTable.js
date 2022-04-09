import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { alpha, styled } from "@mui/material/styles";
import "../../App.css";
import "../../styles/Popup.scss";
import {
  TextField,
} from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import ProductEditPopup from "../Popups/ProductEditPopup";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import Avatar from '@mui/material/Avatar';
import SectionEditPopup from "../Popups/SectionEditPopup";
import { fn } from "moment";

export const Table = (props) => {
  const { listSection } = props;
  const array = [];

  listSection.forEach((item) => {
    array.push(item);
  });

  function deleteSection(id) {
    axios
      .put("https://localhost:5001/delSection/" + id)
      .then((response) => {
        swal("Success", "Delete Section successfully", "success", {
          button: false,
          timer: 2000,
        });
        props.setSubmittedTime();
      })
      .catch((err) => {
        swal("Error", "Delete Section failed", "error", {
          button: false,
          time: 2000,
        });
      });
  }

  const columns = [
    {
      title: "Section ID",
      field: "sectionId",
      cellStyle: { fontFamily: "Muli" },
    },
    // muốn lấy tên
    {
      title: "Section Leader",
      field: "sectionLeadId",
      cellStyle: { fontFamily: "Muli" },
    },
    {
      title: "Component",
      field: "componentId",
      cellStyle: { fontFamily: "Muli" },
    },
    {
      title: "Worker Amount",
      field: "workerAmount",
      cellStyle: { fontFamily: "Muli" },
    },
    {
      title: "Status of Assemble",
      field: "isAssemble",
      render:
        rowData => (rowData.isAssemble == false)
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

  const statuses = [
    {
      value: true,
      label: "Assembled",
    },
    {
      value: false,
      label: "Not assembled yet",
    },
  ];

  const CssTextField = styled(TextField)({
    width: "100%",
    "& label.Mui-focused": {
      color: "black",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#e30217",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "black",
      },
      "&:hover fieldset": {
        borderColor: "#e30217",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#e30217",
      },
    },
  });

  const [editDatas, setEditDatas] = useState(null);
  const [open, setOpen] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);

  const handleEditData = (rowData) => {
    setEditDatas(rowData);
    setOpen(true);
  }

  return (
    <React.Fragment>
      <MaterialTable
        title={"List of Sections"}
        data={array}
        columns={columns}
        actions={[
          rowData => ({
            icon: "delete",
            tooltip: "Delete this Section",
            onClick: (event, rowData) => {
              deleteSection(rowData.sectionId);
              window.location.reload();
            },
            disabled: (rowData.isActive == false)
          }),
          {
            icon: "edit",
            tooltip: "Edit this Section",
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
        <SectionEditPopup
          data={editDatas}
          setData={setEditDatas}
          IsOpen={open}
          setOpen={setOpen}
          setSubmittedTime={() => {
            setNewDataSubmitted((prev) => prev + 1);
          }}
        >
          <h3 className="popuptitle">Edit section : {editDatas.sectionId} </h3>
        </SectionEditPopup>
      }
    </React.Fragment>
  );
};
