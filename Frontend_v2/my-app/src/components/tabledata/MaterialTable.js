import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useMountEffect,
} from "react";
import MaterialTable from "material-table";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";
import { alpha, styled } from "@mui/material/styles";
import "../../App.css";
import "../../styles/Popup.scss";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  InputAdornment,
  makeStyles,
  MenuItem,
  TextField,
} from "@mui/material";
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
        <img style={{ height: "60px", width: "60px" }} src={rowData.imageUrl} />
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

  const statuses = [
    {
      value: "Active",
      label: "Active",
    },
    {
      value: "Inactive",
      label: "Inactive",
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

  const [editDatas, setEditDatas] = useState([]);
  const [open, setOpen] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);

  const [imageUrl, setMaterialImage] = useState("");
  const [materialId, setMaterialId] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [unit, setMaterialUnit] = useState("");
  const [amount, setMaterialAmount] = useState("");
  const [status, setStatus] = useState("Active");
  const [description, setDescription] = useState("");

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
