import { React, useEffect, Fragment } from 'react'
import '../../../App.css';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import {
  Button,
} from "@mui/material";
import { DeliveryButton } from '../../button/DeliveryButton';
import { useState } from 'react'
import axios from 'axios'
import { TextGetAccountByID } from '../../NonSideBarPage/TextGetAccountByID';
import { TextGetOrderDetailByID } from '../../NonSideBarPage/TextGetOrderDetailByID';
import swal from "sweetalert";


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

  // Delay function
  var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
      clearTimeout(timer);
      timer = setTimeout(callback, ms);
    };
  })();

  // Order Ready Function
  const orderReady = (e, data) => {
    e.preventDefault();
    console.log(data);
    const jsonObj = {
      orderId: data.orderId,
      accountId: data.accountId,
      totalPrice: data.totalPrice,
      expiryDate: new Date(data.expiryDate).toISOString(),
      status: 'delivery',
      note: data.note,
      isShorTerm: data.isShorTerm,
    }
    axios
      .put("https://localhost:5001/updateOrder", jsonObj)
      .then((res) => {
        swal("Success", "Order is accepted to delivery", "success", {
          button: false,
          timer: 2000,
        });
      })
      .catch((err) => {
        swal("Error", "Something wrong!", "error", {
          button: false,
          timer: 2000,
        })
      }).finally(() => {
        delay(function () { window.location.reload(); }, 1000);
      })
  }

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
          }>
          <Stack
            direction="row"
            spacing={3}
          >
            <div style={{ verticalAlign: "middle", padding: "5px" }}>New</div>
            <div className="number_square">
              {countListOrderPreparing}
            </div>
          </Stack>
          {
            (visibleNewBtn == true) ? <div style={{ marginTop: "10px", backgroundColor: "white", height: "3px" }}></div> : ""
          }
        </DeliveryButton>
        <DeliveryButton type="button"
          onClick={() => {
            setVisibleNewBtn(false)
            setVisiblePreparingBtn(true)
            setVisibleReadyBtn(false)
            setVisibleDeliveredBtn(false)
          }
          }>          <Stack
            direction="row"
            spacing={3}
          >
            <div style={{ verticalAlign: "middle", padding: "5px" }}>Preparing</div>
            <div className="number_square">
              {countListOrderPreparing}
            </div>
          </Stack>
          {
            (visiblePreparingBtn == true) ? <div style={{ marginTop: "10px", backgroundColor: "white", height: "3px" }}></div> : ""
          }</DeliveryButton>
        <DeliveryButton type="button"
          onClick={() => {
            setVisibleNewBtn(false)
            setVisiblePreparingBtn(false)
            setVisibleReadyBtn(true)
            setVisibleDeliveredBtn(false)
          }
          }>          <Stack
            direction="row"
            spacing={3}
          >
            <div style={{ verticalAlign: "middle", padding: "5px" }}>Ready</div>
            <div className="number_square">
              {countListOrderReady}
            </div>
          </Stack>
          {
            (visibleReadyBtn == true) ? <div style={{ marginTop: "10px", backgroundColor: "white", height: "3px" }}></div> : ""
          }</DeliveryButton>
        <DeliveryButton type="button"
          onClick={() => {
            setVisibleNewBtn(false)
            setVisiblePreparingBtn(false)
            setVisibleReadyBtn(false)
            setVisibleDeliveredBtn(true)
          }
          }>          <Stack
            direction="row"
            spacing={3}
          >
            <div style={{ verticalAlign: "middle", padding: "5px" }}>Delivery</div>
            <div className="number_square">
              {countListOrderDelivered}
            </div>
          </Stack>
          {
            (visibleDeliveredBtn == true) ? <div style={{ marginTop: "10px", backgroundColor: "white", height: "3px" }}></div> : ""
          }
        </DeliveryButton>
      </div>
      <br /><br /><br /><br />
      <hr style={{ border: '1px solid red', borderRadius: '5px' }} />
      <br /><br />
      {
        (visibleNewBtn == true && visiblePreparingBtn == false && visibleReadyBtn == false && visibleDeliveredBtn == false)
          ? <div>
            {listOrderNew.map(data => (
              (data.isShorTerm == true)
                ?
                <Card style={{ border: '1px solid red', marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "white", borderRadius: "20px" }}>
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
                              ? <text style={{ color: 'DARKBLUE' }}>NEW</text>
                              : ""}</text>
                          </p>
                        </div>
                      </Stack>
                    </div>
                    <div style={{ margin: "1%", width: "95%" }}>
                      {/* Product Details */}
                      <text className="content_delivery">Product : </text>
                      <br /><br />
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        <TextGetOrderDetailByID orderID={data.orderId} />
                        <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Total Price: </text>&emsp;<text>{data.totalPrice} VND</text></p>
                        {
                          (data.status == 'done' && data.totalPrice > 0)
                            ? <Button style={{
                              fontFamily: "Muli",
                              borderRadius: 10,
                              backgroundColor: "#e30217",
                              color: "white",
                            }}
                              onClick={(e) => orderReady(e, data)}>Order Ready</Button>
                            : ""
                        }
                      </Stack>
                    </div>
                  </Stack>
                </Card>
                :
                <Card style={{ border: '1px solid red', marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "white", borderRadius: "20px" }}>
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
                              ? <text style={{ color: 'DARKBLUE' }}>NEW</text>
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
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        <TextGetOrderDetailByID orderID={data.orderId} />
                        <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Total Price: </text>&emsp;<text>{data.totalPrice} VND</text></p>
                        {
                          (data.status == 'done' && data.totalPrice > 0)
                            ? <Button style={{
                              fontFamily: "Muli",
                              borderRadius: 10,
                              backgroundColor: "#e30217",
                              color: "white",
                            }}
                              onClick={(e) => orderReady(e, data)}>Order Ready</Button>
                            : ""
                        }
                      </Stack>
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
                <Card style={{ border: '1px solid red', marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "white", borderRadius: "20px" }}>
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
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        <TextGetOrderDetailByID orderID={data.orderId} />
                        <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Total Price: </text>&emsp;<text>{data.totalPrice} VND</text></p>
                        {
                          (data.status == 'done' && data.totalPrice > 0)
                            ? <Button style={{
                              fontFamily: "Muli",
                              borderRadius: 10,
                              backgroundColor: "#e30217",
                              color: "white",
                            }}
                              onClick={(e) => orderReady(e, data)}>Order Ready</Button>
                            : ""
                        }
                      </Stack>
                    </div>
                  </Stack>
                </Card>
                :
                <Card style={{ border: '1px solid red', marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "white", borderRadius: "20px" }}>
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
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        <TextGetOrderDetailByID orderID={data.orderId} />
                        <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Total Price: </text>&emsp;<text>{data.totalPrice} VND</text></p>
                        {
                          (data.status == 'done' && data.totalPrice > 0)
                            ? <Button style={{
                              fontFamily: "Muli",
                              borderRadius: 10,
                              backgroundColor: "#e30217",
                              color: "white",
                            }}
                              onClick={(e) => orderReady(e, data)}>Order Ready</Button>
                            : ""
                        }
                      </Stack>
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
                <Card style={{ border: '1px solid red', marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "white", borderRadius: "20px" }}>
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
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        <TextGetOrderDetailByID orderID={data.orderId} />
                        <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Total Price: </text>&emsp;<text>{data.totalPrice} VND</text></p>
                        {
                          (data.status == 'done' && data.totalPrice > 0)
                            ? <Button style={{
                              fontFamily: "Muli",
                              borderRadius: 10,
                              backgroundColor: "#e30217",
                              color: "white",
                            }}
                              onClick={(e) => orderReady(e, data)}>Order Ready</Button>
                            :
                            <Button
                              disabled
                              style={{
                                fontFamily: "Muli",
                                borderRadius: 10,
                                backgroundColor: "gray",
                                color: "white",
                              }}>Order Is Not Ready</Button>
                        }
                      </Stack>
                    </div>
                  </Stack>
                </Card>
                :
                <Card style={{ border: '1px solid red', marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "white", borderRadius: "20px" }}>
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
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        <TextGetOrderDetailByID orderID={data.orderId} />
                        <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Total Price: </text>&emsp;<text>{data.totalPrice} VND</text></p>
                        {
                          (data.status == 'done' && data.totalPrice > 0)
                            ? <Button style={{
                              fontFamily: "Muli",
                              borderRadius: 10,
                              backgroundColor: "#e30217",
                              color: "white",
                            }}
                              onClick={(e) => orderReady(e, data)}>Order Ready</Button>
                            :
                            <Button
                              disabled
                              style={{
                                fontFamily: "Muli",
                                borderRadius: 10,
                                backgroundColor: "gray",
                                color: "white",
                              }}>Order Is Not Ready</Button>
                        }
                      </Stack>
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
                <Card style={{ border: '1px solid red', marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "white", borderRadius: "20px" }}>
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
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        <TextGetOrderDetailByID orderID={data.orderId} />
                        <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Total Price: </text>&emsp;<text>{data.totalPrice} VND</text></p>
                        {
                          (data.status == 'done' && data.totalPrice > 0)
                            ? <Button style={{
                              fontFamily: "Muli",
                              borderRadius: 10,
                              backgroundColor: "#e30217",
                              color: "white",
                            }}
                              onClick={(e) => orderReady(e, data)}>Order Ready</Button>
                            : ""
                        }
                      </Stack>
                    </div>
                  </Stack>
                </Card>
                :
                <Card style={{ border: '1px solid red', marginLeft: "3%", marginBottom: "3%", marginRight: "3%", backgroundColor: "white", borderRadius: "20px" }}>
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
                      <Stack
                        direction="column"
                        divider={<Divider orientation="horizontal" flexItem />}
                        spacing={1}
                      >
                        <TextGetOrderDetailByID orderID={data.orderId} />
                        <p className="content_delivery_content" style={{ fontWeight: "500" }}><text>Total Price: </text>&emsp;<text>{data.totalPrice} VND</text></p>
                        {
                          (data.status == 'done' && data.totalPrice > 0)
                            ? <Button style={{
                              fontFamily: "Muli",
                              borderRadius: 10,
                              backgroundColor: "#e30217",
                              color: "white",
                            }}
                              onClick={(e) => orderReady(e, data)}>Order Ready</Button>
                            : ""
                        }
                      </Stack>
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