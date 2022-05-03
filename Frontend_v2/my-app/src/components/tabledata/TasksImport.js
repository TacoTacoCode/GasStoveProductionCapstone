import { styled } from "@material-ui/core";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { TextField, Typography } from "@mui/material";
import axios from "axios";
import MaterialTable from "material-table";
import moment from "moment";
import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export const TrackingTaskImportTable = (props) => {
	const CssTextField = styled(TextField)({
		width: "100%",
		"& .MuiOutlinedInput-root": {
			fontFamily: "Muli",
			fontSize: "18px",

			"& fieldset": {
				border: "none",
			},
		},
		"& .MuiOutlinedInput-input": {
			textAlign: "center",
			fontFamily: "Muli",
		},
	});

	const { listTaskImport } = props;
	const array = [];

	listTaskImport.forEach((item) => {
		array.push(item);
	});

	var delay = (function () {
		var timer = 0;
		return function (callback, ms) {
			clearTimeout(timer);
			timer = setTimeout(callback, ms);
		};
	})();

	const columns = [
		{
			title: "Import Id",
			field: "importExportDetailId",
			cellStyle: { fontFamily: "Muli", fontSize: "18px" },
			align: "center",
		},
		// {
		//     title: "Section ID",
		//     field: "sectionId",
		//     cellStyle: { fontFamily: "Muli", fontSize: "18px" },
		//     align: 'center',
		// },
		{
			title: "Task Id",
			field: "processDetailId",
			cellStyle: { fontFamily: "Muli", fontSize: "18px" },
			align: "center",
		},
		{
			title: "Item Name",
			field: "itemName",
			cellStyle: { fontFamily: "Muli", fontSize: "18px" },
			render: (rowData) => localStorage["componentName"],
			align: "center",
		},
		{
			title: "Amount",
			field: "amount",
			cellStyle: { fontFamily: "Muli", fontSize: "18px" },
			align: "center",
		},
		{
			title: "Created Date",
			field: "createdDate",
			render: (rowData) =>
				moment(rowData.createdDate).format("MM/DD/YYYY"),
			cellStyle: { fontFamily: "Muli" },
			align: "center",
		},
	];

	const MyNewTitle = ({ text = "Table Title", variant = "h6" }) => (
		<Typography
			variant={variant}
			style={{ color: "#333C83", fontFamily: "Muli" }}
		>
			{text}
		</Typography>
	);

	return (
		<MaterialTable
			title={
				<MyNewTitle
					variant="h6"
					text={`Importing List for ${localStorage["componentName"]} `}
				/>
			}
			data={array}
			columns={columns}
			options={{
				searchFieldVariant: "outlined",
				searchFieldStyle: {
					fontFamily: "Muli",
					color: "#0E185F",
					marginTop: "2%",
					marginBottom: "2%",
				},
				addRowPosition: "first",
				actionsColumnIndex: -1,
				exportButton: false,
				headerStyle: { backgroundColor: "#bd162c", color: "#fff" },
			}}
		/>
	);
};

export default TrackingTaskImportTable;
