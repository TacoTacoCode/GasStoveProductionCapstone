// import React from 'react'
// import { useLocation } from 'react-router-dom';

// function OrderDetails() {
//     const location  = useLocation();
//     return (
//         console.log("anbuiofwo:" + location.state.totalprice),
//         <>
//             <h1>OrderDetails</h1>
//             <h1>{location.state.id}</h1>
//         </>
//     )
// }

// export default OrderDetails

import React from 'react'
import 'D:/capstone-frontend/my-app/my-app/src/App.css';
import { ImportExcelButton } from 'D:/capstone-frontend/my-app/my-app/src/components/button/ImportExcelButton';
import { Table } from '../tabledata/OrderDetailTable';
import ComponentPopup from 'D:/capstone-frontend/my-app/my-app/src/components/Popups/ComponentPopup'
import { useState } from 'react'

function Orders() {
    const [addOrderDetailsBtn, setAddOrderDetailsBtn] = useState(false);

    return (
        <>
            <ImportExcelButton type="button"
                onClick={() => {
                    setAddOrderDetailsBtn(true)
                }
                }>Add Order Detail</ImportExcelButton>
            <ComponentPopup trigger={addOrderDetailsBtn} setTrigger={setAddOrderDetailsBtn}>
                <h3>ComponentPopup</h3>
            </ComponentPopup>
            <div className='components'>
                <Table /></div></>
    )
}

export default Orders