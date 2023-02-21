import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { AiFillEdit } from 'react-icons/ai';
import { FiDelete } from 'react-icons/fi';
import { UtilityContext } from '../Context/UtilityProvider';
const DisplayUsersDetails = ({ user }) => {
    const {refetch} = useContext(UtilityContext)
    const { id, name, email, password } = user;
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
                    <p>{password}</p>
                </td>
                <td className="p-3 flex justify-center gap-2">
                    <FiDelete onClick={() => handleDeleteUser(id)} title='Delete' className='w-6 h-6 hover:text-primary cursor-pointer' />
                    <AiFillEdit title='Edit' className='w-6 h-6 hover:text-primary cursor-pointer' />
                </td>
            </tr>
        </tbody>
    );
};

export default DisplayUsersDetails;