import { config } from "../config";

export async function fetchData(endPoint, method = 'GET', token, body = null, isFormData = false) {
    try {
        const headers = {
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...(isFormData ? {} : { 'Content-Type': 'application/json' }), 
        };

        const fetchOptions = {
            method: method,
            headers: headers,
        };

        if (method !== 'GET' && body) {
            fetchOptions.body = isFormData ? body : JSON.stringify(body);
        }

        const response = await fetch(`${config.API_URL}${endPoint}`, fetchOptions);
      
        if (!response.ok) {
            const errorResponse = await response.text();
            const errorMessage = errorResponse || 'Problem in response, please try again';
            throw new Error(errorMessage);
        }

        const responseData = await response.text();
        return responseData ? JSON.parse(responseData) : {};  

    } catch (error) {
        console.error('Fetch Error:', error);
        throw error;
    }
}
