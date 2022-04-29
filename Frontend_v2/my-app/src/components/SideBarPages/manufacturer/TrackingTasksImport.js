import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../../App.css'
import TrackingTaskImportTable from '../../tabledata/TasksImport'

function TrackingTasksImport() {
    useEffect(() => {
        document.title = "UFA - Tracking Tasks Import"
    }, []);
  
    const [listTaskImport, setListTaskImport] = useState([]);
    
    let processDetailId = localStorage.getItem('processDetailId')

    useEffect(() => {
        const getAllTaskImport = 'https://localhost:5001/getImports/' + processDetailId;
        let datas = []
        axios
            .get(getAllTaskImport)
            .then((res) => {
                let promises = res.data.map((e) => {
                    datas.push({ ...e })
                    return axios.get(`${process.env.REACT_APP_API_URL}getImEx/` + e.importExportId)
                })
                Promise.all(promises).then((e) =>
                    e.map((ele, index) => {
                        datas[index].createdDate = ele.data.createdDate
                    })
                ).then(() => {
                    setListTaskImport(datas)
                    console.log(datas)
                })
            })
            .catch((err) => {
                //Trường hợp xảy ra lỗi
                console.log(err);
                alert("Xảy ra lỗi");
            });
    }, []);
    return (
        <div className="tracking-plans">
            <TrackingTaskImportTable
                listTaskImport={listTaskImport}
            />
        </div>
    )
}

export default TrackingTasksImport