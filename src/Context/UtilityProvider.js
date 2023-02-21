import { useQuery } from '@tanstack/react-query';
import React, { createContext, useEffect, useState } from 'react';

export const UtilityContext = createContext()
const UtilityProvider = ({ children }) => {
    //Set Loading State
    const [loading, setLoading] = useState(false)
    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/users');
            const data = await res.json()
            return data.data;
        }
    })
    //Set LoggedIn userData to the state
    const [loggedInUser, setLoggedInUser] = useState()
    //Get the logged in user data from localstorage
    // So that unauthoried/without login no one case access the user management page.
    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('userData'))
        //Set data to loggedIn User
        setLoggedInUser(userData)
    }, [])
    const utilityData = { loading, setLoading, users , loggedInUser, refetch, isLoading}
    return (
        <div>
            <UtilityContext.Provider value={utilityData}>
                {children}
            </UtilityContext.Provider>
        </div>
    );
};

export default UtilityProvider;