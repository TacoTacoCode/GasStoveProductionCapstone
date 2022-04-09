import React, { useState, useEffect } from "react";
import "../../../App.css";
import { ImportExcelButton } from "../../button/ImportExcelButton";
import { Table } from "../../tabledata/SectionTable";
import axios from "axios";
import ImportFilePopup from "../../Popups/ImportFilePopup";
import SectionPopup from "../../Popups/SectionPopup";

function Sections() {
  useEffect(() => {
    document.title = "UFA - Manage Sections"
  }, []);

  const [addSectionBtn, setaddSectionBtn] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  const [importFile, setImportFile] = useState(false);
  const [listSection, setListSection] = useState([]);

  useEffect(() => {
    const getAllSections = "https://localhost:5001/getAllSections";

    axios
      .get(getAllSections)
      .then((res) => {
        setListSection(res.data);
      })
      .catch((err) => {
        //Trường hợp xảy ra lỗi
        console.log(err);
        alert("Xảy ra lỗi");
      });
  }, [newDataSubmitted]);

  return (
    <>
      <ImportExcelButton
        type="button"
        onClick={() => {
          setaddSectionBtn(true);
        }}
      >
        Add Section
      </ImportExcelButton>
      <SectionPopup
        trigger={addSectionBtn}
        setTrigger={setaddSectionBtn}
        setSubmittedTime={() => {
          setNewDataSubmitted((prev) => prev + 1);
        }}
      >
        <h3 className="popuptitle">Add a section</h3>
      </SectionPopup>
      <div className="components">
        <Table
          listSection={listSection}
          setSubmittedTime={() => {
            setNewDataSubmitted((prev) => prev + 1);
          }}
        />
      </div>
    </>
  );
}

export default Sections;