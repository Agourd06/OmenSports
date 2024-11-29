import { useContext } from "react";
import { fetchData } from "../../../fetcher/FetchData";
import { AlertContext } from "../../../App";
import AuthContext from "../../../contexts/AuthContext";

export default function ParticipantTable({
    users,
    setUsers,
    loading,
    onUpdateUser, 
}) {
    const Alert = useContext(AlertContext);
    const { token } = useContext(AuthContext);

    const archiveUser = async (id) => {
        try {
            await fetchData(`users/${id}`, 'DELETE', token);
            const updatedUsers = users.filter((user) => user._id !== id);
            
            setUsers(updatedUsers);
            Alert('success', 'User Managed Successfully');
        } catch (err) {
            Alert('error', err.message);
        }
    };

    return (
        <div className="font-sans overflow-x-auto rounded-lg">
            <table className="min-w-full bg-darker rounded-lg">
                <thead className="bg-darker whitespace-nowrap border border-border rounded-lg">
                    <tr>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">Name</th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">Email</th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">Phone</th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">Adress</th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">Joined At</th>
                        <th className="p-4 text-left text-xs font-bold text-gray-300">Actions</th>
                    </tr>
                </thead>
                <tbody className="whitespace-nowrap rounded-lg">
                    {users.map((user) => (
                        <tr key={user._id} className="hover:bg-black border border-border duration-700 rounded-lg">
                            <td className="p-4 text-[15px] text-gray-200 rounded-lg">{user.username}</td>
                            <td className="p-4 text-[15px] text-gray-200">{user.email}</td>
                            <td className="p-4 text-[15px] text-gray-200">{user.phone}</td>
                            <td className="p-4 text-[15px] text-gray-200 pl-8">{user.adress}</td>
                            <td className="p-4 text-[15px] text-gray-200">
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td className="p-4 pl-7 flex items-center">
                                <button
                                    onClick={() => onUpdateUser(user)} 
                                    className="mr-4"
                                    title="Update"
                                >
                                    <i className="bx bx-edit-alt text-xl hover:text-blue-700 text-blue-500"></i>
                                </button>
                                <button
                                    onClick={() => archiveUser(user._id)}
                                    className="mr-4"
                                    title="Delete"
                                >
                                    <i className="bx bx-trash text-xl hover:text-red-700 text-red-500"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
