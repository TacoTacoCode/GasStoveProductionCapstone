import React, { useEffect, useState } from 'react'
import { Table } from '../../tabledata/RequestComponentTable';
import '../../../App.css';
import { AiFillFileExcel } from 'react-icons/ai';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import axios from 'axios';

export default function DashBoard() {
    useEffect(() => {
        document.title = "UFA - Dashboard"
    }, []);

    const [listRequestComponents, setListRequesComponents] = useState([]);

    useEffect(() => {
        const getRequestComponent = 'https://localhost:5001/getImExs'
        //Gọi API bằng axios
        axios.get(getRequestComponent).then((res) => {
            setListRequesComponents(res.data);
        }).catch((err) => {
            console.log(err);
            alert("Xảy ra lỗi");
        })

    }, []);

    return (
        <>
            <ImportExcelButton>
                <div>
                    <AiFillFileExcel size={24} style={{ verticalAlign: "middle" }} />
                    &ensp;
                    <text style={{ verticalAlign: "middle" }}>Import from Excel</text>
                </div>
            </ImportExcelButton>
            <div className='dashboard'>
                <Table listRequestComponents={listRequestComponents} />
            </div>
        </>
    );
}
