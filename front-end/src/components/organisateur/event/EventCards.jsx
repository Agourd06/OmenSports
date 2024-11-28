import React, { useEffect, useState, useContext } from 'react';
import { AlertContext } from '../../../App';
import AuthContext from '../../../contexts/AuthContext';
import { fetchData } from '../../../fetcher/FetchData';
import EventDetails from './EventDetails';

export default function EventCards() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const Alert = useContext(AlertContext);
    const { token } = useContext(AuthContext);

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const response = await fetchData('events', 'GET', token);
                setEvents(response);
            } catch (error) {
                Alert('error', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchEvents();
        }
    }, [token]);

    const handleAddParticipant = (eventId) => {
        console.log('Adding participant to event:', eventId);
    };

    const handleDetailsClick = (event) => {
        setSelectedEvent(event); 
    };

    const closeDetailsPopup = () => {
        setSelectedEvent(null); 
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                    <div
                        key={event._id}
                        className="bg-gray-800 border border-[#EEBB07] shadow-lg rounded-lg overflow-hidden"
                    >
                        <div className="p-4">
                            <img
                                src={event.image || 'https://scontent.frak3-1.fna.fbcdn.net/v/t39.30808-6/294525364_391140126441616_2972925264364639290_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFodGjEeu-MbRdy1yPgyySZIqtxGj-JyVAiq3EaP4nJUCQvrIJBMVTbxz7LFL0K88lS5pFY9wJPx83yF5Ka0ACf&_nc_ohc=svSMxQgm2kwQ7kNvgHojdDp&_nc_zt=23&_nc_ht=scontent.frak3-1.fna&_nc_gid=Av9-JHUq9hJ0DcnAIl-qZ9R&oh=00_AYBGJCxYEVF3IgVqggPB1S9MgkO8EH_Y4jGYSY9HkIvDHA&oe=674E51B2'} 
                                alt={event.name}
                                className="w-full h-48 object-cover mb-4"
                            />
                            <h2 className="text-xl font-bold text-[#EEBB07] mb-2">{event.name}</h2>
                            <div className="flex gap-10">
                                <button
                                    onClick={() => handleAddParticipant(event._id)}
                                    className="w-full bg-[#EEBB07] hover:bg-[#FFD700] text-black font-semibold py-2 rounded-md duration-300"
                                >
                                    New Participant
                                </button>
                                <button
                                    onClick={() => handleDetailsClick(event)} 
                                    className="w-full bg-[#EEBB07] hover:bg-[#FFD700] text-black font-semibold py-2 rounded-md duration-300"
                                >
                                    Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedEvent && <EventDetails event={selectedEvent} onClose={closeDetailsPopup} />}
        </>
    );
}
