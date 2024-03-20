import axios from 'axios'
const basedUrl = "http://localhost:8080/api/v1.0/students";

    export const getAllStudent = async() => {
        try{
            const data = await axios.get(basedUrl);
            return data.data;
        }
    catch(error){
        console.error('Error fetching students:', error);
        throw(error);
    }
    }
    
    export const getSearchedStudent = async (searchTerm) => {
        try{
            const studentData = await axios.get(basedUrl+"/search?query="+searchTerm);
            return studentData.data;
        }
        catch(error){
            console.error('Error fetching students:', error);
            throw(error);
        }
    }


export const updateStudent = async (student, token) => {
    try{
        await axios.put(basedUrl, student,
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Include Bearer token in Authorization header
                },
              });
    }
    catch(err) {
        throw(err)
    }
}
export const deleteStudent = async (id, token) => {
    try{
        await axios.delete(basedUrl + "/" + id,
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Include Bearer token in Authorization header
                },
              });
    }
    catch(err) {
        throw(err)
    }
}

export const addStudent = async (student, token) => {
    try{
        await axios.post(basedUrl, student,
            {
                headers: {
                  Authorization: `Bearer ${token}`, // Include Bearer token in Authorization header
                },
              });
    }
    catch(err) {
        throw(err)
    }
}