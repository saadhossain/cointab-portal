import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';
import { UtilityContext } from '../Context/UtilityProvider';
import Processing from './Loader/Processing';

const EditUser = () => {
    const { loading, setLoading } = useContext(UtilityContext)
    const { id, name, email, password } = useLoaderData().data[0]
    const handleUpdateUser = (e) => {
        e.preventDefault()
        setLoading(true)
        const form = e.target;
        const name = form.name.value;
        const password = form.password.value;
        if (name && password) {
            fetch(`http://localhost:5000/edituser/${id}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ name, password })
            })
                .then(res => res.json())
                .then(data => {
                    toast.success(data.message)
                    setLoading(false)
                })
                .catch(err => console.error(err))
        }
        else {
            toast.error('Email or Password is Missing')
            setLoading(false)
        }
    }
    return (
        <div className='flex flex-col-reverse md:flex-row justify-center items-center my-8 gap-10'>
            <div className="w-11/12 md:w-2/4 mx-auto flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-800 text-white font-poppins">
                <h1 className="my-3 text-3xl font-bold text-center font-Shantell">Update User</h1>
                <form onSubmit={handleUpdateUser} className="space-y-4 ng-untouched ng-pristine ng-valid">
                    <div className="space-y-2">
                        <div>
                            <label htmlFor="name" className="block mb-2 text-sm">Name</label>
                            <input type="text" name='name' placeholder={name} className="w-full px-3 py-2 border rounded-md border-gray-700 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">Email address</label>
                            <input type="email" placeholder={email} readOnly className="w-full px-3 py-2 border rounded-md border-gray-700 text-gray-800" />
                        </div>
                        <div>
                            <label htmlFor="password" className="text-sm">Password</label>
                            <input type="password" name='password' placeholder={password} className="w-full px-3 py-2 border rounded-md border-gray-700 text-gray-800" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <button type="submit" className={`w-full px-8 py-3 font-semibold rounded-md ${!email ? 'bg-[#7CD194]' : 'bg-primary hover:bg-secondary '} duration-500 ease-in-out text-white`} disabled={!email}>{loading ? <Processing /> : 'Update'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;