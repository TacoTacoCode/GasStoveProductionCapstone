import React, { useState, useEffect } from "react";
import "../../../App.css";
import { FaClipboardList, FaPlus } from 'react-icons/fa';
import { AiFillFileExcel } from 'react-icons/ai';
import { ImportExcelButton } from "../../button/ImportExcelButton";
import { Table } from "../../tabledata/MaterialTable";
import MaterialPopup from "../../Popups/MaterialPopup";
import axios from "axios";
import ImportFilePopup from "../../Popups/ImportFilePopup";

function Materials() {
  useEffect(() => {
    document.title = "UFA - Manage Materials"
  }, []);

  const [addmaterialBtn, setaddmaterialBtn] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  const [importFile, setImportFile] = useState(false);
  const [listMaterial, setListMaterial] = useState([]);

  useEffect(() => {
    const getUserAPI = "https://localhost:5001/getAllMaterials";
    //Gọi API bằng axios
    axios
      .get(getUserAPI)
      .then((res) => {
        setListMaterial(res.data);
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
        <div>
          <AiFillFileExcel size={24} style={{ verticalAlign: "middle" }} />
          &ensp;
          <text style={{ verticalAlign: "middle" }}>Import Material File</text>
        </div>
      </ImportExcelButton>
      <ImportFilePopup
        trigger={importFile}
        setTrigger={setImportFile}
        dataType="material"
      >
        <h3 className="popuptitle">Import Material File</h3>
      </ImportFilePopup>
      <ImportExcelButton
        type="button"
        onClick={() => {
          setaddmaterialBtn(true);
        }}
      >
        <div>
          <FaPlus size={24} style={{ verticalAlign: "middle" }} />
          &ensp;
          <text style={{ verticalAlign: "middle" }}>Add Material</text>
        </div>
      </ImportExcelButton>
      <MaterialPopup
        trigger={addmaterialBtn}
        setTrigger={setaddmaterialBtn}
        setSubmittedTime={() => {
          setNewDataSubmitted((prev) => prev + 1);
        }}
      >
        <h3 className="popuptitle">Add a material</h3>
      </MaterialPopup>
      <div className="materials">
        <Table
          listMaterial={listMaterial}
          setSubmittedTime={() =>
            setNewDataSubmitted((prevState) => prevState + 1)
          }
        />
      </div>
    </>
  );
}

export default Materials;
