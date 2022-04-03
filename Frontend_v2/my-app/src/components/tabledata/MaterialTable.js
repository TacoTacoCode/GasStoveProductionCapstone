import React, {
  useState,
} from "react";
import MaterialTable from "material-table";
import axios from "axios";
import swal from "sweetalert";
import MaterialEditPopup from "../Popups/MaterialEditPopup";
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';
import { IconContext } from "react-icons";

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

    props.setSubmittedTime();
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
        <img style={{ height: "60px", width: "60px" }} src={"https://firebasestorage.googleapis.com/v0/b/gspspring2022.appspot.com/o/Images%2F" + rowData.imageUrl} />
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

  const [editDatas, setEditDatas] = useState([]);
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
          {
            icon: "delete",
            tooltip: "Delete this Material",
            onClick: (event, rowData) => {
              deleteMaterial(rowData.materialId);
            },
          },
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

    </React.Fragment>
  );
};
