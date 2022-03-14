import React from 'react'
import 'D:/capstone-frontend/my-app/my-app/src/App.css';
import {ImportExcelButton} from 'D:/capstone-frontend/my-app/my-app/src/components/button/ImportExcelButton';
import { Table } from '../tabledata/AccountsTable';

function WorkerList() {
  return (
    <>
    <ImportExcelButton>Add Worker</ImportExcelButton>
    <div className='products'>
    <Table/></div></>
  )
}

export default WorkerList