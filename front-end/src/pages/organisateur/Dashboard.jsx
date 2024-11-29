import React, { useContext, useState } from 'react';
import EventCards from '../../components/organisateur/event/EventCards';
import SideBar from '../../components/sidebar/SidaBar';
import SideBarContext from '../../contexts/SideBarContext';
import AddEventPopup from '../../components/organisateur/event/AddEventPopup';

export default function Dashboard() {
    const { isSideBarVisible } = useContext(SideBarContext);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [events, setEvents] = useState([]);

    return (
        <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen">
            <SideBar />
            <div
                className={`transition-all duration-500 px-12 py-6 ${isSideBarVisible ? 'ml-[250px] xl:w-[calc(100%-250px)] md:block hidden' : 'ml-0 xl:w-full'
                    }`}
            >
                <h1 className="text-[#EEBB07] text-3xl font-extrabold text-center mb-8">
                    Events
                </h1>
                    <div className="flex justify-start mb-4 sm:justify-center">
                        <button
                            onClick={() => setIsPopupVisible(true)}
                            className="bg-[#EEBB07] text-black font-bold px-4 py-2 rounded hover:bg-[#d4a306] transition"
                        >
                            Add Event
                        </button>
                    </div>

                
                <EventCards events={events} setEvents={setEvents} isSideBarVisible={isSideBarVisible} />
            </div>
            {isPopupVisible && (
                <AddEventPopup onClose={() => setIsPopupVisible(false)} setEvents={setEvents} />
            )}
        </div>
    );
}
