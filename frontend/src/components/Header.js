import React, { useContext, useEffect, useRef, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr"
import { FaRegCircleUser } from "react-icons/fa6"
import { FaShoppingCart } from "react-icons/fa"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice'
import ROLE from '../common/role'
import Context from '../context'

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false)
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)
  const menuRef = useRef(null)

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuDisplay(false)
      }
    }
    if (menuDisplay) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [menuDisplay])

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: 'include'
    })
    const data = await fetchData.json()
    if (data.success) {
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message)
    }
  }

  const handleSearch = (e) => {
    const { value } = e.target
    setSearch(value)
    if (value) {
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo w={90} h={50} />
        </Link>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full max-w-md border rounded-full focus-within:shadow transition pl-3 bg-slate-50 mx-8">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none bg-transparent py-2"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-blue-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        {/* User, Cart, Auth */}
        <div className="flex items-center gap-7">
          {/* User Avatar & Dropdown */}
          {user?._id && (
            <div className="relative flex justify-center" ref={menuRef}>
              <div
                className="text-3xl cursor-pointer flex justify-center items-center"
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={"http://localhost:8080/" + user?.profilePic}
                    className="w-10 h-10 rounded-full object-cover border-2 border-blue-100"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser className="text-blue-600" />
                )}
              </div>
              {menuDisplay && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-xl py-2 w-48 z-50 border">
                  <nav>
                    <p className="px-4 py-2 text-sm text-slate-500 border-b">{user?.name}</p>
                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="block px-4 py-2 hover:bg-blue-50 text-blue-700 font-medium"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin Panel
                      </Link>
                    )}
                    
                
                    
                  </nav>
                </div>
              )}
            </div>
          )}

          {/* Cart Icon */}
          {user?._id && (
            <Link to="/cart" className="text-2xl relative group">
              <FaShoppingCart />
              <div className="bg-blue-600 text-white w-5 h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3 text-xs font-bold group-hover:scale-110 transition-transform">
                {context?.cartProductCount}
              </div>
            </Link>
          )}

          {/* Login/Logout Button */}
          <div>
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700 font-medium transition"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="px-4 py-1 rounded-full text-white bg-blue-600 hover:bg-blue-700 font-medium transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
