import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import coinTab from '../assests/cointab_logo.png';
import { UtilityContext } from '../Context/UtilityProvider';
const Header = () => {
    //Get Logged Out user from context
    const { loggedInUser } = useContext(UtilityContext)
    //Get Navigate hook from react router
    const navigate = useNavigate()
    //Functionality to log out user
    const handleLogout = () => {
        localStorage.removeItem('userData')
        toast.success('You are logged out...')
        navigate('/')
    }
    return (
        <div className='bg-gray-100 border border-gray-200'>
            <div className='w-10/12 mx-auto py-2 flex justify-between items-center'>
                <Link to='/'><img src={coinTab} alt='Cointab' /></Link>
                <div className='flex gap-3 font-semibold'>
                    <NavLink to='/about'>About Us</NavLink>
                    {
                        loggedInUser ? <button onClick={handleLogout}>Logout</button>: <NavLink to='/'>Login</NavLink>
                    }
                </div>
            </div>
        </div>
    );
};

export default Header;