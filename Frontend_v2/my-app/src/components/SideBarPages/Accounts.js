import { React, useState } from 'react';
import '../../App.css';
import { ImportExcelButton } from '../button/ImportExcelButton';
import { Table } from '../tabledata/AccountsTable';
import ComponentPopup from '../Popups/AccountPopup'
import AddAccount from './AddAccount';

function Accounts() {
  const [addAccountBtn, setaddAccountBtn] = useState(false);

  return (
    <>
      <ImportExcelButton type="button"
        onClick={() => {
          setaddAccountBtn(true)
        }}>
        Add Account
      </ImportExcelButton>
      <ComponentPopup trigger={addAccountBtn} setTrigger={setaddAccountBtn}>
        <AddAccount />
      </ComponentPopup>

      {/* useEffect(() => {
          console.log('useEffect has been called!');

          return () => {
            console.log('useEffect in return has been called!');
          }
        }, []); */}

      <div className='accounts'>
        <Table />
      </div>
    </>
  )
}

export default Accounts