import { React, useState } from 'react';
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import { Table } from '../tabledata/ProductsTable';
import ComponentPopup from '../Popups/ProductPopup'
import AddProduct from './AddProduct';

function Products() {
  const [addProductBtn, setaddProductBtn] = useState(false);

  return (
    <>
      <ImportExcelButton type="button"
        onClick={() => {
          setaddProductBtn(true)
        }}>
        Add Product
      </ImportExcelButton>
      <ComponentPopup trigger={addProductBtn} setTrigger={setaddProductBtn}>
        <AddProduct />
      </ComponentPopup>
      <div className='products'>
        <Table /></div></>
  )
}

export default Products