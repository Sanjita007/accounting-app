import React from 'react'
import { useParams } from 'react-router';

const EditProduct = () => {
    let {ticker} = useParams();

  return (
    <div>
      This is for editing Product with ID: {ticker}
    </div>
  )
}

export default EditProduct