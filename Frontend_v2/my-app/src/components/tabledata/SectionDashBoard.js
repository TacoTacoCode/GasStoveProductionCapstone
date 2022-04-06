import React, { } from "react";
import MaterialTable from "material-table";
import "../../App.css";
import "../../styles/Popup.scss";
import moment from 'moment';

export const Table = (props) => {
    const { listProcessDetail } = props;

    const columns = [
        {
            title: "Task Id",
            field: "processDetailId",
            cellStyle: { fontFamily: "Muli" },
            render: (e) => `0${e.processDetailId}`
        },
        {
            title: "Finished Amount",
            field: "finishedAmount",
            cellStyle: { fontFamily: "Muli" },
        },
        {
            title: "Total Amount",
            field: "totalAmount",
            cellStyle: { fontFamily: "Muli" },
        },
        {
            title: "Average amount per day",
            field: "averageAmount",
            cellStyle: { fontFamily: "Muli" },
            render:
                rowData => rowData.averageAmount ? rowData.averageAmount : 0,
        },
        {
            title: "Expiry Date",
            field: "expiryDate",
            cellStyle: { fontFamily: "Muli" },
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
                    headerStyle: { backgroundColor: "#E30217", color: "#fff" },
                }}
            />
        </React.Fragment>
    );
};