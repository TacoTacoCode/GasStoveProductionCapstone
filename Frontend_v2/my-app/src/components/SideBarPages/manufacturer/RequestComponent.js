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
        let getRequestComponent = 'https://localhost:5001/getExByType/C'
        if (localStorage['currentRole'] === 'Section Department') {
            let section = JSON.parse(localStorage['currentSectionInfo'])
            getRequestComponent = 'https://localhost:5001/getExsOf/sec/' + section.sectionId
        }
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
        <div className='sections'>
            <Table listRequestComponents={listRequestComponents} />
        </div>
    );
}
