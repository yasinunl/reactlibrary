import axios from "axios"

const baseUrl = "http://localhost:8080/api/v1.0/auth/login"

export const loginData = async({email, password}) => {
    try{const fetchData = await axios.post(baseUrl, {"email": email, "password": password});
    return fetchData.data;}catch(error){
        console.log("Error fetching login "+error);
    }
}