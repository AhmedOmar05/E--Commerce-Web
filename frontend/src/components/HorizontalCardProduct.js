import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const FALLBACK_IMAGE = "https://via.placeholder.com/120?text=No+Image"

const HorizontalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const scrollElement = useRef()
  const { fetchUserAddToCart } = useContext(Context)

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setData(categoryProduct?.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [category])

  const scrollRight = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft += 320
    }
  }
  const scrollLeft = () => {
    if (scrollElement.current) {
      scrollElement.current.scrollLeft -= 320
    }
  }

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  return (
    <div className="container mx-auto px-4 my-8 relative">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">{heading}</h2>

      {/* Navigation Arrows (desktop only) */}
      <button
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow rounded-full p-2 text-xl text-blue-600 hover:bg-blue-600 hover:text-white transition"
        onClick={scrollLeft}
        aria-label="Scroll left"
        style={{ pointerEvents: 'auto' }}
      >
        <FaAngleLeft />
      </button>
      <button
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white shadow rounded-full p-2 text-xl text-blue-600 hover:bg-blue-600 hover:text-white transition"
        onClick={scrollRight}
        aria-label="Scroll right"
        style={{ pointerEvents: 'auto' }}
      >
        <FaAngleRight />
      </button>

      <div
        ref={scrollElement}
        className="flex gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 pb-2 px-2 md:px-12"
        style={{ scrollBehavior: 'smooth' }}
      >
        {loading
          ? Array.from({ length: 4 }).map((_, idx) => (
              <div
                key={idx}
                className="min-w-[320px] h-40 bg-white rounded-xl shadow-md flex animate-pulse"
              >
                <div className="w-1/3 bg-slate-200 rounded-l-xl" />
                <div className="w-2/3 p-4 space-y-3">
                  <div className="h-4 bg-slate-200 rounded-full w-3/4" />
                  <div className="h-3 bg-slate-200 rounded-full w-1/2" />
                  <div className="h-4 bg-slate-200 rounded-full w-1/3" />
                  <div className="h-8 bg-slate-200 rounded-full" />
                </div>
              </div>
            ))
          : data.map((product) => {
              const imgSrc =
                product?.productImage?.[0]
                  ? "http://localhost:8080/" + product.productImage[0]
                  : FALLBACK_IMAGE
              return (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="min-w-[320px] h-40 bg-white rounded-xl shadow-md hover:shadow-lg transition-all flex overflow-hidden group"
                  style={{ textDecoration: 'none' }}
                >
                  <div className="w-1/3 bg-slate-100 flex items-center justify-center p-4">
                    <img
                      src={imgSrc}
                      alt={product.productName}
                      className="object-contain h-full w-full transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null
                        e.target.src = FALLBACK_IMAGE
                      }}
                    />
                  </div>
                  <div className="w-2/3 p-4 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-slate-800 line-clamp-2">
                        {product.productName}
                      </h3>
                      <p className="text-sm text-slate-500 capitalize">
                        {product.category}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <p className="text-lg font-bold text-blue-600">
                          {displayINRCurrency(product.sellingPrice)}
                        </p>
                        <p className="text-sm text-slate-400 line-through">
                          {displayINRCurrency(product.price)}
                        </p>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product._id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </Link>
              )
            })}
      </div>
    </div>
  )
}

export default HorizontalCardProduct
