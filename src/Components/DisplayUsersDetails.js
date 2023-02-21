import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillEdit } from 'react-icons/ai';
import { BiHide, BiShow } from 'react-icons/bi';
import { FiDelete } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { UtilityContext } from '../Context/UtilityProvider';

const DisplayUsersDetails = ({ user }) => {
    //Get refetch from utility context
    const { refetch } = useContext(UtilityContext)
    //Destructure value from from user object
    const { id, name, email, password } = user;
    //Set show password toogle to the state
    const [showPassword, setShowPassword] = useState(true)
    //Functionality to delete a specific user
    const handleDeleteUser = (id) => {
        const confirmation = window.confirm('Are you sure to delete?')
        if (confirmation) {
            fetch(`http://localhost:5000/deleteuser/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    toast.error(data.message)
                    refetch()
                })
                .catch(err => toast.error(err.message))
        }
    }
    return (
        <tbody>
            <tr className="border-b border-opacity-20 border-gray-700 bg-gray-800 text-center">
                <td className="p-3">
                    <p>{name}</p>
                </td>
                <td className="p-3">
                    <p>{email}</p>
                </td>
                <td className="p-3">
                    <div className='flex gap-2'>
                        <input type={showPassword ? 'password': 'text'} value={password} className='text-white bg-transparent w-24 text-center' />
                        <div onClick={()=> setShowPassword(!showPassword)}>
                            {
                                showPassword ? <BiShow className='text-white w-6 h-6 cursor-pointer' /> : <BiHide className='text-white w-6 h-6 cursor-pointer' />
                            }
                        </div>
                    </div>
                </td>
                <td className="p-3 flex justify-center gap-2">
                    <FiDelete onClick={() => handleDeleteUser(id)} title='Delete' className='w-6 h-6 hover:text-primary cursor-pointer' />
                    <Link to={`/edituser/${id}`}><AiFillEdit title='Edit' className='w-6 h-6 hover:text-primary cursor-pointer' /></Link>
                </td>
            </tr>
        </tbody>
    );
};

export default DisplayUsersDetails;