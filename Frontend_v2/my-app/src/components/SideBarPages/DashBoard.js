import React from 'react'
import { Table } from '../tabledata/DashboardTable';
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';

export default function DashBoard(props) {
  // const user = JSON.parse(localStorage.getItem('user'));
  const id = props;
  console.log("id:" + id);

  return (
    <>
    <h1>{localStorage.getItem('currentUser')}</h1>
      <ImportExcelButton>Import from Excel</ImportExcelButton>
      <div className='dashboard'>
        <Table />
      </div>
    </>
  );
}
