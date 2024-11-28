import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../fetcher/FetchData';
import Input from '../components/inputs/Input';
import { validateField } from '../validation/AuthValidation';

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
        <div className='border bg-black shadow-[#EEBB07] rounded-lg p-6 max-w-md shadow-md border-[#EEBB07] max-md:mx-auto'>
            <form >
                <div className='w-full flex justify-center'>
                    <img src='/logo.png' className='w-40 h-40' />
                </div>
                <h3 className="text-white text-3xl font-extrabold mb-8">
                    Sign in
                </h3>

                {error && <p className='text-red-600'>{error}</p>}
                <Input type='text' name='email' placeholder='Email' onChange={handleChange} />
                <Input type='password' name='password' placeholder='Password' onChange={handleChange} />
                <div className='pt-1'>
                    <button type='button' onClick={() => { setForm('forgot') }}
                        className="text-[#EEBB07] font-semibold hover:underline ml-1 whitespace-nowrap">Forget Password ?</button>
                </div>
                <div className="text-center">
                    <p className="text-sm mt-4 text-white">Don't have an account ? <button type='button' onClick={() => { setForm('register') }}
                        className="text-[#EEBB07] font-semibold hover:underline ml-1 whitespace-nowrap">Register here</button></p>
                </div>
                <div className='flex justify-center mt-3'>
                    <button onClick={handleSubmit}
                        className="h-fit text-white w-fit px-[1em] py-[0.25em] hover:text-[#EEBB07] border-[1px] border-gray-700 rounded-full flex justify-center items-center gap-[0.5em] overflow-hidden group hover:translate-y-[0.125em] duration-300 backdrop-blur-[12px]"
                    >
                        <p className='duration-300'>Login</p>
                        <i className='bx bxs-log-in-circle  group-hover:translate-x-[10%] duration-300' ></i>
                    </button>
                </div>
            </form>
        </div>
    );
}
