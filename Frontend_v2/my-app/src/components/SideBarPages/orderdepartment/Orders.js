import {React, useEffect} from 'react'
import '../../../App.css';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import { Table } from '../../tabledata/OrdersTable';
import { OrderDetailTable } from '../../tabledata/OrderDetailTable';
import ComponentPopup from '../../Popups/ComponentPopup'
import { useState } from 'react'
import axios from 'axios'


function Orders() {
  const [addOrderBtn, setAddOrderBtn] = useState(false);
  const [listOrder, setListOrder] = useState([]);


    useEffect(() => {
      const getAllOrders = 'https://localhost:5001/getAllOrders'
      //Gọi API bằng axios
      axios.get(getAllOrders).then((res) => {
        setListOrder(res.data);
      }).catch((err) => {
        console.log(err);
        alert("Xảy ra lỗi");
      })

    }, []);

  return (
    <>
      <ImportExcelButton type="button"
        onClick={() => {
          setAddOrderBtn(true)
        }
        }>Add Order</ImportExcelButton>
      <ComponentPopup trigger={addOrderBtn} setTrigger={setAddOrderBtn}>
        <h3>ComponentPopup</h3>
      </ComponentPopup>
      <div className='components'>
        <Table listOrder={listOrder}/>
      </div>
    </>
  )
}

export default Orders