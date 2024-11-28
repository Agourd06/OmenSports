import React, { createContext, useState, useEffect, useContext } from 'react';
import { AlertContext } from '../App';
// import { fetchData } from '../components/fetchers/Fetch';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState('');
    const [client, setClient] = useState({});
    const alert = useContext(AlertContext)
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            setToken(token)
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    // useEffect(() => {
    //     const fetchClient = async () => {
    //         try {
    //             const response = await fetchData(`public/user`, 'GET', token);
    //             setClient(response.data);
    //         } catch (err) {
    //             alert('info', err.message);
    //         }
    //     };
    //     if (token) {

    //         fetchClient();
    //     }
    // }, [token]);

    const logout = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, logout, token  }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
