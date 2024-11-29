import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import SideBarContext from '../../contexts/SideBarContext';
import AuthContext from '../../contexts/AuthContext';

export default function SideBar() {
    const { toggleSideBar, isSideBarVisible } = useContext(SideBarContext);
const { logout } = useContext(AuthContext)
    return (
        <>
            <button
                onClick={toggleSideBar}
                className={`fixed top-1/2 left-2 transform -translate-y-1/2 z-50 bg-[#EEBB07] hover:bg-[#e0a806] text-darker font-bold rounded-full shadow-lg p-3 transition-all ${isSideBarVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
            >
                
            </button>

            <nav
    className={`bg-darker shadow-xl shadow-white/10 h-screen fixed top-0 left-0 lg:min-w-[250px] w-[75%] sm:w-[60%] md:w-[250px] py-6 px-4 font-sans overflow-auto rounded-r-3xl z-40 transition-transform duration-500 ${
        isSideBarVisible ? 'translate-x-0' : '-translate-x-full'
    }`}
>


                <div className="flex flex-col h-full">
                    <div className="flex items-center mb-6">
                        <div className="ml-4 flex gap-5" >
                            <p className="text-lg text-gray-300 text-text font-semibold">
                                OmenSports <span className="text-xs text-[#EEBB07]">Admin</span>
                            </p>
                        <button onClick={toggleSideBar}

                            className="ml-auto text-white text-3xl cursor-pointer hover:text-[#EEBB07] transition-all "
                        >
                            <i className="bx bx-chevron-left"></i>
                        </button>
                        </div>
                    </div>

                    <hr className="my-6 border-[#EEBB07]" />

                    <ul className="space-y-4 px-2">
                        <li>
                            <Link
                                to="/admin"
                                className="text-gray-300 text-sm flex items-center hover:text-[#EEBB07] transition-all"
                            >
                                <i className="bx bx-calendar-event mr-4 text-xl"></i>
                                <span>Events</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/participants"
                                className="text-gray-300 text-sm flex items-center hover:text-[#EEBB07] transition-all"
                            >
                                <i className="bx bx-group mr-4 text-xl"></i>
                                <span>Participants</span>
                            </Link>
                        </li>
                    </ul>

                    <hr className="my-6 border-[#EEBB07]" />

                    <button onClick={logout}
                        className="text-sm text-gray-300 flex items-center hover:text-red-500 transition-all px-2 mt-auto"
                    >
                        <i className="bx bx-log-out mr-4 text-xl"></i>
                        <span>Logout</span>
                    </button>
                </div>
            </nav>
        </>
    );
}
