import React, { useState, useEffect, useContext } from 'react';
import Book from '../component/Book';
import '../style/BookList.css';
import CreateBook from '../component/CreateBook';
import { addBook, deleteAllBook, deleteBook, getAllBooks, updateBook } from '../service/BookService';
import UpdateBook from '../component/UpdateBook';
import { AuthContext } from '../auth/auth'

const BooksList = () => {
  const [books, setBooks] = useState([
  ]);
  const [book, setBook] = useState({});
  const [isCreatingBook, setIsCreatingBook] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);
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

  useEffect(() => {
    const fetchData = async () => {
      const bookData = await getAllBooks();
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

      {
        updateModal && <UpdateBook isOpen={updateModal} book={book} onClose={hadleCloseModal} onSubmit={handleUpdeteSubmit} />
      }
    </div>
  );
};

export default BooksList;