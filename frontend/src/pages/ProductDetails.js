import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar, FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategroyWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context'
import { motion, AnimatePresence } from 'framer-motion'

const ProductDetails = () => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const { fetchUserAddToCart } = useContext(Context)
  const navigate = useNavigate()

  // For image zoom (optional, can be enhanced further)
  const [zoomImage, setZoomImage] = useState(false)
  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })

  const fetchProductDetails = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method: SummaryApi.productDetails.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ productId: params?.id })
    })
    const dataReponse = await response.json()
    setData(dataReponse?.data)
    setActiveImage(dataReponse?.data?.productImage[0])
    setLoading(false)
  }

  useEffect(() => {
    fetchProductDetails()
    // eslint-disable-next-line
  }, [params])

  const handleMouseEnterProduct = (imageURL) => {
    setActiveImage(imageURL)
  }

  // Optional: image zoom effect
  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height
    setZoomImageCoordinate({ x, y })
  }, [])

  const handleLeaveImageZoom = () => setZoomImage(false)

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async (e, id) => {
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  // UI Start
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-120px)] py-8 px-2 md:px-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col lg:flex-row gap-8">
        {/* Product Images */}
        <div className="flex flex-col gap-4 w-full lg:w-[420px]">
          <div className="relative bg-slate-100 rounded-xl flex items-center justify-center h-96 w-full overflow-hidden">
            {loading ? (
              <div className="w-full h-full bg-slate-200 animate-pulse rounded-xl" />
            ) : (
              <img
                src={"http://localhost:8080/" + activeImage}
                alt={data.productName}
                className="h-full w-full object-contain transition-transform duration-300"
                onMouseMove={handleZoomImage}
                onMouseLeave={handleLeaveImageZoom}
                style={zoomImage ? { transform: 'scale(1.05)' } : {}}
              />
            )}
            {/* Optional: Zoom overlay can go here */}
          </div>
          {/* Thumbnails */}
          <div className="flex gap-2 justify-center">
            {loading
              ? productImageListLoading.map((_, idx) => (
                  <div key={idx} className="h-16 w-16 bg-slate-200 rounded-lg animate-pulse" />
                ))
              : data?.productImage?.map((imgURL, idx) => (
                  <button
                    key={imgURL}
                    className={`h-16 w-16 rounded-lg p-1 border-2 transition ${
                      activeImage === imgURL
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-transparent hover:border-blue-200'
                    }`}
                    onMouseEnter={() => handleMouseEnterProduct(imgURL)}
                    onClick={() => handleMouseEnterProduct(imgURL)}
                  >
                    <img
                      src={"http://localhost:8080/" + imgURL}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
          </div>
        </div>
        {/* Product Details */}
        <div className="flex-1 flex flex-col justify-between">
          {loading ? (
            <div className="space-y-4">
              <div className="h-6 w-1/3 bg-slate-200 rounded animate-pulse" />
              <div className="h-10 w-2/3 bg-slate-200 rounded animate-pulse" />
              <div className="h-5 w-1/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-6 w-1/2 bg-slate-200 rounded animate-pulse" />
              <div className="h-12 w-full bg-slate-200 rounded animate-pulse" />
              <div className="h-32 w-full bg-slate-200 rounded animate-pulse" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold w-fit mb-1">
                {data?.brandName}
              </span>
              <h1 className="text-3xl font-bold text-slate-800">{data?.productName}</h1>
              <span className="capitalize text-slate-500 text-sm">{data?.category}</span>
              <div className="flex items-center gap-1 text-yellow-500 text-lg my-2">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalf />
                <span className="ml-2 text-xs text-slate-400">(4.5/5)</span>
              </div>
              <div className="flex items-center gap-4 text-2xl font-semibold my-2">
                <span className="text-blue-600">{displayINRCurrency(data.sellingPrice)}</span>
                <span className="text-slate-400 line-through text-lg">{displayINRCurrency(data.price)}</span>
              </div>
              <div className="flex gap-4 my-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-full font-semibold shadow transition"
                  onClick={(e) => handleBuyProduct(e, data?._id)}
                >
                  Buy Now
                </button>
                <button
                  className="bg-white border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-2 rounded-full font-semibold shadow transition"
                  onClick={(e) => handleAddToCart(e, data?._id)}
                >
                  Add to Cart
                </button>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-700 mb-1">Description</h2>
                <p className="text-slate-600">{data?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Recommendations */}
      {data.category && (
        <div className="max-w-6xl mx-auto mt-12">
          <CategroyWiseProductDisplay category={data?.category} heading={"You may also like"} />
        </div>
      )}
    </div>
  )
}

export default ProductDetails
