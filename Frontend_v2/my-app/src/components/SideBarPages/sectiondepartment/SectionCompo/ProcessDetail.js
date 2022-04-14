import React, { useState, useEffect } from "react";
import "../../../../App.css";
import { ImportExcelButton } from "../../../button/ImportExcelButton";
import { Table } from "../../../tabledata/SectionDashBoard";
import { ExTable } from "../SectionAssemble/ExportTable";
import axios from "axios";

function ProcessDetail() {
    const [listProcessDetail, setListProcessDetail] = useState([])
    const [curSectionInfo, setCurSectionInfo] = useState(null)
    const sectionLeadId = localStorage.getItem('currentId');
    useEffect(() => {
        document.title = "Section Dashboard";
        axios.get(`https://localhost:5001/getSectionBySectionLeadId/${sectionLeadId}`)
            .then((res) => {
                localStorage.setItem('currentSectionInfo', JSON.stringify(res.data));
                setCurSectionInfo(res.data);
                axios.get(`https://localhost:5001/getListProcessDetail/${res.data.sectionId}`)
                    .then((response) => {
                        setListProcessDetail(response.data);
                        localStorage.setItem('listProcessDetail', JSON.stringify(response.data))
                    }).catch((error) => {
                        localStorage.setItem('listProcessDetail', JSON.stringify(listProcessDetail))
                        alert("Error at get processDetails")
                    })
            }).catch((err) => {
                alert("Error at get section info");
            })
    }, []);
    return (
        curSectionInfo && <>
            <ImportExcelButton
            style={{marginTop: '1%', marginRight: '2%'}}
                type="button"
                className='btn-Import'
                buttonStyle={"btn--primary--solid"}
                onClick={() => {
                    return curSectionInfo.isAssemble ?
                        window.location.href = "/section/importCompo" :
                        window.location.href = "/section/importElement";
                }}
            >
                Import {curSectionInfo.isAssemble ? `Product` : 'Component'}
            </ImportExcelButton>
            <ImportExcelButton
                style={{ marginTop: '1%', marginRight: '1%' }}
                type="button"
                className='btn-Export'
                buttonStyle={"btn--primary--solid"}
                onClick={() => {
                    return curSectionInfo.isAssemble ?
                        window.location.href = "/section/exportCompo" :
                        window.location.href = "/section/exportElement";

                }}
            >
                Request {curSectionInfo.isAssemble ? `Component` : 'Material'}
            </ImportExcelButton>
            {curSectionInfo !== null ?
                <div className="processdetail">
                    {
                        curSectionInfo.isAssemble ?
                            <ExTable listProcessDetail={listProcessDetail} />
                            : <Table listProcessDetail={listProcessDetail} />
                    }
                </div>
                : null}
        </>
    );
}

export default ProcessDetail;
