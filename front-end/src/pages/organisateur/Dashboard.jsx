import React, { useContext } from 'react';
import EventCards from '../../components/organisateur/event/EventCards';
import SideBar from '../../components/sidebar/SidaBar';
import SideBarContext from '../../contexts/SideBarContext';

export default function Dashboard() {
    const { isSideBarVisible } = useContext(SideBarContext);

    return (
        <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen">
            <SideBar />
            <div
                className={`transition-all duration-500 px-12 py-6 ${
                    isSideBarVisible ? 'ml-[250px] xl:w-[calc(100%-250px)]' : 'ml-0 xl:w-full'
                }`}
            >
                <h1 className="text-[#EEBB07] text-3xl font-extrabold text-center mb-8">Events</h1>
                <EventCards />
            </div>
        </div>
    );
}
