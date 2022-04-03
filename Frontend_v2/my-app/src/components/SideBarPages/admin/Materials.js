import React, { useState, useEffect } from "react";
import "../../../App.css";
import { ImportExcelButton } from "../../button/ImportExcelButton";
import { Table } from "../../tabledata/MaterialTable";
import MaterialPopup from "../../Popups/MaterialPopup";
import axios from "axios";

function Materials() {
  useEffect(() => {
    document.title = "UFA - Manage Materials"
  }, []);

  const [addmaterialBtn, setaddmaterialBtn] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
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
          setaddmaterialBtn(true);
        }}
      >
        Add Material
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
