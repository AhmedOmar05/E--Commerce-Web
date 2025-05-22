import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify'

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
}) => {
    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)
        setData(prev => ({
            ...prev,
            productImage: [...prev.productImage, uploadImageCloudinary.url]
        }))
    }

    const handleDeleteProductImage = (index) => {
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1)
        setData(prev => ({
            ...prev,
            productImage: [...newProductImage]
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
        const responseData = await response.json()
        if (responseData.success) {
            toast.success(responseData?.message)
            onClose()
            fetchdata()
        }
        if (responseData.error) {
            toast.error(responseData?.message)
        }
    }

    return (
        <div className="fixed inset-0 z-50 bg-slate-200 bg-opacity-60 flex justify-center items-center">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center border-b pb-3 mb-4">
                    <h2 className="font-bold text-xl">Edit Product</h2>
                    <button
                        className="text-2xl text-slate-500 hover:text-red-600 transition"
                        onClick={onClose}
                        aria-label="Close"
                    >
                        <CgClose />
                    </button>
                </div>

                {/* Form */}
                <form className="grid gap-4" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="productName" className="block mb-1 font-medium">Product Name</label>
                        <input
                            type="text"
                            id="productName"
                            name="productName"
                            value={data.productName}
                            onChange={handleOnChange}
                            placeholder="Enter product name"
                            className="w-full p-2 bg-slate-100 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="brandName" className="block mb-1 font-medium">Brand Name</label>
                        <input
                            type="text"
                            id="brandName"
                            name="brandName"
                            value={data.brandName}
                            onChange={handleOnChange}
                            placeholder="Enter brand name"
                            className="w-full p-2 bg-slate-100 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="category" className="block mb-1 font-medium">Category</label>
                        <select
                            required
                            value={data.category}
                            name="category"
                            onChange={handleOnChange}
                            className="w-full p-2 bg-slate-100 border rounded"
                        >
                            <option value="">Select Category</option>
                            {productCategory.map((el, index) => (
                                <option value={el.value} key={el.value + index}>{el.label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block mb-1 font-medium">Product Images</label>
                        <label htmlFor="uploadImageInput" className="block cursor-pointer">
                            <div className="p-2 bg-slate-100 border rounded h-32 flex justify-center items-center hover:bg-slate-200 transition">
                                <div className="text-slate-500 flex flex-col items-center gap-2">
                                    <span className="text-4xl"><FaCloudUploadAlt /></span>
                                    <p className="text-sm">Upload Product Image</p>
                                    <input type="file" id="uploadImageInput" className="hidden" onChange={handleUploadProduct} />
                                </div>
                            </div>
                        </label>
                        <div className="flex flex-wrap gap-3 mt-2">
                            {data?.productImage.length > 0 ? (
                                data.productImage.map((el, index) => (
                                    <div className="relative group" key={el + index}>
                                        <img
                                            src={"http://localhost:8080/" + el}
                                            alt={el}
                                            width={80}
                                            height={80}
                                            className="bg-slate-100 border rounded cursor-pointer"
                                            onClick={() => {
                                                setOpenFullScreenImage(true)
                                                setFullScreenImage(el)
                                            }}
                                        />
                                        <button
                                            type="button"
                                            className="absolute -top-2 -right-2 p-1 text-white bg-red-600 rounded-full opacity-80 hover:opacity-100 transition hidden group-hover:block"
                                            onClick={() => handleDeleteProductImage(index)}
                                            aria-label="Delete"
                                        >
                                            <MdDelete />
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="text-red-600 text-xs">*Please upload product image</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-1 font-medium">Price</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={data.price}
                            onChange={handleOnChange}
                            placeholder="Enter price"
                            className="w-full p-2 bg-slate-100 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="sellingPrice" className="block mb-1 font-medium">Selling Price</label>
                        <input
                            type="number"
                            id="sellingPrice"
                            name="sellingPrice"
                            value={data.sellingPrice}
                            onChange={handleOnChange}
                            placeholder="Enter selling price"
                            className="w-full p-2 bg-slate-100 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block mb-1 font-medium">Description</label>
                        <textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleOnChange}
                            placeholder="Enter product description"
                            rows={4}
                            className="w-full bg-slate-100 border rounded p-2 resize-none"
                        />
                    </div>
                    <button
                        className="w-full px-3 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition mb-2 mt-4"
                        type="submit"
                    >
                        Update Product
                    </button>
                </form>

                {/* Fullscreen image modal */}
                {openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={"http://localhost:8080/" + fullScreenImage} />
                )}
            </div>
        </div>
    )
}

export default AdminEditProduct
