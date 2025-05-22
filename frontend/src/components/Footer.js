import React from 'react'
import { FaYoutube, FaGithub, FaEnvelope } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="bg-slate-200 mt-16">
      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between items-center gap-6">
        {/* Brand and tagline */}
        <div className="text-center md:text-left">
          <p className="text-2xl font-bold text-blue-700">Ecommerce</p>
          <p className="text-sm text-slate-600 mt-1">Your one-stop shop for everything!</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center gap-2">
          <a href="/" className="text-slate-700 hover:text-blue-600 transition">Home</a>
          
        </div>

        {/* Social and contact */}
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-3 mb-1">
            <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" title="YouTube" className="text-red-600 hover:text-red-700 text-xl">
              <FaYoutube />
            </a>
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" title="GitHub" className="text-slate-700 hover:text-black text-xl">
              <FaGithub />
            </a>
            <a href="mailto:support@ecommerce.com" title="Email" className="text-blue-600 hover:text-blue-700 text-xl">
              <FaEnvelope />
            </a>
          </div>
          <p className="text-xs text-slate-500">support@ecommerce.com</p>
        </div>
      </div>
      <div className="border-t border-slate-300 py-2">
        <p className="text-center text-xs text-slate-500">
          &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
