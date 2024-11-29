import React, { useContext, useState } from 'react';
import { fetchData } from '../../../fetcher/FetchData';
import AuthContext from '../../../contexts/AuthContext';
import { AlertContext } from '../../../App';

const AddEventPopup = ({ onClose , setEvents }) => {
    const [eventData, setEventData] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const { token } = useContext(AuthContext);
    const Alert = useContext(AlertContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData({ ...eventData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) {
            Alert('error', 'Authentication token is missing!');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetchData('events', 'POST', token, eventData);
            console.log(response);
            
            setEvents(prev => [response , ...prev])
            Alert('success', 'Event added successfully!');
            onClose(); 
        } catch (error) {
            Alert('error', error.message || 'Failed to add the event!');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-black"
                >
                    &times;
                </button>
                <h2 className="text-2xl font-bold mb-4 text-[#EEBB07]">
                    Add Event
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={eventData.name}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={eventData.description}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Date
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={eventData.date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2">
                            Location
                        </label>
                        <input
                            type="text"
                            name="location"
                            value={eventData.location}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-[#EEBB07] text-black font-bold px-4 py-2 rounded transition ${
                            isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#d4a306]'
                        }`}
                    >
                        {isSubmitting ? 'Adding...' : 'Add Event'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddEventPopup;
