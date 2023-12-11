import React from 'react'

function AlertBox({status, message}) {
    let alertClass;
    if( status === 'success' ) {
        alertClass = 'bg-green-50';
    } else if( status === 'error' ) {
        alertClass = 'bg-red-50';
    } else {
        alertClass = 'bg-green-50';
    }
    
  return (
    <div className={`${alertClass} p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50`}>{message}</div>
  )
}

export default AlertBox;
