import React from 'react'
import SUCCESSIMAGE from '../assest/success.gif'
import { Link } from 'react-router-dom'

const OrderPlaced = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded'>
      <img
        src={SUCCESSIMAGE}
        width={150}
        height={150}
      />
      <p className='text-green-600 font-bold text-xl'>Payment Successfully</p>
    </div>
  )
}

export default OrderPlaced