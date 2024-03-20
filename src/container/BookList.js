import React, { useState, useEffect, useContext } from 'react';
import Book from '../component/Book';
import '../style/BookList.css';
import CreateBook from '../component/CreateBook';
import { addBook, deleteAllBook, deleteBook, getAllBooks, getCount, getSearchedBooks, updateBook } from '../service/BookService';
import UpdateBook from '../component/UpdateBook';
import { AuthContext } from '../auth/auth'
import SearchBar from '../component/SearchBar';

const BooksList = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [book, setBook] = useState({});
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(false);
  const { user, isLoggedIn, role } = useContext(AuthContext)

  const handleCreateBook = async (bookData) => {
    setIsCreatingBook(!isCreatingBook);
    await addBook(bookData, user);
    const book = await getAllBooks();
    setBooks(book);

  };

  const handleUpdateBook = (index) => {
    setBook(books[index])
    setUpdateModal(true)
  }
  const hadleCloseModal = () => {
    setUpdateModal(false)
  }
  const handleUpdeteSubmit = (book) => {
    const fetchData = async () => {
      await updateBook(book, user)
      const bookData = await getAllBooks();
      setBooks(bookData);
    }
    fetchData();

  }
  const handleDeleteBook = (id) => {
    const fetchData = async () => {
      await deleteBook(id, user)
      const bookData = await getAllBooks();
      setBooks(bookData);
    }
    fetchData();
  }

  const handleDeleteAllBook = (id) => {
    const fetchData = async () => {
      await deleteAllBook(id, user, role)
      const bookData = await getAllBooks();
      setBooks(bookData);
    }
    fetchData();
  }

  const handleSearch = (searchTerm) => {
    const fetchData = async () => {
      if (searchTerm == "") {
        const bookData = await getAllBooks(searchTerm);
        setBooks(bookData);
        setSearchQuery(false)
      }
      else {
        const bookData = await getSearchedBooks(searchTerm);
        setBooks(bookData);
        setSearchQuery(true)
      }
    }
    fetchData();
  };

  const handlePrevClick = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(()=>{
    const fetchData = async () => {
      const bookData = await getAllBooks(currentPage);
      setBooks(bookData);
    }
    fetchData();
  }, [currentPage])
  useEffect(() => {
    const fetchData = async () => {
      const bookData = await getAllBooks();
      const pageCount = await getCount();
      setPageCount(pageCount);
      setBooks(bookData);
    }
    fetchData();
  }, [])
  return (
    <div className="books-list">
      {isLoggedIn && (
        <>
          <CreateBook onCreateBook={handleCreateBook} />
        </>
      )}
      <SearchBar onSearch={handleSearch} />
      <h1>Books</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Year</th>
            <th>Publisher</th>
            <th>Total</th>
            <th>Available</th>
            {isLoggedIn && <>
              <th>Update</th>
              <th>Delete</th>
              {role == "ADMIN" && <th>Delete All</th>}
            </>}
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr>
              <Book {...book} />
              {isLoggedIn && <> <td>
                <button onClick={() => handleUpdateBook(index)}>Update</button>
              </td>
                <td>
                  <button disabled={(book.totalQuantity <= 1 && role != "ADMIN") && true} onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </td>
                {/* Role checking */}
                {role == "ADMIN" && <td>
                  {/* First delete borrow history before deleting book */}
                  <button disabled={book.availableQuantity != book.totalQuantity && true} onClick={() => handleDeleteAllBook(book.id)}>Delete All</button>
                </td>}
              </>}
            </tr>
          ))}
        </tbody>
      </table>
      {/* Searching controller */}
      {!searchQuery && <div className="pagination-buttons">
        <button disabled={currentPage === 0} onClick={handlePrevClick}>
          Left
        </button>
        <button disabled={currentPage === pageCount} onClick={handleNextClick}>
          Right
        </button>
      </div>}
      
      {
        updateModal && <UpdateBook isOpen={updateModal} book={book} onClose={hadleCloseModal} onSubmit={handleUpdeteSubmit} />
      }
    </div>
  );
};

export default BooksList;