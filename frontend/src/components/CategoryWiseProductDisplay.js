import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const FALLBACK_IMAGE = "https://via.placeholder.com/300x200?text=No+Image"

const CategroyWiseProductDisplay = ({ category, heading }) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(4).fill(null)
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
    }, [])

    return (
        <div className="container mx-auto px-4 my-8">
            <h2 className="text-2xl font-bold text-slate-800 mb-6">{heading}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-md animate-pulse">
                            <div className="h-48 bg-slate-200 rounded-t-xl"></div>
                            <div className="p-4 space-y-3">
                                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                                <div className="flex gap-3">
                                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                                </div>
                                <div className="h-8 bg-slate-200 rounded-full"></div>
                            </div>
                        </div>
                    ))
                ) : data.map((product) => {
                    const imageUrl = product?.productImage?.[0] 
                        ? `http://localhost:8080/${product.productImage[0]}`
                        : FALLBACK_IMAGE

                    return (
                        <Link 
                            to={`/product/${product?._id}`} 
                            key={product?._id} 
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                            onClick={scrollTop}
                        >
                            <div className="h-48 w-full bg-slate-100 rounded-t-xl flex items-center justify-center p-4">
                                <img 
                                    src={imageUrl} 
                                    alt={product.productName}
                                    className="object-contain h-full w-full"
                                    onError={(e) => {
                                        e.target.onerror = null
                                        e.target.src = FALLBACK_IMAGE
                                    }}
                                />
                            </div>
                            <div className="p-4 space-y-2">
                                <h3 className="font-semibold text-lg text-slate-800 truncate">
                                    {product.productName}
                                </h3>
                                <p className="text-sm text-slate-500 capitalize">{product.category}</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg font-bold text-blue-600">
                                        {displayINRCurrency(product.sellingPrice)}
                                    </span>
                                    <span className="text-sm text-slate-400 line-through">
                                        {displayINRCurrency(product.price)}
                                    </span>
                                </div>
                                <button 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-full text-sm font-medium transition-colors"
                                    onClick={(e) => handleAddToCart(e, product._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default CategroyWiseProductDisplay
