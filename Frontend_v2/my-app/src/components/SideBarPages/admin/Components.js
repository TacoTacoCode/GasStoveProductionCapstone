import React, { useState, useEffect } from "react";
import "../../../App.css";
import { FaClipboardList, FaPlus } from 'react-icons/fa';
import { AiFillFileExcel } from 'react-icons/ai';
import { ImportExcelButton } from "../../button/ImportExcelButton";
import { Table } from "../../tabledata/ComponentsTable";
import ComponentPopup from "../../Popups/ComponentPopup";
import axios from "axios";
import ImportFilePopup from "../../Popups/ImportFilePopup";

function Components() {
  useEffect(() => {
    document.title = "UFA - Manage Components"
  }, []);

  const [importFile, setImportFile] = useState(false);
  const [addcomponentBtn, setAddcomponentBtn] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  const [listComponent, setListComponent] = useState([]);

  useEffect(() => {
    const getAllComponents = "https://localhost:5001/getAllComponents";

    //Gọi API bằng axios
    axios
      .get(getAllComponents)
      .then((res) => {
        setListComponent(res.data);
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
          <text style={{ verticalAlign: "middle" }}>Import Component File</text>
        </div>
      </ImportExcelButton>
      <ImportFilePopup
        trigger={importFile}
        setTrigger={setImportFile}
        dataType="component"
      >
        <h3 className="popuptitle">Import Component File</h3>
      </ImportFilePopup>
      <ImportExcelButton
        type="button"
        onClick={() => {
          setAddcomponentBtn(true);
        }}
      >
        <div>
          <FaPlus size={24} style={{ verticalAlign: "middle" }} />
          &ensp;
          <text style={{ verticalAlign: "middle" }}>Add Component</text>
        </div>
      </ImportExcelButton>
      <ComponentPopup trigger={addcomponentBtn} setTrigger={setAddcomponentBtn} setSubmittedTime={() => {
        setNewDataSubmitted((prev) => prev + 1);
      }}>
        <h3 className="popuptitle">Add a component</h3>
      </ComponentPopup>
      <div className="components">
        <Table listComponent={listComponent} setSubmittedTime={() => {
          setNewDataSubmitted((prevState) => prevState + 1);
        }} />
      </div>
    </>
  );
}

export default Components;
