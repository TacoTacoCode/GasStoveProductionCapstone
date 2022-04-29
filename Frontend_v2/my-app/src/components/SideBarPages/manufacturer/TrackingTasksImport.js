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

        axios
            .get(getAllTaskImport)
            .then((res) => {
                setListTaskImport(res.data);
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