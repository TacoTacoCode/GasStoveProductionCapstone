import React, { useState, useEffect } from "react";
import "../../../../App.css";
import { ImportExcelButton } from "../../../button/ImportExcelButton";
import { Table } from "../../../tabledata/SectionDashBoard";
import axios from "axios";

function ProcessDetail() {
    const [listProcessDetail, setListProcessDetail] = useState([])
    const sectionLeadId = localStorage.getItem('currentId');
    useEffect(() => {
        document.title = "Section Dashboard";
        axios.get(`https://localhost:5001/getSectionBySectionLeadId/${sectionLeadId}`)
            .then((res) => {
                localStorage.setItem('currentSectionInfo', JSON.stringify(res.data));
                axios.get(`https://localhost:5001/getListProcessDetail/${res.data.sectionId}`)
                    .then((response) => {
                        setListProcessDetail(response.data);
                    }).catch((error) => {
                        alert("Error at get processDetails")
                    })
            }).catch((err) => {
                alert("Error at get section info");
            })
    }, []);
    return (
        <>
            <div className="importexport">
                <ImportExcelButton
                    type="button"
                    className='btn-Import'
                    buttonStyle={"btn--primary--solid"}
                    onClick={() => {
                        alert('Click Import')
                    }}
                >
                    Import
                </ImportExcelButton>
                <ImportExcelButton
                    type="button"
                    className='btn-Export'
                    buttonStyle={"btn--primary--solid"}
                    onClick={() => {
                        localStorage.setItem('listProcessDetail', JSON.stringify(listProcessDetail))
                        return window.location.href = "/section/exportElement"
                    }}
                >
                    Export
                </ImportExcelButton></div>
            <div className="process-details" style={{ margin: "80px" }}>
                <Table
                    listProcessDetail={listProcessDetail}
                />
            </div>
        </>
    );
}

export default ProcessDetail;
