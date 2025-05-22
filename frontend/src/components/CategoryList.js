import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const FALLBACK_IMAGE = "https://via.placeholder.com/80?text=No+Image"

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)
    const categoryLoading = new Array(6).fill(null)

    const fetchCategoryProduct = async () => {
        setLoading(true)
        try {
            const response = await fetch(SummaryApi.categoryProduct.url)
            const dataResponse = await response.json()
            setCategoryProduct(dataResponse.data)
        } catch (error) {
            console.error("Error fetching categories:", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchCategoryProduct()
    }, [])

    return (
        <div className='container mx-auto px-4 py-6'>
            <div className='flex items-center gap-4 md:gap-6 overflow-x-auto pb-4 scrollbar-none'>
                {loading ? (
                    categoryLoading.map((_, index) => (
                        <motion.div
                            key={`category-loading-${index}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className='flex flex-col items-center gap-2'
                        >
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full bg-slate-200 animate-pulse' />
                            <div className='h-4 bg-slate-200 rounded w-16 animate-pulse' />
                        </motion.div>
                    ))
                ) : (
                    categoryProduct.map((product, index) => {
                        // Skip the 6th image if category is "processor"
                        if (
                            product?.category?.toLowerCase() === 'processor' &&
                            index === 6
                        ) {
                            return null
                        }

                        let imgSrc = FALLBACK_IMAGE
                        if (product?.productImage && product.productImage.length > 0) {
                            imgSrc = "http://localhost:8080/" + product.productImage[0]
                        }
                        return (
                            <motion.div
                                key={product?.category}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className='flex flex-col items-center gap-2 shrink-0'
                            >
                                <Link
                                    to={`/product-category?category=${product?.category}`}
                                    className='group relative block'
                                >
                                    <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-2 bg-white shadow-md hover:shadow-lg transition-all duration-300'>
                                        <img
                                            src={imgSrc}
                                            alt={product?.category}
                                            className='w-full h-full object-contain transition-transform duration-300 group-hover:scale-110'
                                            onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMAGE }}
                                        />
                                    </div>
                                </Link>
                                <p className='text-center text-sm md:text-base text-gray-600 font-medium capitalize'>
                                    {product?.category}
                                </p>
                            </motion.div>
                        )
                    })
                )}
            </div>
        </div>
    )
}

export default CategoryList
