import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../../contexts/AuthContext';
import { fetchData } from '../../../fetcher/FetchData';
import { AlertContext } from '../../../App';

const AddExistingUserModal = ({ eventId, onClose, setSelectedEvent, setEvents }) => {
  const { token } = useContext(AuthContext);
  const [usersList, setUsersList] = useState([]); 
  const [selectedUser, setSelectedUser] = useState(''); 
const Alert = useContext(AlertContext)
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetchData('users' , 'GET' , token)
      // console.log('users' , response);
      
      setUsersList(response); 
    };

    fetchUsers();
  }, [token]);

  const addExistingUserToEvent = async () => {
    if (!selectedUser) {
      Alert('warnning' , 'Please select a user');
      return;
    }
  
    const res = await fetchData(`events/${eventId}/users/${selectedUser}`, 'POST', token);
  
    if (!res) {
      console.error('Failed to add user to event');
      return;
    }
  
    console.log('Updated Event:', res);
  

    setSelectedEvent((prev) => ({
      ...prev,
      users: res.users, 
    }));
  
    setEvents((prev) =>
      prev.map((_event) => {
        if (_event._id === eventId) {
          return {
            ..._event,
            users: res.users, 
          };
        }
        return _event;
      })
    );
  
    onClose();
  };
  

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Add Existing User</h2>

        <div className="mb-4">
          <label htmlFor="userSelect" className="block text-sm font-semibold mb-2">
            Select a user:
          </label>
          <select
            id="userSelect"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="">-- Select User --</option>
            {usersList.map((user) => (
              <option key={user._id} value={user._id}>
                {user.username} ({user.email})
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={addExistingUserToEvent}
          className="w-full bg-[#EEBB07] hover:bg-[#FFD700] text-black font-semibold py-2 rounded-md"
        >
          Add User
        </button>
      </div>
    </div>
  );
};

export default AddExistingUserModal;
