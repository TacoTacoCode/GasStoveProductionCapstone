import React from 'react'
import { Table } from '../tabledata/DashboardTable';
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';

function DashBoard() {
  return (
    <>
      <ImportExcelButton>Import from Excel</ImportExcelButton>
      <div className='dashboard'>
        <Table /></div></>
  );
}

export default (DashBoard);
