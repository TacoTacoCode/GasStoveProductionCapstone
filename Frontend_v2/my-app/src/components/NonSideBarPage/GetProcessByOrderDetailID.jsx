import React, { useState, useEffect } from 'react'
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import ProcessBar from '../NonSideBarPage/ProcessBar';
import moment from 'moment';
import axios from 'axios';
import swal from "sweetalert";
import {
    Button,
} from "@mui/material";

export const GetProcessByOrderDetailID = (props) => {
    const [process, setProcess] = useState([]);

    useEffect(async () => {
        const res = await axios.get("https://localhost:5001/getProcess/orderDetail/" + props.orderDetailID);
        setProcess(res.data);
    }, [])

    // Order Ready Function
    const orderReady = (e, data) => {
        e.preventDefault();
        console.log(data);
        const jsonObj = {
            processId: data.processId,
            orderDetailId: data.orderDetailId,
            totalAmount: data.totalAmount,
            finishedAmount: data.finishedAmount,
            createdDate: new Date(data.createdDate).toISOString(),
            expiryDate: new Date(data.expiryDate).toISOString(),
            finishedDate: new Date(data.finishedDate).toISOString(),
            expectedFinishDate: new Date(data.expectedFinishDate).toISOString(),
            status: 'delivery'
        }
        axios
            .put("https://localhost:5001/updateProcess", jsonObj)
            .then((res) => {
                swal("Success", "This process is accepted to delivery", "success", {
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

    // Delay function
    var delay = (function () {
        var timer = 0;
        return function (callback, ms) {
            clearTimeout(timer);
            timer = setTimeout(callback, ms);
        };
    })();

    return (props.open) ? (
        <div>
            {
                (process.length != 0)
                    ?
                    <div>
                        {
                            process.map((data, index) => (
                                <div>
                                    <Card style={{ border: '1px solid red', marginTop: "3%", marginLeft: "3%", marginBottom: "3%", backgroundColor: "white", borderRadius: "10px" }}>
                                        <Stack
                                            direction="column"
                                            divider={<Divider orientation="horizontal" flexItem style={{ border: '1px solid red' }} />}
                                            spacing={0}
                                        >
                                            <div style={{ margin: "1%", width: "95%" }}>
                                                <text className="content_delivery_longterm" style={{ fontWeight: "500", marginTop: "2%", float: 'left' }}>Process: {index + 1}</text>

                                                {(() => {
                                                    switch (data.status) {
                                                        case 'new':
                                                            return <div style={{ fontWeight: "500", marginTop: "0.5%", float: 'right', border: '1px solid RED', backgroundColor: 'red' }} className="text_square">
                                                                <text style={{ color: 'white', fontWeight: "500" }}>NEW</text>
                                                            </div>
                                                        case 'processing':
                                                            return <div style={{ fontWeight: "500", marginTop: "0.5%", float: 'right', border: '1px solid DARKBLUE', backgroundColor: 'DARKBLUE' }} className="text_square">
                                                                <text style={{ color: 'white', fontWeight: "500" }}>PROCESSING</text>
                                                            </div>
                                                        case 'done':
                                                            return <div style={{ fontWeight: "500", marginTop: "0.5%", float: 'right', border: '1px solid BLUE', backgroundColor: 'BLUE' }} className="text_square">
                                                                <text style={{ color: 'white', fontWeight: "500" }}>DONE</text>
                                                            </div>
                                                        case 'delivery':
                                                            return <div style={{ fontWeight: "500", marginTop: "0.5%", float: 'right', border: '1px solid #99ff66', backgroundColor: '#99ff66' }} className="text_square">
                                                                <text style={{ color: 'white', fontWeight: "500" }}>DELIVERY</text>
                                                            </div>
                                                    }
                                                })()
                                                }

                                            </div>
                                            <div style={{ margin: "1%", width: "98%" }}>
                                                <p className="content_delivery_content" style={{ fontWeight: "450" }}><text>Process ID: </text>&ensp;<text>{data.processId}</text></p>
                                                <p className="content_delivery_content" style={{ fontWeight: "450" }}><text>Needed Amount: </text>&ensp;<text>{data.neededAmount}</text></p>
                                                <p className="content_delivery_content" style={{ fontWeight: "450" }}><text>Total Amount: </text>&ensp;<text>{data.totalAmount}</text></p>
                                                <p className="content_delivery_content" style={{ fontWeight: "450" }}><text>Finished Amount: </text>&ensp;<text>{data.finishedAmount}</text></p>
                                                <br />
                                                <text className="content_delivery_content" style={{ fontWeight: "500" }}> Effort: </text>
                                                {(() => {
                                                    switch (data.status) {
                                                        case 'new':
                                                            return (data.finishedAmount == 0 && data.totalAmount == 0)
                                                                ?
                                                                <ProcessBar fgcolor="black" bgcolor="red" progress={0} height={30} />
                                                                :
                                                                <ProcessBar fgcolor="black" bgcolor="red" progress={(data.finishedAmount / data.totalAmount) * 100} height={30} />
                                                        case 'processing':
                                                            return (data.finishedAmount == 0 && data.totalAmount == 0)
                                                                ?
                                                                <ProcessBar fgcolor="white" bgcolor="darkblue" progress={0} height={30} />
                                                                :
                                                                <ProcessBar fgcolor="white" bgcolor="darkblue" progress={(data.finishedAmount / data.totalAmount) * 100} height={30} />
                                                        case 'done':
                                                            return (data.finishedAmount == 0 && data.totalAmount == 0)
                                                                ?
                                                                <ProcessBar fgcolor="white" bgcolor="blue" progress={0} height={30} />
                                                                :
                                                                <ProcessBar fgcolor="white" bgcolor="blue" progress={(data.finishedAmount / data.totalAmount) * 100} height={30} />
                                                        case 'delivery':
                                                            return (data.finishedAmount == 0 && data.totalAmount == 0)
                                                                ?
                                                                <ProcessBar fgcolor="black" bgcolor="#99ff66" progress={0} height={30} />
                                                                :
                                                                <ProcessBar fgcolor="black" bgcolor="#99ff66" progress={(data.finishedAmount / data.totalAmount) * 100} height={30} />
                                                    }
                                                })()
                                                }
                                                <br />
                                                <p className="content_delivery_content" style={{ fontWeight: "450" }}><text>Created Date: </text>&ensp;<text>{moment(data.createdDate).format('DD/MM/YYYY')}</text></p>
                                                <p className="content_delivery_content" style={{ fontWeight: "450" }}><text>Experied Date: </text>&ensp;<text>{moment(data.expiryDate).format('DD/MM/YYYY')}</text></p>
                                                <p className="content_delivery_content" style={{ fontWeight: "450" }}><text>Finished Date: </text>&ensp;<text>{moment(data.finishedDate).format('DD/MM/YYYY')}</text></p>
                                                <p className="content_delivery_content" style={{ fontWeight: "450" }}><text>Expected Finished Date: </text>&ensp;<text>{moment(data.expectedFinishDate).format('DD/MM/YYYY')}</text></p>
                                                <br />
                                                {
                                                    (data.status == 'done' && ((data.finishedAmount / data.totalAmount) * 100) == 100)
                                                        ? <Button style={{
                                                            fontFamily: "Muli",
                                                            width: '100%',
                                                            borderRadius: 10,
                                                            backgroundColor: "#e30217",
                                                            color: "white",
                                                        }}
                                                            onClick={(e) => orderReady(e, data)}>Order Ready</Button>
                                                        : ""
                                                }
                                            </div>
                                        </Stack>
                                    </Card>
                                </div>
                            ))
                        }
                    </div>
                    : <text className="caution-order-details">*Note: There are currently no process in this order!</text>
            }
        </div>
    ) : "";
}