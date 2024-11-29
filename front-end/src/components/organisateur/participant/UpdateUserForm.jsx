import React, { useState, useContext } from 'react';
import { fetchData } from '../../../fetcher/FetchData';
import { AlertContext } from '../../../App';
import AuthContext from '../../../contexts/AuthContext';

export default function UpdateUserForm({ user, setUsers, onClose }) {
    const [formData, setFormData] = useState({
        username: user.username || '',
        email: user.email || '',
        phone: user.phone || '',
        adress: user.adress || '',
    });
    const Alert = useContext(AlertContext);
    const { token } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await fetchData(`users/${user._id}`, 'PUT', token, formData);
            setUsers((prevUsers) =>
                prevUsers.map((u) => (u._id === user._id ? updatedUser : u))
            );
            Alert('success', 'User updated successfully');
            onClose();
        } catch (error) {
            Alert('error', error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white rounded-lg p-6 w-1/3"
            >
                <h2 className="text-2xl font-bold mb-4">Update User</h2>
                <div className="mb-4">
                    <label className="block mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Adress</label>
                    <input
                        type="text"
                        name="adress"
                        value={formData.adress}
                        onChange={handleChange}
                        
                        className="w-full border border-gray-300 p-2 rounded"
                    />
                </div>
                <div className="flex justify-end">
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-300 text-gray-800 py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
}
