import axios from "axios";

const basedUrl = "http://localhost:8080/api/v1.0/borrowings";

export const getAllBorrowHistory = async() => {
    try{
        const bData = await axios.get(basedUrl);
        return bData.data;}
    catch(error){
        console.error('Error fetching borrow history:', error);
        throw(error);
    }
}

export const updateBorrowHistory = async (borrowed, token) => {
    try{
        await axios.put(basedUrl, borrowed,
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
export const deleteBorrowHistory = async (id, token) => {
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


export const addBorrowHistory = async (borrowed, token) => {
    try{
        await axios.post(basedUrl, borrowed,
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