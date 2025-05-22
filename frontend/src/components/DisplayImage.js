import React from 'react'
import { CgClose } from 'react-icons/cg'

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="relative bg-white shadow-2xl rounded-2xl max-w-5xl w-full mx-4 p-4 flex flex-col items-end">
        <button
          className="text-2xl text-gray-500 hover:text-red-600 transition-colors absolute top-4 right-4 z-10"
          onClick={onClose}
          aria-label="Close"
        >
          <CgClose />
        </button>
        <div className="flex justify-center items-center w-full h-full max-h-[80vh]">
          <img
            src={imgUrl.startsWith("http") ? imgUrl : "http://localhost:8080/" + imgUrl}
            alt="Product"
            className="max-h-[70vh] max-w-full object-contain rounded-lg shadow"
          />
        </div>
      </div>
    </div>
  )
}

export default DisplayImage
