import React, { useState, useContext } from 'react';
import AddParticipantModal from './AddParticipantModal';
import AddExistingUserModal from './AddExistingUserModal';
import AuthContext from '../../../contexts/AuthContext';
import { fetchData } from '../../../fetcher/FetchData';
import { useGeneratePDF } from '../../../hooks/useGeneratePDF';

const EventDetails = ({ event, onClose, setSelectedEvent, setEvents }) => {
  const [isAddParticipantOpen, setIsAddParticipantOpen] = useState(false);
  const [isAddExistingUserOpen, setIsAddExistingUserOpen] = useState(false);
  const { token } = useContext(AuthContext);
  const { generatePDF } = useGeneratePDF();

  const openAddParticipantModal = () => setIsAddParticipantOpen(true);
  const closeAddParticipantModal = () => setIsAddParticipantOpen(false);
  const openAddExistingUserModal = () => setIsAddExistingUserOpen(true);
  const closeAddExistingUserModal = () => setIsAddExistingUserOpen(false);

  const deleteFromEvent = async (userId) => {
    try {
      const response = await fetchData(`events/${event._id}/users/${userId}`, 'DELETE', token);
      console.log(response._id);
      console.log(event._id);

      if (response && response._id === event._id) {
        setSelectedEvent(response);
        setEvents((prev) => prev.map((_event) => {
          if (_event._id === event._id) {
            return response;
          }
          return _event;
        }));
      }

    } catch (error) {
      console.error('Error deleting user from event:', error);
    }
  };


  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
        <div>

          <button
            onClick={onClose}
            className="absolute  top-2 right-6 text-gray-600 hover:text-black text-2xl"
          >
            &times;
          </button>
          <div className='flex justify-between items-center my-4'>
            <h2 className="text-2xl font-bold text-[#EEBB07] mb-4">{event.name}</h2>

            <button
              onClick={() => generatePDF(event)}
              className=" bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md mt-4 flex items-center justify-center shadow-lg transition duration-300"
            >
              <i className="bx bx-download text-xl mr-2"></i> Download PDF
            </button>


          </div>
        </div>
        <img
          src={event.image || 'https://scontent.frak3-1.fna.fbcdn.net/v/t39.30808-6/294525364_391140126441616_2972925264364639290_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFodGjEeu-MbRdy1yPgyySZIqtxGj-JyVAiq3EaP4nJUCQvrIJBMVTbxz7LFL0K88lS5pFY9wJPx83yF5Ka0ACf&_nc_ohc=svSMxQgm2kwQ7kNvgHojdDp&_nc_zt=23&_nc_ht=scontent.frak3-1.fna&_nc_gid=Av9-JHUq9hJ0DcnAIl-qZ9R&oh=00_AYBGJCxYEVF3IgVqggPB1S9MgkO8EH_Y4jGYSY9HkIvDHA&oe=674E51B2'}
          alt={event.name}
          className="w-full h-48 object-cover mb-4 rounded-md"
        />
        <p className="text-gray-600"><strong>Location:</strong> {event.location}</p>
        <p className="text-gray-600"><strong>Date:</strong> {event.date}</p>
        <p className="text-gray-600 mb-6"><strong>Description:</strong> {event.description}</p>
        <div className='flex'>
          <button
            onClick={openAddParticipantModal}
            className="w-full bg-[#EEBB07] hover:bg-[#FFD700] text-black font-semibold py-2 rounded-tl-md mt-4 border border-l"
          >
            New Participant
          </button>

          <button
            onClick={openAddExistingUserModal}
            className="w-full bg-[#EEBB07] hover:bg-[#FFD700] text-black font-semibold py-2 rounded-tr-md mt-4 border border-l"
          >
            Add Existing User
          </button>
        </div>

        <div className="font-sans overflow-x-auto rounded-b-lg max-h-60 overflow-y-auto">
          <table className="min-w-full bg-darker rounded-lg">
            <thead className="bg-gray-800 text-white rounded-lg">
              <tr>
                <th className="p-4 text-left text-xs font-bold">UserName</th>
                <th className="p-4 text-left text-xs font-bold">E-mail</th>
                <th className="p-4 text-left text-xs font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {event.users && event.users.length > 0 ? (
                <>
                  {event.users.map((user) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-700 bg-gray-900 text-white border-b border-gray-700"
                    >
                      <td className="p-4">{user.username}</td>
                      <td className="p-4">{user.email}</td>
                      <td className="p-4 flex items-center space-x-2">
                        <button
                          onClick={() => deleteFromEvent(user._id)}
                          className="text-red-500 hover:text-red-700"
                          title="Delete"
                        >
                          <i className="bx bx-trash text-xl"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr className="hover:bg-gray-700 bg-gray-900 text-white border-b border-gray-700">
                  <td className="p-4" colSpan={3}>No Participants</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {isAddParticipantOpen && (
        <AddParticipantModal
          eventId={event._id}
          onClose={closeAddParticipantModal}
          setSelectedEvent={setSelectedEvent}
          setEvents={setEvents}
        />
      )}

      {isAddExistingUserOpen && (
        <AddExistingUserModal
          eventId={event._id}
          onClose={closeAddExistingUserModal}
          setSelectedEvent={setSelectedEvent}
          setEvents={setEvents}
        />
      )}
    </div>
  );
};

export default EventDetails;
