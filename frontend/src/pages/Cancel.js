import React from 'react'
import CANCELIMAGE from '../assest/cancel.gif'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Cancel = () => {
  return (
    <motion.div
      className="bg-white w-full max-w-md mx-auto flex flex-col items-center p-8 mt-10 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <img
        src={CANCELIMAGE}
        width={160}
        height={160}
        alt="Payment Cancelled"
        className="mix-blend-multiply mb-4"
      />
      <p className="text-red-600 font-bold text-2xl mb-2">Payment Cancelled</p>
      <p className="text-gray-500 text-center mb-6">
        Your payment was not completed.<br />
        You can try again or check your cart.
      </p>
      <Link
        to="/cart"
        className="px-6 py-2 rounded-full border-2 border-red-600 text-red-600 font-semibold hover:bg-red-600 hover:text-white transition-colors duration-200"
      >
        Go To Cart
      </Link>
    </motion.div>
  )
}

export default Cancel
