import React, { useEffect, useState } from 'react'
import { Table } from '../../tabledata/RequestComponentTable';
import '../../../App.css';
import { AiFillFileExcel } from 'react-icons/ai';
import { ImportExcelButton } from '../../button/ImportExcelButton';
import axios from 'axios';

export default function RequestComponent() {
    useEffect(() => {
        document.title = "UFA - Dashboard"
    }, []);

    const [listRequestComponents, setListRequesComponents] = useState([]);

    useEffect(() => {
        const getRequestComponent = 'https://localhost:5001/getExByType/C'
        //Gọi API bằng axios
        axios.get(getRequestComponent).then((res) => {
            console.log(res.data)
            setListRequesComponents(res.data);
        }).catch((err) => {
            console.log(err);
            alert("Xảy ra lỗi");
        })

    }, []);

    return (
        <>
            <ImportExcelButton
                style={{ marginTop: '2%', marginRight: '2%' }}>
                {/* <div>
                    <AiFillFileExcel size={24} style={{ verticalAlign: "middle" }} />
                    &ensp;
                    <text style={{ verticalAlign: "middle" }}>Import from Excel</text>
                </div> */}
                Import from Excel
            </ImportExcelButton>
            <div className='sections'>
                <Table listRequestComponents={listRequestComponents} />
            </div>
        </>
    );
}
