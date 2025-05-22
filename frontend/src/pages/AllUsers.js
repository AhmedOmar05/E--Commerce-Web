import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';
import { motion } from 'framer-motion'

const AllUsers = () => {
    const [allUser, setAllUsers] = useState([])
    const [openUpdateRole, setOpenUpdateRole] = useState(false)
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: ""
    })

    const fetchAllUsers = async () => {
        const fetchData = await fetch(SummaryApi.allUser.url, {
            method: SummaryApi.allUser.method,
            credentials: 'include'
        })

        const dataResponse = await fetchData.json()

        if (dataResponse.success) {
            setAllUsers(dataResponse.data)
        }

        if (dataResponse.error) {
            toast.error(dataResponse.message)
        }
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    return (
        <div className='bg-white rounded-xl shadow-lg p-6'>
            <div className='overflow-x-auto'>
                <table className='w-full'>
                    <thead>
                        <tr className='bg-indigo-600 text-white'>
                            <th className='p-3 text-left rounded-tl-xl'>Sr.</th>
                            <th className='p-3 text-left'>Name</th>
                            <th className='p-3 text-left'>Email</th>
                            <th className='p-3 text-left'>Role</th>
                            <th className='p-3 text-left'>Created Date</th>
                            <th className='p-3 text-left rounded-tr-xl'>Action</th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {allUser.map((el, index) => (
                            <motion.tr
                                key={el._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                className='hover:bg-gray-50 transition-colors'
                            >
                                <td className='p-3'>{index + 1}</td>
                                <td className='p-3 font-medium text-gray-800'>{el?.name}</td>
                                <td className='p-3 text-gray-600'>{el?.email}</td>
                                <td className='p-3'>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        el?.role === 'ADMIN' 
                                            ? 'bg-purple-100 text-purple-800' 
                                            : 'bg-green-100 text-green-800'
                                    }`}>
                                        {el?.role}
                                    </span>
                                </td>
                                <td className='p-3 text-gray-500'>{moment(el?.createdAt).format('LL')}</td>
                                <td className='p-3'>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='bg-indigo-100 p-2 rounded-lg text-indigo-600 hover:bg-indigo-600 hover:text-white transition-colors'
                                        onClick={() => {
                                            setUpdateUserDetails(el)
                                            setOpenUpdateRole(true)
                                        }}
                                    >
                                        <MdModeEdit className='text-xl' />
                                    </motion.button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {openUpdateRole && (
                <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4'>
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className='bg-white rounded-xl w-full max-w-md p-6'
                    >
                        <ChangeUserRole
                            onClose={() => setOpenUpdateRole(false)}
                            name={updateUserDetails.name}
                            email={updateUserDetails.email}
                            role={updateUserDetails.role}
                            userId={updateUserDetails._id}
                            callFunc={fetchAllUsers}
                        />
                    </motion.div>
                </div>
            )}
        </div>
    )
}

export default AllUsers
