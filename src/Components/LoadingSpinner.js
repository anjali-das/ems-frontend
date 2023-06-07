import React from 'react'
import Spinner from 'react-bootstrap/Spinner';

function LoadingSpinner() {
  return (
    <div style={{width:'100%',height:'40vh'}} className='d-flex justify-content-center align-items-center'>
      <Spinner animation="grow" variant="primary" />
              <span className='ms-2'>Loading..</span>

    </div>
  )
}

export default LoadingSpinner