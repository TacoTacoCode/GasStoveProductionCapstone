import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import "../../styles/Popup.scss";
import axios from "axios";
import swal from "sweetalert";
import ComponentEditPopup from "../Popups/ComponentEditPopup";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { Avatar } from "@mui/material";

export const Table = (props) => {
  const { listComponent } = props;
  const array = [];

  listComponent.forEach((item) => {
    array.push(item);
  });

  const [editDatas, setEditDatas] = useState(null);
  const [open, setOpen] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  const [componentMaterial, setListComponentMaterial] = useState([]);

  function deleteComponent(id) {
    swal({
      title: "Are you sure to delete this component?",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          try {
            axios
              .put("https://localhost:5001/delComponent/" + id)
              .then((response) => {
                swal("Success", "Delete Component successfully", "success", {
                  button: false,
                  timer: 2000,
                });
              })
              .catch((err) => {
                swal("Error", "Delete Component failed", "error", {
                  button: false,
                  time: 2000,
                });
              });
          } catch (error) {
            console.log(error);
          }
          delay(function () { window.location.reload(); }, 1000);
        } else {
          swal({
            title: "Your Component is safe!",
            icon: "info",
          });
        }
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
        (rowData.imageUrl != null)
          ? <img style={{ height: "80px", width: "80px" }} src={"https://firebasestorage.googleapis.com/v0/b/gspspring2022.appspot.com/o/Images%2F" + rowData.imageUrl} />
          : <Avatar sx={{ width: 80, height: 80 }} variant="square" />
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
        rowData => (rowData.status == 'Unactive')
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

  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  return (
    <React.Fragment>
      <MaterialTable
        title={"List of Components"}
        data={array}
        columns={columns}
        actions={[
          rowData => ({
            icon: "delete",
            tooltip: "Delete this component",
            onClick: (event, rowData) => {
              deleteComponent(rowData.componentId);
            },
            disabled: (rowData.status == 'Unactive')
          }),
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
      {editDatas &&
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
      }
    </React.Fragment>
  );
};
