import React, { useState, useEffect } from "react";
import "../../../App.css";
import { ImportExcelButton } from "../../button/ImportExcelButton";
import { Table } from "../../tabledata/ProductsTable";
import ProductPopup from "../../Popups/ProductPopup";
import axios from "axios";
import ImportFilePopup from "../../Popups/ImportFilePopup";
import MaterialPopup from "../../Popups/MaterialPopup";

function Products() {
  useEffect(() => {
    document.title = "UFA - Manage Products"
  }, []);

  const [addProductBtn, setaddProductBtn] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  const [importFile, setImportFile] = useState(false);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const getAllProducts = "https://localhost:5001/getProducts";

    axios
      .get(getAllProducts)
      .then((res) => {
        setListProduct(res.data);
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
          setImportFile(true);
        }}
      >
        Import Product File
      </ImportExcelButton>
      <ImportFilePopup
        trigger={importFile}
        setTrigger={setImportFile}
        dataType="product"
      >
        <h3 className="popuptitle">Import Product File</h3>
      </ImportFilePopup>
      <ImportExcelButton
        type="button"
        onClick={() => {
          setaddProductBtn(true);
        }}
      >
        Add Product
      </ImportExcelButton>
      <MaterialPopup
        trigger={addProductBtn}
        setTrigger={setaddProductBtn}
        setSubmittedTime={() => {
          setNewDataSubmitted((prev) => prev + 1);
        }}
      >
        <h3 className="popuptitle">Add a product</h3>
      </MaterialPopup>
      <ProductPopup
        trigger={addProductBtn}
        setTrigger={setaddProductBtn}
        setSubmittedTime={() => {
          setNewDataSubmitted((prev) => prev + 1);
        }}
      >
        <h3 className="popuptitle">Add a product</h3>
      </ProductPopup>
      <div className="products">
        <Table
          listProduct={listProduct}
          setSubmittedTime={() => {
            setNewDataSubmitted((prev) => prev + 1);
          }}
        />
      </div>
    </>
  );
}

export default Products;
