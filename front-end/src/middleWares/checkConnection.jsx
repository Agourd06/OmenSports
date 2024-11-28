export const CheckForConnection = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return null;
    }

};
