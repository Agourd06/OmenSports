import React from 'react';

export const validateField = (name, value, setError) => {
    let hasError = false; 

    if (name === 'email') {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value)) {
            setError('Please enter a valid email adress.');
            hasError = true; 
            return hasError; 
        }
    } 
    
    if (name === 'password') {
        if (value.length < 6) {
            setError('Password must be at least 6 characters long.');
            hasError = true; 
            return hasError; 
        } 
    }
    
    return hasError; 
};

