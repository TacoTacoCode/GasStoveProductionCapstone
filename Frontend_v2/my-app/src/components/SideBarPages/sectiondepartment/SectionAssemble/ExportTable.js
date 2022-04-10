import React, { useEffect, useState } from "react";
import MaterialTable from "material-table";
import moment from 'moment';
import axios from "axios";

export const ExTable = (props) => {
    const { listProcessDetail } = props;
    const [listProCom, setListProCom] = useState([])

    useEffect(() => {
        if (listProcessDetail) {
            let datas = []
            let promises = listProcessDetail.map((e) =>
                axios.get('https://localhost:5001/getListProCompo/' + e.processId)
            )
            Promise.all(promises)
                .then((e) => e.map((ele, index) => {
                    let obj = {}
                    ele.data.map((element) => {
                        if (!obj['productId']) {
                            obj['productId'] = element.productId
                            obj['product'] = element.product
                            obj['component'] = [{ ...element.component, "amount": element.amount }]
                        } else {
                            obj['component'].push({ ...element.component, "amount": element.amount })
                        }
                    })
                    obj['processDetailId'] = listProcessDetail[index].processDetailId
                    obj['amount'] = listProcessDetail[index].totalAmount
                    datas.push(obj)
                }))
                .then((e) => {
                    localStorage.setItem('datas', JSON.stringify(datas))
                    setListProCom(datas)
                })
        }
    }, [listProcessDetail])

    const columns = [
        {
            title: "Task Id",
            field: "processDetailId",
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
            render: (e) => `0${e.processDetailId}`
        },
        {
            title: "Product Image",
            field: 'productImage',
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
            render: (e) => listProCom.length > 0 ?
                <img src={`https://firebasestorage.googleapis.com/v0/b/gspspring2022.appspot.com/o/Images%2F${listProCom[e.tableData.id].product.imageUrl}`}
                    width="100px" height="100px" />
                : null
        },
        {
            title: "Product Name",
            field: 'productName',
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
            render: (e) => listProCom.length > 0 ?
                `${listProCom[e.tableData.id].product.productName}`
                : ''
        },
        {
            title: "Finished Amount",
            field: "finishedAmount",
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
        },
        {
            title: "Total Amount",
            field: "totalAmount",
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
        },
        {
            title: "Average amount per day",
            field: "averageAmount",
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
            render:
                rowData => rowData.averageAmount ? rowData.averageAmount : 0,
        },
        {
            title: "Expiry Date",
            field: "expiryDate",
            cellStyle: { fontFamily: "Muli", textAlign: 'center' },
            render:
                rowData => moment(rowData.expiryDate).format('DD MMM, YYYY'),
        },

    ];
    return (
        <React.Fragment>
            <MaterialTable
                title={"List of Task"}
                data={listProcessDetail}
                columns={columns}
                actions={[]}
                options={{
                    addRowPosition: "first",
                    actionsColumnIndex: -1,
                    exportButton: false,
                    search: false,
                    headerStyle: { backgroundColor: "#E30217", color: "#fff", textAlign: 'center' },
                }}
            />
        </React.Fragment>
    );
};