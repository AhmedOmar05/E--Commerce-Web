import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import brandName from '../helpers/brandName';

const UploadProduct = ({ onClose, fetchData }) => {
  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUploadProduct = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData((prev) => ({
        ...prev,
        productImage: [...prev.productImage, file],
      }));
    }
  };

  const handleDeleteProductImage = (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1);
    setData((prev) => ({
      ...prev,
      productImage: newProductImage
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (data.productImage.length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }

    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("brandName", data.brandName);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("sellingPrice", data.sellingPrice);

    data.productImage.forEach((image) => {
      formData.append("productImages", image);
    });

    try {
      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: "include",
        body: formData
      });

      const responseData = await response.json();

      if (responseData.success) {
        toast.success(responseData?.message);
        onClose();
        fetchData();
      } else {
        toast.error(responseData?.message || "Upload failed");
      }
    } catch (error) {
      toast.error("Error uploading product");
      console.error("Upload error:", error);
    }
  };

  return (
    <div className='fixed inset-0 z-50 bg-slate-200 bg-opacity-35 flex justify-center items-center'>
      <div className='bg-white p-6 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl relative'>
        <div className='flex justify-between items-center pb-3 border-b'>
          <h2 className='font-bold text-xl'>Upload Product</h2>
          <button
            className='text-2xl hover:text-red-600 transition-colors'
            onClick={onClose}
            aria-label="Close"
          >
            <CgClose />
          </button>
        </div>

        <form className='grid gap-4 mt-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor='productName' className='block mb-1 font-medium'>Product Name</label>
            <input
              type='text'
              id='productName'
              placeholder='Enter product name'
              name='productName'
              value={data.productName}
              onChange={handleOnChange}
              className='w-full p-2 bg-slate-100 border rounded'
              required
            />
          </div>

          <div>
            <label htmlFor='brandName' className='block mb-1 font-medium'>Brand Name</label>
            <select
              required
              value={data.brandName}
              name='brandName'
              onChange={handleOnChange}
              className='w-full p-2 bg-slate-100 border rounded'
            >
              <option value={""}>Select Brand</option>
              {brandName.map((el, index) => (
                <option value={el.value} key={el.value + index}>{el.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='category' className='block mb-1 font-medium'>Category</label>
            <select
              required
              value={data.category}
              name='category'
              onChange={handleOnChange}
              className='w-full p-2 bg-slate-100 border rounded'
            >
              <option value={""}>Select Category</option>
              {productCategory.map((el, index) => (
                <option value={el.value} key={el.value + index}>{el.label}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor='productImage' className='block mb-1 font-medium'>Product Images</label>
            <label htmlFor='uploadImageInput' className='block cursor-pointer'>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center hover:bg-slate-200 transition'>
                <div className='text-slate-500 flex flex-col items-center gap-2'>
                  <span className='text-4xl'><FaCloudUploadAlt /></span>
                  <p className='text-sm'>Upload Product Image</p>
                  <input
                    type='file'
                    id='uploadImageInput'
                    className='hidden'
                    onChange={handleUploadProduct}
                    accept="image/*"
                  />
                </div>
              </div>
            </label>
            <div className='flex flex-wrap gap-3 mt-2'>
              {data.productImage.length > 0 ? (
                data.productImage.map((el, index) => (
                  <div className='relative group' key={index}>
                    <img
                      src={URL.createObjectURL(el)}
                      alt={el.name}
                      width={80}
                      height={80}
                      className='bg-slate-100 border rounded cursor-pointer'
                    />
                    <button
                      type="button"
                      className='absolute -top-2 -right-2 p-1 text-white bg-red-600 rounded-full opacity-80 hover:opacity-100 transition hidden group-hover:block'
                      onClick={() => handleDeleteProductImage(index)}
                      aria-label="Delete"
                    >
                      <MdDelete />
                    </button>
                  </div>
                ))
              ) : (
                <p className='text-red-600 text-xs'>*Please upload at least one product image</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor='price' className='block mb-1 font-medium'>Price</label>
            <input
              type='number'
              id='price'
              placeholder='Enter price'
              value={data.price}
              name='price'
              onChange={handleOnChange}
              className='w-full p-2 bg-slate-100 border rounded'
              required
            />
          </div>

          <div>
            <label htmlFor='sellingPrice' className='block mb-1 font-medium'>Selling Price</label>
            <input
              type='number'
              id='sellingPrice'
              placeholder='Enter selling price'
              value={data.sellingPrice}
              name='sellingPrice'
              onChange={handleOnChange}
              className='w-full p-2 bg-slate-100 border rounded'
              required
            />
          </div>

          <div>
            <label htmlFor='description' className='block mb-1 font-medium'>Description</label>
            <textarea
              className='w-full h-28 bg-slate-100 border resize-none p-2 rounded'
              placeholder='Enter product description'
              rows={3}
              onChange={handleOnChange}
              name='description'
              value={data.description}
              required
            />
          </div>

          <button
            className='w-full px-3 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition mt-2'
            type="submit"
          >
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadProduct;
