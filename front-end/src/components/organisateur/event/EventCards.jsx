import React from 'react'

export default function EventCards() {
  return (
    
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {/* {events.map((event) => ( */}
                    <div
                        // key={event._id}
                        className="bg-gray-800 border border-[#EEBB07] shadow-lg rounded-lg overflow-hidden"
                    >
                        <div className="p-4">
                            <h2 className="text-xl font-bold text-[#EEBB07] mb-2">name</h2>
                            <p className="text-gray-300 text-sm mb-2">
                                <span className="font-semibold">Location:</span> location
                            </p>
                            <p className="text-gray-300 text-sm mb-2">
                                <span className="font-semibold">Date:</span>{' '}
                            </p>
                            <p className="text-gray-300 text-sm mb-4">
                                <span className="font-semibold">Time:</span> time
                            </p>

                            <button
                                onClick={() => handleAddParticipant(1)}
                                className="w-full bg-[#EEBB07] hover:bg-[#FFD700] text-black font-semibold py-2 rounded-md duration-300"
                            >
                                Add New Participant
                            </button>
                        </div>
                    </div>
                {/* ))} */}
            </div>
   
  )
}
