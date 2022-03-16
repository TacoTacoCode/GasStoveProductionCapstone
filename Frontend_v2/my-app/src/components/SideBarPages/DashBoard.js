import React from 'react'
import { Table } from '../tabledata/DashboardTable';
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import MenuItem from '@material-ui/core/MenuItem';

export default function DashBoard() {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      <ImportExcelButton>Import from Excel</ImportExcelButton>
      <div className='dashboard'>
        <Table />
      </div>
    </>
  );
}
