import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { AiOutlineUsergroupAdd } from 'react-icons/ai';
import { TiTick } from 'react-icons/ti';
import DisplayUsersDetails from '../Components/DisplayUsersDetails';
import Loader from '../Components/Loader/Loader';
import { UtilityContext } from '../Context/UtilityProvider';

const UsersManagement = () => {
    const { users, loggedInUser, isLoading, refetch } = useContext(UtilityContext)
    //Collapse for adding user...
    const [expandForm, setExpandForm] = useState(false)
    //Functionality to add new user
    const handleAddUser = (e) => {
        e.preventDefault()
        const form = e.target;
        //Get data from the field
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password);

        //If user is already exist then don't create new user and return the function
        if (users.some(user => user.email === email)) {
            return toast.error('User Already Exists')
        }
        //If name, email and password is empty the throw error and return the function
        if (!name || !email || !password) {
            return toast.error("Name, Email or Password Can't be Empty")
        }
        // Send data to the backend/database
        fetch('http://localhost:5000/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ name, email, password })
        })
            .then(res => res.json())
            .then(data => {
                //Show the success message
                toast.success(data.message)
                //Reset the form input
                form.reset()
                //Collapse the form
                setExpandForm(false)
                //Reload/Refetch the data from database
                refetch()
            })
    }
    //Set Loading spninner while loading users data
    if (isLoading) {
        return <Loader />
    }
    return (
        <div className='cointab-bg'>
            <div className='w-11/12 md:w-10/12 mx-auto mt-2 md:pt-5 min-h-screen md:min-h-[85vh]'>
                {
                    users?.length && <h2 className='text-2xl md:text-4xl font-semibold text-primary font-Shantell md:mt-2 text-center'>Users Details</h2>
                }
                {
                    loggedInUser && <div className='w-full md:w-7/12 mx-auto md:flex justify-end'>
                        {/* Expand Add User form on Click */}
                        {
                            expandForm
                                ? <form onSubmit={handleAddUser} className='md:flex gap-2 items-center'>
                                    <div className='grid grid-cols-1 md:grid-cols-3 gap-2'>
                                        <input type='text' name='name' placeholder='Name' className='border-2 border-gray-600 rounded px-2 py-1' />
                                        <input type='email' name='email' placeholder='Email' className='border-2 border-gray-600 rounded px-2 py-1' />
                                        <input type='password' name='password' placeholder='Password' className='border-2 border-gray-600 rounded px-2 py-1' />
                                    </div>
                                    <button type='submit' className='mt-2 md:mt-0'><TiTick className='h-10 w-10 text-white bg-primary rounded cursor-pointer' /></button>
                                </form>
                                : <button onClick={() => setExpandForm(!false)} className='flex justify-center gap-2 py-2 px-3 rounded bg-primary hover:bg-secondary duration-500 ease-in-out text-white font-Shantell'><AiOutlineUsergroupAdd className='w-6 h-6' /> Add Users</button>
                        }
                    </div>
                }
                {/* If there is user data availbe then render the user data */}
                {
                    users?.length ?
                        <>
                            {/* If logged In user avaiblable then show data otherwise show warning  */}
                            {
                                users?.some(user => user.email === loggedInUser?.email && user.password === loggedInUser?.password) ?
                                    <>
                                        {/* Tables to Show users Data */}
                                        <div className="my-5 md:mt-2 text-gray-100">
                                            <div className="flex md:justify-center overflow-x-auto">
                                                <table className="text-xs">
                                                    <thead className="bg-primary">
                                                        <tr className="text-left text-base">
                                                            <th className="p-2 md:px-10 md:py-2">Name</th>
                                                            <th className="p-2 md:px-10 md:py-2">Email Address</th>
                                                            <th className="p-2 md:px-10 md:py-2">Password</th>
                                                            <th className="p-2 md:px-10 md:py-2">Actions</th>
                                                        </tr>
                                                    </thead>

                                                    {
                                                        users.map(user => <DisplayUsersDetails user={user} key={user.id} />)
                                                    }
                                                </table>
                                            </div>
                                        </div>
                                    </> :
                                    <h2 className='text-3xl md:text-4xl font-semibold text-secondary font-Shantell mt-5 text-center'>Sorry! Your are not Authorized!</h2>
                            }
                        </> :
                        <div className='flex flex-col  items-center'>
                            <h2 className='text-3xl md:text-4xl font-semibold text-secondary font-Shantell mt-5 text-center'>No Data Found!</h2>
                            <h4 className='text-xl md:text-4xl font-semibold text-primary font-Shantell mt-5 text-center'>Please Add Some Data First!</h4>
                        </div>
                }
            </div>
        </div>
    );
};

export default UsersManagement;