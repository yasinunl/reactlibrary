import axios from "axios"

const baseUrl = "http://localhost:8080/api/v1.0/auth/register"

export const registerData = async ({ firstName, lastName, email, password }) => {
    try {
        const fetchData = await axios.post(baseUrl, { "firstName": firstName, "lastName": lastName ,"email": email, "password": password });
        return fetchData.data;
    } catch (error) {
        console.log("Error fetching register " + error);
    }
}