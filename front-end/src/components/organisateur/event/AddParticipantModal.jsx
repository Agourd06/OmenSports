import React, { useState, useContext } from 'react';
import { fetchData } from '../../../fetcher/FetchData';
import AuthContext from '../../../contexts/AuthContext';
import { AlertContext } from '../../../App';

const AddParticipantModal = ({ eventId, onClose, setSelectedEvent, setEvents }) => {
  const { token } = useContext(AuthContext);
  const Alert = useContext(AlertContext)
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    adress: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await fetchData(`users/${eventId}`, 'POST', token, formData);

      setSelectedEvent((prev) => ({
        ...prev,
        users: [...prev.users, newUser]
      }));

      setEvents((prev) =>
        prev.map((event) =>
          event._id === eventId ? { ...event, users: [...event.users, newUser] } : event
        )
      );
      Alert('success' , 'Participant added successfully')
      onClose();
    } catch (error) {
      console.error('Failed to add participant:', error);
      Alert('error', error.message || 'Failed to add participant')
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-[#EEBB07] mb-4">Add New Participant</h2>
        <form >
          <div className="mb-4">
            <label className="block text-gray-600">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Adress</label>
            <input
              type="text"
              name="adress"
              value={formData.adress}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-[#EEBB07] hover:bg-[#FFD700] text-black font-semibold py-2 rounded-md"
          >
            Add Participant
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddParticipantModal;
