import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'
import { motion, AnimatePresence } from 'framer-motion'

const CategoryProduct = () => {
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll("category")

  const urlCategoryListObject = {}
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true
  })

  const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
  const [filterCategoryList, setFilterCategoryList] = useState([])
  const [sortBy, setSortBy] = useState("")

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.filterProduct.url, {
      method: SummaryApi.filterProduct.method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ category: filterCategoryList })
    })
    const dataResponse = await response.json()
    setData(dataResponse?.data || [])
    setLoading(false)
  }

  const handleSelectCategory = (e) => {
    const { value, checked } = e.target
    setSelectCategory((prev) => ({
      ...prev,
      [value]: checked
    }))
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line
  }, [filterCategoryList])

  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).filter(
      (categoryKeyName) => selectCategory[categoryKeyName]
    )
    setFilterCategoryList(arrayOfCategory)
    // Format for url change when change on the checkbox
    const urlFormat = arrayOfCategory.map((el, index) =>
      `category=${el}${index !== arrayOfCategory.length - 1 ? "&&" : ""}`
    )
    navigate("/product-category?" + urlFormat.join(""))
    // eslint-disable-next-line
  }, [selectCategory])

  const handleOnChangeSortBy = (e) => {
    const { value } = e.target
    setSortBy(value)
    if (value === 'asc') {
      setData(prev => [...prev].sort((a, b) => a.sellingPrice - b.sellingPrice))
    }
    if (value === 'dsc') {
      setData(prev => [...prev].sort((a, b) => b.sellingPrice - a.sellingPrice))
    }
  }

  return (
    <div className="bg-slate-50 min-h-[calc(100vh-120px)] py-8 px-2 md:px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-8">
        {/* Sidebar */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 sticky top-28 h-fit"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Sort By */}
          <div className="mb-8">
            <h3 className="text-base uppercase font-semibold text-slate-500 border-b pb-2 border-slate-200 mb-4">
              Sort By
            </h3>
            <form className="flex flex-col gap-3 text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'asc'}
                  onChange={handleOnChangeSortBy}
                  value="asc"
                  className="accent-blue-600"
                />
                Price - Low to High
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="sortBy"
                  checked={sortBy === 'dsc'}
                  onChange={handleOnChangeSortBy}
                  value="dsc"
                  className="accent-blue-600"
                />
                Price - High to Low
              </label>
            </form>
          </div>
          {/* Filter By */}
          <div>
            <h3 className="text-base uppercase font-semibold text-slate-500 border-b pb-2 border-slate-200 mb-4">
              Category
            </h3>
            <form className="flex flex-col gap-3 text-sm">
              {productCategory.map((categoryName, index) => (
                <label key={categoryName.value} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="category"
                    checked={selectCategory[categoryName.value]}
                    value={categoryName.value}
                    id={categoryName.value}
                    onChange={handleSelectCategory}
                    className="accent-blue-600"
                  />
                  {categoryName.label}
                </label>
              ))}
            </form>
          </div>
        </motion.div>
        {/* Products */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-medium text-slate-800 text-lg">
              Search Results: <span className="font-bold">{data.length}</span>
            </p>
            {loading && (
              <span className="text-blue-500 text-sm animate-pulse">Loading...</span>
            )}
          </div>
          <div className="min-h-[calc(100vh-120px)] max-h-[calc(100vh-120px)] overflow-y-auto pr-2">
            <AnimatePresence>
              {data.length !== 0 && !loading ? (
                <VerticalCard data={data} loading={loading} />
              ) : !loading ? (
                <motion.div
                  className="bg-white rounded-xl shadow p-10 text-center text-gray-400 font-semibold mt-10"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  No products found.
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CategoryProduct
