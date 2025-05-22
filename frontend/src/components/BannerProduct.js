import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const BannerProduct = () => {
  const [currentImage, setCurrentImage] = useState(0)

  const desktopImages = [
    image1,
    image2,
    image3,
    image4,
    image5
  ]

  const mobileImages = [
    image1Mobile,
    image2Mobile,
    image3Mobile,
    image4Mobile,
    image5Mobile
  ]

  const images = window.innerWidth < 768 ? mobileImages : desktopImages

  const nextImage = () => {
    setCurrentImage(prev => (prev + 1) % images.length)
  }

  const preveImage = () => {
    setCurrentImage(prev => (prev === 0 ? images.length - 1 : prev - 1))
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage()
    }, 5000)
    return () => clearInterval(interval)
    // eslint-disable-next-line
  }, [currentImage])

  // For responsive images on window resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentImage(0)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="container mx-auto px-4 rounded">
      <div className="h-56 md:h-72 w-full bg-slate-200 relative rounded-2xl overflow-hidden shadow-lg">
        {/* Navigation Arrows */}
        <div className="absolute z-10 h-full w-full flex items-center justify-between px-4 pointer-events-none">
          <button
            onClick={preveImage}
            className="bg-white shadow-md rounded-full p-2 text-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition pointer-events-auto"
            aria-label="Previous Slide"
          >
            <FaAngleLeft />
          </button>
          <button
            onClick={nextImage}
            className="bg-white shadow-md rounded-full p-2 text-2xl text-blue-600 hover:bg-blue-600 hover:text-white transition pointer-events-auto"
            aria-label="Next Slide"
          >
            <FaAngleRight />
          </button>
        </div>

        {/* Banner Images */}
        <div className="flex h-full w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentImage * 100}%)` }}>
          {images.map((imageURL, index) => (
            <div
              className="w-full h-full min-w-full min-h-full"
              key={imageURL}
            >
              <img
                src={imageURL}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex gap-2 z-20">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentImage(idx)}
              className={`w-3 h-3 rounded-full border-2 border-white bg-white transition-all duration-200 ${currentImage === idx ? 'bg-blue-600 border-blue-600 scale-125' : 'opacity-60'}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default BannerProduct
