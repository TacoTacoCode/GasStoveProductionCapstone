import React, { useState, useEffect } from 'react';
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import { Table } from '../tabledata/MaterialTable';
import ComponentPopup from '../Popups/MaterialPopup'
import axios from 'axios';

function Materials() {
  const [addmaterialBtn, setaddmaterialBtn] = useState(false);
  const [listUser, setListUser] = useState([]);

  useEffect(() => {
    const getUserAPI = 'https://5df8a4c6e9f79e0014b6a587.mockapi.io/freetuts/users'

    //Gọi API bằng axios
    axios.get(getUserAPI).then((res) => {
      // Cập nhật lại listUser bằng
      // Bạn có thể xem lại bài viết về useState()
      setListUser(res.data);
    }).catch((err) => {
      //Trường hợp xảy ra lỗi
      console.log(err);
      alert("Xảy ra lỗi");
    })

  }, [])

  return (
    <>
      <ImportExcelButton type="button"
        onClick={() => {
          setaddmaterialBtn(true)
        }}>Add Material</ImportExcelButton>
      <ComponentPopup trigger={addmaterialBtn} setTrigger={setaddmaterialBtn}>
        <h3 className='popuptitle'>Add a material</h3>
      </ComponentPopup>
      <div className='materials'>
        <Table listUser={listUser} />
      </div>
    </>
  )
}

export default Materials