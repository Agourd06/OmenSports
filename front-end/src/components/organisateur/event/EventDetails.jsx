// EventDetails.js
import React from 'react';

const EventDetails = ({ event, onClose }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold text-[#EEBB07]">{event.name}</h2>
        <img
          src={event.image || 'https://scontent.frak3-1.fna.fbcdn.net/v/t39.30808-6/294525364_391140126441616_2972925264364639290_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFodGjEeu-MbRdy1yPgyySZIqtxGj-JyVAiq3EaP4nJUCQvrIJBMVTbxz7LFL0K88lS5pFY9wJPx83yF5Ka0ACf&_nc_ohc=svSMxQgm2kwQ7kNvgHojdDp&_nc_zt=23&_nc_ht=scontent.frak3-1.fna&_nc_gid=Av9-JHUq9hJ0DcnAIl-qZ9R&oh=00_AYBGJCxYEVF3IgVqggPB1S9MgkO8EH_Y4jGYSY9HkIvDHA&oe=674E51B2'} 
          alt={event.name}
          className="w-full h-48 object-cover my-4"
        />
        <p className="text-gray-600"><strong>Location:</strong> {event.location}</p>
        <p className="text-gray-600"><strong>Date:</strong> {event.date}</p>
        <p className="text-gray-600"><strong>Time:</strong> {event.time}</p>
        <p className="text-gray-600"><strong>Description:</strong> {event.description}</p>
      </div>
    </div>
  );
};

export default EventDetails;
