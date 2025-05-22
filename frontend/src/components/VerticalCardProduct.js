import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import { motion } from 'framer-motion'

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(4).fill(null)
  const scrollElement = useRef()
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setData(categoryProduct?.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [])

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 320
  }
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 320
  }

  return (
    <div className="w-full my-10 relative">
      <div className="flex items-center justify-between mb-4 px-2">
        <h2 className="text-xl md:text-2xl font-bold text-slate-800">{heading}</h2>
        <div className="hidden md:flex gap-2">
          <button
            className="bg-white shadow rounded-full p-2 text-lg hover:bg-slate-100 transition"
            onClick={scrollLeft}
            aria-label="Scroll left"
          >
            <FaAngleLeft />
          </button>
          <button
            className="bg-white shadow rounded-full p-2 text-lg hover:bg-slate-100 transition"
            onClick={scrollRight}
            aria-label="Scroll right"
          >
            <FaAngleRight />
          </button>
        </div>
      </div>
      <div
        ref={scrollElement}
        className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 px-2 pb-2"
        style={{ scrollBehavior: 'smooth' }}
      >
        {loading
          ? loadingList.map((_, idx) => (
              <div
                key={idx}
                className="w-72 min-w-[270px] bg-white rounded-xl shadow p-4 flex flex-col items-center animate-pulse"
              >
                <div className="bg-slate-200 h-40 w-full rounded-xl mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3 mb-4"></div>
                <div className="h-8 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))
          : data.map((product) => (
              <motion.div
                key={product?._id}
                whileHover={{ y: -8, boxShadow: "0 8px 24px rgba(0,0,0,0.08)" }}
                className="w-72 min-w-[270px] bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition"
              >
                <Link
                  to={`/product/${product?._id}`}
                  className="w-full flex flex-col items-center group"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="bg-slate-100 h-40 w-full rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                    <img
                      src={`http://localhost:8080/${product.productImage[0]}`}
                      alt={product.productName}
                      className="object-contain h-36 transition-transform duration-300 group-hover:scale-105"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>
                  <h3 className="font-semibold text-base md:text-lg text-slate-800 text-center line-clamp-1 mb-1">
                    {product?.productName}
                  </h3>
                  <p className="capitalize text-slate-500 text-sm mb-2">{product?.category}</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-blue-600 font-bold text-lg">
                      {displayINRCurrency(product?.sellingPrice)}
                    </span>
                    <span className="text-slate-400 line-through text-sm">
                      {displayINRCurrency(product?.price)}
                    </span>
                  </div>
                </Link>
                <button
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full font-semibold shadow transition"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  Add to Cart
                </button>
              </motion.div>
            ))}
      </div>
    </div>
  )
}

export default VerticalCardProduct
