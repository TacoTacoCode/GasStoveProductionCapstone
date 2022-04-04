import React, {
  useState,
} from "react";
import MaterialTable from "material-table";
import axios from "axios";
import swal from "sweetalert";
import MaterialEditPopup from "../Popups/MaterialEditPopup";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";
import { Avatar } from "@mui/material";

export const Table = (props) => {
  const { listMaterial } = props;
  const array = [];

  listMaterial.forEach((item) => {
    array.push(item);
  });

  function deleteMaterial(id) {
    axios
      .put("https://localhost:5001/delMaterial/" + id)
      .then((res) => {
        swal("Success", "Delete material successfully", "success", {
          button: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        swal("Error", "Update material failed", "error", {
          button: false,
          timer: 2000,
        });
      });
  }

  const columns = [
    {
      title: "Material ID",
      field: "materialId",
      cellStyle: { fontFamily: "Arial", fontSize: "20px" },
    },
    {
      title: "Image",
      field: "imageUrl",
      render: (rowData) => (
        (rowData.imageUrl != null)
          ? <img style={{ height: "80px", width: "80px" }} src={"https://firebasestorage.googleapis.com/v0/b/gspspring2022.appspot.com/o/Images%2F" + rowData.imageUrl} />
          : <Avatar sx={{ width: 80, height: 80 }} variant="square" />
      ),
    },
    {
      title: "Material Name",
      field: "materialName",
      cellStyle: { fontFamily: "Arial", fontSize: "20px" },
    },
    {
      title: "Unit",
      field: "unit",
      cellStyle: { fontFamily: "Arial", fontSize: "20px", fontWeight: "500" },
    },
    {
      title: "Amount",
      field: "amount",
      cellStyle: { fontFamily: "Arial", fontSize: "20px" },
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
        title={"List of Materials"}
        data={array}
        columns={columns}
        actions={[
          rowData => ({
            icon: "delete",
            tooltip: "Delete Material",
            onClick: (event, rowData) => {
              deleteMaterial(rowData.materialId);
              window.location.reload();
            },
            disabled: (rowData.isActive == false)
          }),
          {
            icon: "edit",
            tooltip: "Edit this Material",
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
        <MaterialEditPopup
          data={editDatas}
          setData={setEditDatas}
          IsOpen={open}
          setOpen={setOpen}
          setSubmittedTime={() => {
            setNewDataSubmitted((prev) => prev + 1);
          }}
        >
          <h3 className="popuptitle">Edit material {editDatas.materialId} </h3>
        </MaterialEditPopup>
      }
    </React.Fragment>
  );
};
