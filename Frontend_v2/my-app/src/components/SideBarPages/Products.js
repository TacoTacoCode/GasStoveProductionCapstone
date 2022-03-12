import React, { useState, useEffect } from 'react';
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import { Table } from '../tabledata/ProductsTable';
import ComponentPopup from '../Popups/ProductPopup'
import axios from 'axios';

function Products() {
  const [addProductBtn, setaddProductBtn] = useState(false);
  const [listProduct, setListProduct] = useState([]);

  useEffect(() => {
    const getUserAPI = 'https://5df8a4c6e9f79e0014b6a587.mockapi.io/freetuts/users'

    axios.get(getUserAPI).then((res) => {
      setListProduct(res.data);
    }).catch((err) => {
      //Trường hợp xảy ra lỗi
      console.log(err);
      alert("Xảy ra lỗi");
    })

  }, [])

  return (
    <>
      <ImportExcelButton type="button"
        onClick={() => {
          setaddProductBtn(true)
        }}>
        Add Product
      </ImportExcelButton>
      <ComponentPopup trigger={addProductBtn} setTrigger={setaddProductBtn}>
        <h3 className='popuptitle'>Add a product</h3>
      </ComponentPopup>
      <div className='products'>
        <Table listProduct={listProduct} />
      </div></>
  )
}

export default Products