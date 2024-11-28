import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../fetcher/FetchData';
import { validateField } from '../validation/AuthValidation';
import Input from '../components/inputs/inputs';

export default function Auth() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const emailError = validateField('email', formData.email, setError);
        const passwordError = validateField('password', formData.password, setError);

        if (emailError || passwordError) {
            return;
        }

        try {
            const data = await fetchData(
                'auth/login', 
                'POST', 
                null, 
                { email: formData.email, password: formData.password }
            );
            const { token } = data;
            localStorage.setItem('token', token);

            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            
            const userRole = decodedToken.role;
          if(userRole === 'admin'){
            navigate('/admin')
          }else{
            navigate('/no')
          }

        } catch (error) {
            setError('Invalid email or password');
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-800 via-gray-900 to-black p-4">
        <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-sm w-full border border-gray-700">
            <form>
                <div className="w-full flex justify-center mb-6">
                        <h1 className='text-2xl text-white font-mono'>OmenSports</h1>
                </div>
                <h3 className="text-white text-2xl font-bold text-center mb-6">Sign In</h3>
                
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
    
                <div className="space-y-4">
                    <Input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                </div>

                <div className="text-right mt-2">
                    <button
                        type="button"
                        onClick={() => setForm('forgot')}
                        className="text-yellow-500 text-sm hover:underline">
                        Forgot Password?
                    </button>
                </div>
    
                <button
                    onClick={handleSubmit}
                    className="w-full mt-6 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600 transition-all duration-300"
                >
                    Login
                </button>
    
                <div className="text-center mt-4">
                    <p className="text-sm text-gray-400">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            onClick={() => setForm('register')}
                            className="text-yellow-500 font-semibold hover:underline"
                        >
                            Register here
                        </button>
                    </p>
                </div>
            </form>
        </div>
    </div>
    
    );
}
