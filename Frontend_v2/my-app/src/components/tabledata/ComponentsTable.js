import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../styles/Popup.scss";
import axios from "axios";
import swal from "sweetalert";
import ComponentEditPopup from "../Popups/ComponentEditPopup";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";

export const Table = (props) => {
  const { listComponent } = props;
  const array = [];

  listComponent.forEach((item) => {
    array.push(item);
  });

  const [editDatas, setEditDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  const [componentMaterial, setListComponentMaterial] = useState([]);

  function deleteComponent(id) {
    axios
      .put("https://localhost:5001/delComponent/" + id)
      .then((response) => {
        swal("Success", "Delete Component successfully", "success", {
          button: false,
          timer: 2000,
        });
        props.setSubmittedTime();
      })
      .catch((err) => {
        swal("Error", "Delete Component failed", "error", {
          button: false,
          time: 2000,
        });
      });
  }

  const columns = [
    {
      title: "Component ID",
      field: "componentId",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Component Image",
      field: "imageUrl",
      render: (rowData) => (
        <img style={{ height: "70px", width: "70px" }} src={rowData.imageUrl} />
      ),
      cellStyle: { fontFamily: "Arial" },
      align: "left",
    },
    {
      title: "Component Name",
      field: "componentName",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Amount",
      field: "amount",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Unit",
      field: "substance",
      cellStyle: { fontFamily: "Arial" },
    },
    {
      title: "Status",
      field: "status",
      render:
        rowData => (rowData.status == 'Inactive')
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

  const handleEditData = (rowData) => {
    setEditDatas(rowData);
    setOpen(true);
    axios.get("https://localhost:5001/getMateByCompoId/" + rowData.componentId).then(
      (res) => setListComponentMaterial(res.data)
    )
  }

  return (
    <React.Fragment>
      <MaterialTable
        title={"List of Components"}
        data={array}
        columns={columns}
        actions={[
          {
            icon: "delete",
            tooltip: "Delete this component",
            onClick: (event, rowData) => {
              deleteComponent(rowData.componentId);
              window.location.reload();
            },
          },
          {
            icon: "edit",
            tooltip: "Edit this component",
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
      <ComponentEditPopup
        compoMates={componentMaterial}
        data={editDatas}
        setData={setEditDatas}
        IsOpen={open}
        setOpen={setOpen}
        setSubmittedTime={() => {
          setNewDataSubmitted((prev) => prev + 1);
        }}
      >
        <h3 className="popuptitle">Edit component : {editDatas.componentId} </h3>
      </ComponentEditPopup>
    </React.Fragment>
  );
};
