import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import { motion, AnimatePresence } from 'framer-motion'
import { loadStripe } from '@stripe/stripe-js'

const Cart = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const context = useContext(Context)
  const loadingCart = new Array(4).fill(null)

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: 'include',
      headers: { "content-type": 'application/json' },
    })
    const responseData = await response.json()
    if (responseData.success) setData(responseData.data)
  }

  useEffect(() => {
    setLoading(true)
    fetchData().then(() => setLoading(false))
    // eslint-disable-next-line
  }, [])

  const increaseQty = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: { "content-type": 'application/json' },
      body: JSON.stringify({ _id: id, quantity: qty + 1 })
    })
    const responseData = await response.json()
    if (responseData.success) fetchData()
  }

  const decraseQty = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: 'include',
        headers: { "content-type": 'application/json' },
        body: JSON.stringify({ _id: id, quantity: qty - 1 })
      })
      const responseData = await response.json()
      if (responseData.success) fetchData()
    }
  }

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: 'include',
      headers: { "content-type": 'application/json' },
      body: JSON.stringify({ _id: id })
    })
    const responseData = await response.json()
    if (responseData.success) {
      fetchData()
      context.fetchUserAddToCart()
    }
  }

   const handlePayment = async()=>{

        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const response = await fetch(SummaryApi.payment.url,{
            method : SummaryApi.payment.method,
            credentials : 'include',
            headers : {
                "content-type" : 'application/json'
            },
            body : JSON.stringify({
                cartItems : data
            })
        })               

        const responseData = await response.json()

        if(responseData?.id){
            stripePromise.redirectToCheckout({ sessionId : responseData.id})
        }

        console.log("payment response",responseData)
    }

  const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0)
  const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0)

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-120px)] py-8 px-2 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow p-6 mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Shopping Cart</h2>
            <span className="text-slate-500 text-sm">{data.length} item{data.length !== 1 && "s"}</span>
          </div>
          <div>
            {loading ? (
              loadingCart.map((_, idx) => (
                <div key={idx} className="bg-slate-200 rounded-xl h-32 mb-4 animate-pulse"></div>
              ))
            ) : (
              <AnimatePresence>
                {data.length === 0 ? (
                  <motion.div
                    className="bg-white rounded-xl shadow p-10 text-center text-gray-400 font-semibold mt-10"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                  >
                    Your cart is empty.
                  </motion.div>
                ) : (
                  data.map((product, idx) => (
                    <motion.div
                      key={product?._id}
                      className="flex items-center bg-white rounded-xl shadow mb-6 p-4 gap-4"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 30 }}
                      transition={{ duration: 0.18, delay: idx * 0.04 }}
                    >
                      <div className="w-28 h-28 flex-shrink-0 bg-slate-100 rounded-lg flex items-center justify-center">
                        <img
                          src={"http://localhost:8080/" + product?.productId?.productImage[0]}
                          alt={product?.productId?.productName}
                          className="w-24 h-24 object-contain rounded"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between h-full">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 truncate">{product?.productId?.productName}</h3>
                          <p className="text-slate-500 text-sm capitalize">{product?.productId?.category}</p>
                        </div>
                        <div className="flex items-center gap-6 mt-3">
                          <div className="flex items-center gap-2">
                            <motion.button
                              className="w-8 h-8 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center text-xl font-bold hover:bg-blue-500 hover:text-white transition"
                              whileTap={{ scale: 0.93 }}
                              onClick={() => decraseQty(product?._id, product?.quantity)}
                            >-</motion.button>
                            <span className="font-medium px-2">{product?.quantity}</span>
                            <motion.button
                              className="w-8 h-8 rounded-full border border-blue-500 text-blue-500 flex items-center justify-center text-xl font-bold hover:bg-blue-500 hover:text-white transition"
                              whileTap={{ scale: 0.93 }}
                              onClick={() => increaseQty(product?._id, product?.quantity)}
                            >+</motion.button>
                          </div>
                          <span className="text-blue-600 font-bold text-lg">{displayINRCurrency(product?.productId?.sellingPrice)}</span>
                          <span className="text-slate-700 font-semibold text-lg">{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</span>
                        </div>
                      </div>
                      <motion.button
                        className="ml-4 text-red-600 hover:bg-red-50 rounded-full p-2 transition"
                        whileHover={{ scale: 1.13 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() => deleteCartProduct(product?._id)}
                      >
                        <MdDelete size={24} />
                      </motion.button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            )}
          </div>
        </div>
        {/* Order Summary */}
        <div>
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8 sticky top-28"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-xl font-bold text-blue-700 mb-6">Order Summary</h3>
            <div className="flex justify-between text-slate-600 mb-3">
              <span>Items</span>
              <span>{totalQty}</span>
            </div>
            <div className="flex justify-between text-slate-600 mb-3">
              <span>Total Price</span>
              <span>{displayINRCurrency(totalPrice)}</span>
            </div>
            <motion.button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full py-3 mt-4 font-semibold shadow transition"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePayment}
              disabled={data.length === 0}
            >
              Proceed to Payment
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Cart
