import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'
import { motion } from 'framer-motion'
import { FiPlusCircle } from 'react-icons/fi'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
    const dataResponse = await response.json()
    setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProduct()
  }, [])

  return (
    <div className='p-4'>
      {/* Header Section */}
      <motion.div 
        className='bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center'
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className='text-2xl font-bold text-gray-800'>Product Management</h2>
        <button 
          className='bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200'
          onClick={() => setOpenUploadProduct(true)}
        >
          <FiPlusCircle className='text-xl' />
          Add New Product
        </button>
      </motion.div>

      {/* Product Grid */}
      <motion.div 
        className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {allProduct.map((product, index) => (
          <AdminProductCard 
            data={product} 
            key={product._id}
            fetchdata={fetchAllProduct}
            index={index}
          />
        ))}
      </motion.div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className='bg-white rounded-xl w-full max-w-2xl p-6'
          >
            <UploadProduct 
              onClose={() => setOpenUploadProduct(false)} 
              fetchData={fetchAllProduct}
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}

export default AllProducts
