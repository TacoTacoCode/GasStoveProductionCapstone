import React from 'react'
import './ComponentPopup.css'
import CloseIcon from '@mui/icons-material/Close'

function ProductPopup(props) {
  return (props.trigger) ? (
    <div className='componentpopup'>
      <div className='popup-inner'>
        <div><button className='close-btn' onClick={() => props.setTrigger(false)}>
          <CloseIcon style={{ 'color': "white", }} />
        </button></div>
        {props.children}
      </div>
    </div>
  ) : "";
}

export default ProductPopup