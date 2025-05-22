import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import ROLE from '../common/role';
import { motion } from 'framer-motion';

const navLinks = [
  { to: "all-users", label: "All Users" },
  { to: "all-products", label: "All Products" },
];

const AdminPanel = () => {
  const user = useSelector(state => state?.user?.user)
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] md:flex hidden bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <motion.aside
        className="bg-white min-h-full w-full max-w-64 shadow-xl rounded-r-3xl flex flex-col items-center py-8"
        initial={{ x: -40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
      >
        {/* Profile Section */}
        <motion.div
          className="flex flex-col items-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="text-6xl mb-2 relative">
            {user?.profilePic ? (
              <img src={user.profilePic} className="w-24 h-24 rounded-full shadow-md object-cover" alt={user?.name} />
            ) : (
              <FaRegCircleUser className="text-slate-400" />
            )}
          </div>
          <p className="capitalize text-lg font-semibold text-slate-800">{user?.name}</p>
          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mt-1 uppercase tracking-wide">{user?.role}</span>
        </motion.div>

        {/* Navigation */}
        <nav className="w-full flex flex-col gap-2 px-6">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg transition-all duration-200 text-slate-700 font-medium ${
                location.pathname.includes(link.to)
                  ? "bg-blue-50 text-blue-700 shadow"
                  : "hover:bg-slate-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </motion.aside>

      {/* Main Content */}
      <motion.main
        className="w-full h-full p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Outlet />
      </motion.main>
    </div>
  );
};

export default AdminPanel;
