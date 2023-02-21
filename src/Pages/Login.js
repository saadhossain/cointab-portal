import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import LoginRegister from '../assests/login-registration.png';
import Processing from '../Components/Loader/Processing';
import { UtilityContext } from '../Context/UtilityProvider';

const Login = () => {
    const { loading, setLoading, users } = useContext(UtilityContext)
    //Get usenavigate hook from react router 
    const navigate = useNavigate()
    //Set email to the state
    const [email, setEmail] = useState('')
    //Set password to the state
    const [password, setPassword] = useState('')
    // maximum number of attempts allowed
    const maxAttempts = 5;
    // 24 hours in milliseconds
    const blockTime = 24 * 60 * 60 * 1000;
    //Set the number of login attempts to the state
    const [loginAttempts, setLoginAttempts] = useState(0);
    //Set Block Messge to the state
    const [blockMsg, setBlockMsg] = useState('')
    //User Login using email and password
    const handleUserLogin = (e) => {
        //Prevent the default form behavier
        e.preventDefault()
        setLoading(true)
        // Check if the user is blocked
        const blockedUntil = localStorage.getItem(`${email}-blockedUntil`);
        if (blockedUntil && new Date(blockedUntil) > new Date()) {
            const timeLeft = (Math.round((new Date(blockedUntil) - new Date()) / 1000 / 60)/60).toFixed(2);
            toast.error(`Your account is blocked for ${timeLeft} Hours. Please try again later.`);
            setLoading(false);
            return;
        }
        //Allow user login if input email and password match with database
        if (users?.some(user => user.email === email && user.password === password)) {
            toast.success('You have successfully logged in...')
            localStorage.setItem("userData", JSON.stringify({ email, password }))
            e.target.reset()
            navigate('/usersmanagement')
        }
        else {
            setLoginAttempts(loginAttempts + 1);
            if (loginAttempts + 1 === maxAttempts) {
                // Block the user for 24 hours
                const blockedUntil = new Date(Date.now() + blockTime);
                localStorage.setItem(`${email}-blockedUntil`, blockedUntil.toISOString());
                setBlockMsg('You have reached the maximum number of attempts. Your account will be blocked for 24 hours.')
            } else {
                toast.error('Email or Password Invalid')
            }
            setLoading(false)
        }
    }
    return (
        <div className='flex flex-col-reverse md:flex-row justify-center items-center my-8 gap-10'>
            <img src={LoginRegister} alt='Login Register Background' className='w-full md:w-2/4' />
            <div className="w-11/12 md:w-2/4 mx-auto flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-[#20154F] text-white font-poppins">
                <h1 className="my-3 text-3xl font-bold text-center font-Shantell">Please Login</h1>
                <form onSubmit={handleUserLogin} className="space-y-4 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="admin@frejun.com" className="w-full px-3 py-2 border rounded-md border-gray-700 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm">Password</label>
                            <input onChange={(e) => setPassword(e.target.value)} type="password" value={password} placeholder="12345678" className="w-full px-3 py-2 border rounded-md border-gray-700 text-gray-800" />
                        </div>
                        <p className='text-red-500'>{blockMsg}</p>
                    </div>
                    <div className="space-y-2">
                        <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md ${!email || !password ? 'bg-[#7CD194]' : 'bg-primary hover:bg-secondary '} duration-500 ease-in-out text-white`} disabled={!email || !password}>{loading ? <Processing /> : 'Sign in'}</button>
                        <p className="px-6 text-sm text-center flex gap-2">Don't have an account yet?
                            <Link to='/register' className='font-semibold text-actionbtn'>Register Now</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;