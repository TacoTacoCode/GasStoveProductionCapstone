import { React, useEffect, Fragment } from 'react'
import '../../../App.css';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { DeliveryButton } from '../../button/DeliveryButton';
import { useState } from 'react'
import axios from 'axios'
import { TextGetAccountByID } from '../../NonSideBarPage/TextGetAccountByID';
import { TextGetOrderDetailByID } from '../../NonSideBarPage/TextGetOrderDetailByID';


function Delivery() {
  useEffect(() => {
    document.title = "UFA - Manage Delivery"
  }, []);

  const [visibleNewBtn, setVisibleNewBtn] = useState(true);
  const [visiblePreparingBtn, setVisiblePreparingBtn] = useState(false);
  const [visibleReadyBtn, setVisibleReadyBtn] = useState(false);
  const [visibleDeliveredBtn, setVisibleDeliveredBtn] = useState(false);

  //state list
  const [listOrderNew, setListOrderNew] = useState([]);
  const [listOrderPreparing, setListOrderPreparing] = useState([]);
  const [listOrderReady, setListOrderReady] = useState([]);
  const [listOrderDelivered, setListOrderDelivered] = useState([]);

  //count list
  const [countListOrderNew, setCountListOrderNew] = useState(0);
  const [countListOrderPreparing, setCountListOrderPreparing] = useState(0);
  const [countListOrderReady, setCountListOrderReady] = useState(0);
  const [countListOrderDelivered, setCountListOrderDelivered] = useState(0);

  // Get listOrderNew
  useEffect(() => {
    const getAllOrders = 'https://localhost:5001/getOrders/new'
    //Gọi API bằng axios
    axios.get(getAllOrders).then((res) => {
      setListOrderNew(res.data);
      setCountListOrderNew(res.data.length);
    }).catch((err) => {
      console.log(err);
      alert("Cannot Load List Order Done");
    })
  }, []);

  // Get listOrderPreparing
  useEffect(() => {
    const getAllOrders = 'https://localhost:5001/getOrders/processing'
    //Gọi API bằng axios
    axios.get(getAllOrders).then((res) => {
      setListOrderPreparing(res.data);
      setCountListOrderPreparing(res.data.length);
    }).catch((err) => {
      console.log(err);
      alert("Cannot Load List Order In Progess");
    })
  }, []);

  // Get listOrderReady
  useEffect(() => {
    const getAllOrders = 'https://localhost:5001/getOrders/done'
    //Gọi API bằng axios
    axios.get(getAllOrders).then((res) => {
      setListOrderReady(res.data);
      setCountListOrderReady(res.data.length);
    }).catch((err) => {
      console.log(err);
      alert("Cannot Load List Order Done");
    })
  }, []);

  // Get listOrderReady
  useEffect(() => {
    const getAllOrders = 'https://localhost:5001/getOrders/delivery'
    //Gọi API bằng axios
    axios.get(getAllOrders).then((res) => {
      setListOrderDelivered(res.data);
      setCountListOrderDelivered(res.data.length);
    }).catch((err) => {
      console.log(err);
      alert("Cannot Load List Order Done");
    })
  }, []);

  return (
    <Fragment>
      <br /><br /><br />
      <div>
        <DeliveryButton type="button"
          onClick={() => {
            setVisibleNewBtn(true)
            setVisiblePreparingBtn(false)
            setVisibleReadyBtn(false)
            setVisibleDeliveredBtn(false)
          }
          }>New - [{countListOrderPreparing}]</DeliveryButton>
        <DeliveryButton type="button"
          onClick={() => {
            setVisibleNewBtn(false)
            setVisiblePreparingBtn(true)
            setVisibleReadyBtn(false)
            setVisibleDeliveredBtn(false)
          }
          }>Preparing - [{countListOrderPreparing}]</DeliveryButton>
        <DeliveryButton type="button"
          onClick={() => {
            setVisibleNewBtn(false)
            setVisiblePreparingBtn(false)
            setVisibleReadyBtn(true)
            setVisibleDeliveredBtn(false)
          }
          }>Ready - [{countListOrderReady}]</DeliveryButton>
        <DeliveryButton type="button"
          onClick={() => {
            setVisibleNewBtn(false)
            setVisiblePreparingBtn(false)
            setVisibleReadyBtn(false)
            setVisibleDeliveredBtn(true)
          }
          }>Delivered - [{countListOrderDelivered}]</DeliveryButton>
      </div>
      <br /><br /><br /><br />
      <hr />
      <br /><br />
      {
        (visibleNewBtn == true && visiblePreparingBtn == false && visibleReadyBtn == false && visibleDeliveredBtn == false)
          ? <div>
            {listOrderNew.map(data => (
              (data.isShorTerm == true)
                ?
                <Card style={{ marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "LIGHTGRAY", borderRadius: "20px" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                  >
                    <div style={{ margin: "1%", width: "95%" }}>
                      <text className="content_delivery">Customer</text>
                      <br /><br />
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        {/* Customer Details */}
                        <TextGetAccountByID accountID={data.accountId} />
                        {/* Order Details */}
                        <div>
                          <text className="content_delivery">Order : </text>
                          <br /><br />
                          <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>ID: </text>&ensp;<text>{data.orderId}</text></p>
                          <p className="content_delivery_content">
                            <text style={{ fontWeight: "500" }}>Status: </text>
                            &ensp;
                            <text>{(data.status == 'new')
                              ? <text style={{ color: 'LIGHTBLUE' }}>NEW</text>
                              : ""}</text>
                          </p>
                        </div>
                      </Stack>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Product Details */}
                      <text className="content_delivery">Product : </text>
                      <br /><br />
                      <TextGetOrderDetailByID orderID={data.orderId} />
                    </div>
                  </Stack>
                </Card>
                :
                <Card style={{ marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "LIGHTGRAY", borderRadius: "20px" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                  >
                    <div style={{ margin: "1%", width: "95%" }}>
                      <text className="content_delivery">Customer</text>
                      <br /><br />
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        {/* Customer Details */}
                        <TextGetAccountByID accountID={data.accountId} />
                        {/* Order Details */}
                        <div>
                          <text className="content_delivery">Order : </text>
                          <br /><br />
                          <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>ID: </text>&ensp;<text>{data.orderId}</text></p>
                          <p className="content_delivery_content">
                            <text style={{ fontWeight: "500" }}>Status: </text>
                            &ensp;
                            <text>{(data.status == 'new')
                              ? <text style={{ color: 'LIGHTBLUE' }}>NEW</text>
                              : ""}</text>
                          </p>
                        </div>
                      </Stack>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Long Term Details */}
                      <text className="content_delivery">Long Term Process: </text>
                      <br /><br />
                      <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Ăn cơm rùi làm tiếp !</text></p>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Product Details */}
                      <text className="content_delivery">Product : </text>
                      <br /><br />
                      <TextGetOrderDetailByID orderID={data.orderId} />
                    </div>
                  </Stack>
                </Card>
            ))}
          </div>
          : null
      }

      {
        (visibleNewBtn == false && visiblePreparingBtn == true && visibleReadyBtn == false && visibleDeliveredBtn == false)
          ? <div>
            {listOrderPreparing.map(data => (
              (data.isShorTerm == true)
                ?
                <Card style={{ marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "LIGHTGRAY", borderRadius: "20px" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                  >
                    <div style={{ margin: "1%", width: "95%" }}>
                      <text className="content_delivery">Customer</text>
                      <br /><br />
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        {/* Customer Details */}
                        <TextGetAccountByID accountID={data.accountId} />
                        {/* Order Details */}
                        <div>
                          <text className="content_delivery">Order : </text>
                          <br /><br />
                          <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>ID: </text>&ensp;<text>{data.orderId}</text></p>
                          <p className="content_delivery_content">
                            <text style={{ fontWeight: "500" }}>Status: </text>
                            &ensp;
                            <text>{(data.status == 'processing')
                              ? <text style={{ color: 'DARKBLUE' }}>PROCESSING</text>
                              : ""}</text>
                          </p>
                        </div>
                      </Stack>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Product Details */}
                      <text className="content_delivery">Product : </text>
                      <br /><br />
                      <TextGetOrderDetailByID orderID={data.orderId} />
                    </div>
                  </Stack>
                </Card>
                :
                <Card style={{ marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "LIGHTGRAY", borderRadius: "20px" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                  >
                    <div style={{ margin: "1%", width: "95%" }}>
                      <text className="content_delivery">Customer</text>
                      <br /><br />
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        {/* Customer Details */}
                        <TextGetAccountByID accountID={data.accountId} />
                        {/* Order Details */}
                        <div>
                          <text className="content_delivery">Order : </text>
                          <br /><br />
                          <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>ID: </text>&ensp;<text>{data.orderId}</text></p>
                          <p className="content_delivery_content">
                            <text style={{ fontWeight: "500" }}>Status: </text>
                            &ensp;
                            <text>{(data.status == 'processing')
                              ? <text style={{ color: 'DARKBLUE' }}>PROCESSING</text>
                              : ""}</text>
                          </p>
                        </div>
                      </Stack>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Long Term Details */}
                      <text className="content_delivery">Long Term Process: </text>
                      <br /><br />
                      <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Ăn cơm rùi làm tiếp !</text></p>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Product Details */}
                      <text className="content_delivery">Product : </text>
                      <br /><br />
                      <TextGetOrderDetailByID orderID={data.orderId} />
                    </div>
                  </Stack>
                </Card>
            ))}
          </div>
          : null
      }

      {
        (visibleNewBtn == false && visiblePreparingBtn == false && visibleReadyBtn == true && visibleDeliveredBtn == false)
          ? <div>
            {listOrderReady.map(data => (
              (data.isShorTerm == true)
                ?
                <Card style={{ marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "LIGHTGRAY", borderRadius: "20px" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                  >
                    <div style={{ margin: "1%", width: "95%" }}>
                      <text className="content_delivery">Customer</text>
                      <br /><br />
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        {/* Customer Details */}
                        <TextGetAccountByID accountID={data.accountId} />
                        {/* Order Details */}
                        <div>
                          <text className="content_delivery">Order : </text>
                          <br /><br />
                          <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>ID: </text>&ensp;<text>{data.orderId}</text></p>
                          <p className="content_delivery_content">
                            <text style={{ fontWeight: "500" }}>Status: </text>
                            &ensp;
                            <text>{(data.status == 'done')
                              ? <text style={{ color: 'BLUE' }}>DONE</text>
                              : ""}</text>
                          </p>
                        </div>
                      </Stack>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Product Details */}
                      <text className="content_delivery">Product : </text>
                      <br /><br />
                      <TextGetOrderDetailByID orderID={data.orderId} />
                    </div>
                  </Stack>
                </Card>
                :
                <Card style={{ marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "LIGHTGRAY", borderRadius: "20px" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                  >
                    <div style={{ margin: "1%", width: "95%" }}>
                      <text className="content_delivery">Customer</text>
                      <br /><br />
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        {/* Customer Details */}
                        <TextGetAccountByID accountID={data.accountId} />
                        {/* Order Details */}
                        <div>
                          <text className="content_delivery">Order : </text>
                          <br /><br />
                          <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>ID: </text>&ensp;<text>{data.orderId}</text></p>
                          <p className="content_delivery_content">
                            <text style={{ fontWeight: "500" }}>Status: </text>
                            &ensp;
                            <text>{(data.status == 'done')
                              ? <text style={{ color: 'BLUE' }}>DONE</text>
                              : ""}</text>
                          </p>
                        </div>
                      </Stack>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Long Term Details */}
                      <text className="content_delivery">Long Term Process: </text>
                      <br /><br />
                      <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Ăn cơm rùi làm tiếp !</text></p>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Product Details */}
                      <text className="content_delivery">Product : </text>
                      <br /><br />
                      <TextGetOrderDetailByID orderID={data.orderId} />
                    </div>
                  </Stack>
                </Card>
            ))}
          </div>
          : null
      }

      {
        (visibleNewBtn == false && visiblePreparingBtn == false && visibleReadyBtn == false && visibleDeliveredBtn == true)
          ? <div>
            {listOrderDelivered.map(data => (
              (data.isShorTerm == true)
                ?
                <Card style={{ marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "LIGHTGRAY", borderRadius: "20px" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                  >
                    <div style={{ margin: "1%", width: "95%" }}>
                      <text className="content_delivery">Customer</text>
                      <br /><br />
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        {/* Customer Details */}
                        <TextGetAccountByID accountID={data.accountId} />
                        {/* Order Details */}
                        <div>
                          <text className="content_delivery">Order : </text>
                          <br /><br />
                          <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>ID: </text>&ensp;<text>{data.orderId}</text></p>
                          <p className="content_delivery_content">
                            <text style={{ fontWeight: "500" }}>Status: </text>
                            &ensp;
                            <text>{(data.status == 'delivery')
                              ? <text style={{ color: 'GREEN' }}>DELIVERIED</text>
                              : ""}</text>
                          </p>
                        </div>
                      </Stack>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Product Details */}
                      <text className="content_delivery">Product : </text>
                      <br /><br />
                      <TextGetOrderDetailByID orderID={data.orderId} />
                    </div>
                  </Stack>
                </Card>
                :
                <Card style={{ marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "LIGHTGRAY", borderRadius: "20px" }}>
                  <Stack
                    direction="row"
                    divider={<Divider orientation="vertical" flexItem />}
                    spacing={1}
                  >
                    <div style={{ margin: "1%", width: "95%" }}>
                      <text className="content_delivery">Customer</text>
                      <br /><br />
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        {/* Customer Details */}
                        <TextGetAccountByID accountID={data.accountId} />
                        {/* Order Details */}
                        <div>
                          <text className="content_delivery">Order : </text>
                          <br /><br />
                          <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>ID: </text>&ensp;<text>{data.orderId}</text></p>
                          <p className="content_delivery_content">
                            <text style={{ fontWeight: "500" }}>Status: </text>
                            &ensp;
                            <text>{(data.status == 'delivery')
                              ? <text style={{ color: 'GREEN' }}>DELIVERIED</text>
                              : ""}</text>
                          </p>
                        </div>
                      </Stack>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Long Term Details */}
                      <text className="content_delivery">Long Term Process: </text>
                      <br /><br />
                      <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Ăn cơm rùi làm tiếp !</text></p>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Product Details */}
                      <text className="content_delivery">Product : </text>
                      <br /><br />
                      <TextGetOrderDetailByID orderID={data.orderId} />
                    </div>
                  </Stack>
                </Card>
            ))}
          </div>
          : null
      }
      <br />
    </Fragment>
  )
}

export default Delivery