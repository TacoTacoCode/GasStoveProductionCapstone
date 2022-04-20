import axios from 'axios';
import React, { useEffect, useState } from 'react'
import TrackingTaskTable from '../../tabledata/TrackingTaskTable';

function TrackingProcessDetails() {
    useEffect(() => {
        document.title = "UFA - Tracking Plans Tasks"
    }, []);

    let processId = localStorage.getItem('processId')
    const [listTask, getListTask] = useState([]);

    useEffect(() => {
        const getAllTasks = "https://localhost:5001/getProcessDetails/" + processId;

        axios
            .get(getAllTasks)
            .then((res) => {
                getListTask(res.data);
            })
            .catch((err) => {
                //Trường hợp xảy ra lỗi
                console.log(err);
                alert("Xảy ra lỗi");
            });
    }, []);
    return (
        <div className="tracking-plans">
            <TrackingTaskTable
                listTask={listTask}
            />
        </div>
    )
}

export default TrackingProcessDetails