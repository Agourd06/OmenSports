import React, { useContext, useEffect, useState } from 'react';
import SideBarContext from '../../contexts/SideBarContext';
import AuthContext from '../../contexts/AuthContext';
import { AlertContext } from '../../App';
import SideBar from '../../components/sidebar/SidaBar';
import { fetchData } from '../../fetcher/FetchData';
import ParticipantTable from '../../components/organisateur/participant/ParticipantTable';
import UpdateUserForm from '../../components/organisateur/participant/UpdateUserForm'; // Import the update form

export default function Participant() {
    const { isSideBarVisible } = useContext(SideBarContext);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // State for selected user
    const [showModal, setShowModal] = useState(false); // State for modal visibility
    const Alert = useContext(AlertContext);
    const { token } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetchData('users', 'GET', token);
                setUsers((prevUsers) => [...prevUsers, ...response]);
            } catch (error) {
                Alert('error', error.message);
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            fetchUsers();
        }
    }, [token]);

    const handleUpdateUser = (user) => {
        setSelectedUser(user);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedUser(null);
    };

    return (
        <div className="relative bg-gradient-to-r from-gray-800 via-gray-900 to-black min-h-screen">
            <SideBar />
            <div
                className={`transition-all duration-500 px-12 py-6 ${isSideBarVisible ? 'ml-[250px] xl:w-[calc(100%-250px)] md:block hidden' : 'ml-0 xl:w-full'}`}
            >
                <h1 className="text-[#EEBB07] text-3xl font-extrabold text-center mb-8">
                    Participants
                </h1>
                <ParticipantTable
                    users={users}
                    setUsers={setUsers}
                    loading={loading}
                    onUpdateUser={handleUpdateUser} 
                />
                {showModal && (
                    <UpdateUserForm
                        user={selectedUser}
                        setUsers={setUsers}
                        onClose={handleModalClose} 
                    />
                )}
            </div>
        </div>
    );
}
