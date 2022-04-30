import axios from 'axios';
import React, { useEffect, useState } from 'react'
import '../../../App.css'
import TrackingPlansTable from '../../tabledata/TrackingPlansTable'

function TrackingProcess() {
    useEffect(() => {
        document.title = "UFA - Tracking Plans"
    }, []);

    const [listPlan, getListPlan] = useState([]);

    useEffect(() => {
        const getAllPlans = `${process.env.REACT_APP_API_URL}getAllProcesss`;
        let promises = []
        let data = []
        axios
            .get(getAllPlans)
            .then((res) => {
                res.data.map(e =>{
                    data.push(e)
                    promises.push(axios.get(`${process.env.REACT_APP_API_URL}getTaskName/${e.processId}`))
                })
                
            })
            .catch((err) => {
                //Trường hợp xảy ra lỗi
                console.log(err);
                alert("Xảy ra lỗi");
            }).then(() =>{
                Promise.all(promises).then(re => re.map((item, index) => {
                    let tmp = data[index];
                    data[index] = {
                        ...tmp,
                        'taskName': item.data
                    }
                })).then(()=>{
                    getListPlan(data);
                })
            })
    }, []);
    return (
        <div className="tracking-plans">
            <TrackingPlansTable
                listPlan={listPlan}
            />
        </div>
    )
}

export default TrackingProcess