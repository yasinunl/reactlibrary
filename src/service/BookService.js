import axios from 'axios'
const basedUrl = "http://localhost:8080/api/v1.0/books";
export const getAllBooks = async (pageNumber = 0) => {
    try{
        const bookData = await axios.get(basedUrl+"?page="+ pageNumber);
        return bookData.data;
    }
    catch(error){
        console.error('Error fetching students:', error);
        throw(error);
    }
}

export const getCount = async() => {
    try{
        const bookData = await axios.get(basedUrl + "/count");
        return bookData.data;
    }
    catch(err){
        console.error('Error fetching students:', err);
        throw(err);
    }
}

export const getSearchedBooks = async (searchTerm) => {
    try{
        const bookData = await axios.get(basedUrl+"/search?query="+searchTerm);
        return bookData.data;
    }
    catch(error){
        console.error('Error fetching students:', error);
        throw(error);
    }
}

export const updateBook = async (book, token) => {
    try{
        await axios.put(basedUrl, book,
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
export const deleteBook = async (id, token) => {
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
export const deleteAllBook = async (id, token) => {
    try{
        await axios.delete(basedUrl + "/delete-all/" + id,
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

export const addBook = async(book, token) => {
    try{
        await axios.post(basedUrl, book,
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