import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'
import { motion, AnimatePresence } from 'framer-motion'

const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchProduct = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.searchProduct.url + query.search)
    const dataResponse = await response.json()
    setLoading(false)
    setData(dataResponse.data)
  }

  useEffect(() => {
    fetchProduct()
    // eslint-disable-next-line
  }, [query])

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-120px)] py-8 px-2 md:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-2xl font-bold text-slate-800 mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Search Results: <span className="text-blue-600">{data.length}</span>
        </motion.h2>

        <AnimatePresence>
          {loading && (
            <motion.p
              className="text-lg text-center bg-white rounded-xl shadow p-8 my-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Loading ...
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!loading && data.length === 0 && (
            <motion.p
              className="bg-white text-lg text-center p-10 rounded-xl shadow text-gray-400 font-semibold my-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              No products found for your search.
            </motion.p>
          )}
        </AnimatePresence>

        {!loading && data.length > 0 && (
          <VerticalCard loading={loading} data={data} />
        )}
      </div>
    </div>
  )
}

export default SearchProduct
