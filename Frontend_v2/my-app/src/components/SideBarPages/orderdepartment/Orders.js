import { React, useEffect } from 'react'
import '../../../App.css';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import { Table } from '../../tabledata/OrdersTable';
import { OrderDetailTable } from '../../tabledata/OrderDetailTable';
import OrderPopup from '../../Popups/OrderPopup'
import { useState } from 'react'
import axios from 'axios'


function Orders() {
  useEffect(() => {
    document.title = "UFA - Manage Orders"
  }, []);

  const [addOrderBtn, setAddOrderBtn] = useState(false);
  const [newDataSubmitted, setNewDataSubmitted] = useState(1);
  const [listOrder, setListOrder] = useState([]);

  useEffect(() => {
    const getAllOrders = 'https://localhost:5001/getAllOrders'
    //Gọi API bằng axios
    axios.get(getAllOrders).then((res) => {
      var expiryDate = res.data[0].expiryDate;
      var input = document.createElement("input");
      input.type = "date";
      input.className = "expiryDate";
      input.defaultValue = expiryDate.substring(0, expiryDate.indexOf('T'))
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
      <OrderPopup
        trigger={addOrderBtn}
        setTrigger={setAddOrderBtn}
        setSubmittedTime={() => {
          setNewDataSubmitted((prevState) => prevState + 1);
        }}>
        <h3 className="popuptitle">Add an order</h3>
      </OrderPopup>
      <div className='components'>
        <Table listOrder={listOrder}
          setSubmittedTime={() =>
            setNewDataSubmitted((prevState) => prevState + 1)
          } />
      </div>
    </>
  )
}

export default Orders