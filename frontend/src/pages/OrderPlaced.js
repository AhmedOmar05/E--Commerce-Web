import React from 'react'
import SUCCESSIMAGE from '../assest/success.gif'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheckCircle } from 'react-icons/fa'

const OrderPlaced = () => {
  return (
    <motion.div
      className="bg-white w-full max-w-md mx-auto flex flex-col items-center p-8 mt-10 rounded-2xl shadow-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      {/* Success Icon or GIF */}
      <div className="mb-4 flex items-center justify-center">
        {SUCCESSIMAGE ? (
          <img
            src={SUCCESSIMAGE}
            width={120}
            height={120}
            alt="Order Success"
            className="rounded-full shadow"
          />
        ) : (
          <FaCheckCircle size={100} className="text-green-500" />
        )}
      </div>
      <p className="text-green-600 font-bold text-2xl mb-2 flex items-center gap-2">
        <FaCheckCircle className="inline text-green-500" size={28} />
        Payment Successful!
      </p>
      <p className="text-gray-500 text-center mb-6">
        Your order has been placed successfully.<br />
        Thank you for shopping with us!
      </p>
      <div className="flex gap-4 mt-2">
        <Link
          to="/"
          className="px-6 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold shadow transition-colors duration-200"
        >
          Continue Shopping
        </Link>
        <Link
          to="/cart"
          className="px-6 py-2 rounded-full border-2 border-green-600 text-green-600 font-semibold hover:bg-green-600 hover:text-white transition-colors duration-200"
        >
          View Orders
        </Link>
      </div>
    </motion.div>
  )
}

export default OrderPlaced
