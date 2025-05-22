import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io"
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import { motion } from 'framer-motion'

const ChangeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    callFunc,
}) => {
    const [userRole, setUserRole] = useState(role)
    const [isLoading, setIsLoading] = useState(false)

    const handleOnChangeSelect = (e) => {
        setUserRole(e.target.value)
    }

    const updateUserRole = async () => {
        setIsLoading(true)
        try {
            const fetchResponse = await fetch(SummaryApi.updateUser.url, {
                method: SummaryApi.updateUser.method,
                credentials: 'include',
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    userId: userId,
                    role: userRole
                })
            })

            const responseData = await fetchResponse.json()

            if (responseData.success) {
                toast.success(responseData.message)
                onClose()
                callFunc()
            } else {
                toast.error(responseData.message)
            }
        } catch (error) {
            toast.error("Failed to update role")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
            <motion.div 
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-xl shadow-lg w-full max-w-md relative"
            >
                <button 
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Close"
                >
                    <IoMdClose className="text-2xl text-gray-600" />
                </button>

                <div className="p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Update User Role</h2>
                    
                    <div className="space-y-4 mb-6">
                        <div>
                            <p className="text-sm text-gray-600">Name</p>
                            <p className="font-medium text-gray-900">{name}</p>
                        </div>
                        
                        <div>
                            <p className="text-sm text-gray-600">Email</p>
                            <p className="font-medium text-gray-900 break-all">{email}</p>
                        </div>
                        
                        <div>
                            <label className="text-sm text-gray-600 block mb-2">Role</label>
                            <select 
                                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                value={userRole} 
                                onChange={handleOnChangeSelect}
                            >
                                {Object.values(ROLE).map(el => (
                                    <option value={el} key={el} className="capitalize">
                                        {el}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button 
                        onClick={updateUserRole}
                        disabled={isLoading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isLoading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        ) : (
                            "Update Role"
                        )}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default ChangeUserRole
