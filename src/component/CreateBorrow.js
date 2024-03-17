import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker'; // Install react-datepicker library
import 'react-datepicker/dist/react-datepicker.css'; // Import stylesheet
import { getAllBooks } from '../service/BookService';
import { getAllStudent } from '../service/StudentService';

const CreateBorrow = ({onCreateBook}) => {
  const [selectedBook, setSelectedBook] = useState(0);
  const [selectedStudent, setSelectedStudent] = useState(0);
  const [selectedReturnDate, setSelectedReturnDate] = useState();
  const [books, setBooks] = useState();
  const [students, setStudents] = useState();

  const handleBookChange = (event) => {
    setSelectedBook(parseInt(event.target.value)); // Convert value to integer for ID
  };

  const handleStudentChange = (event) => {
    setSelectedStudent(parseInt(event.target.value)); // Convert value to integer for ID
  };

  const handleReturnDateChange = (date) => {
    setSelectedReturnDate(date);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedBook && selectedStudent && selectedReturnDate) {
        onCreateBook({ books: {id:selectedBook}, student: {id: selectedStudent}, returnDate: selectedReturnDate });
      // Clear selections after successful creation (optional)
      setSelectedBook(0);
      setSelectedStudent(0);
      setSelectedReturnDate(null);
    } else {
      alert('Please select a book, student, and return date.');
    }
  };


useEffect(()=>{
  const fetchData = async()=>{
    setBooks(await getAllBooks());
  setStudents(await getAllStudent());
  }
  fetchData();
  
},[]);
  const [isVisible, setIsVisible] = useState(false);
  const toggleCreateBorrowForm = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
    <button className='create-student-button' onClick={toggleCreateBorrowForm}>
    {isVisible ? 'Hide Create Borrow' : 'Create Borrow'}
  </button>
  {isVisible && (
    <form onSubmit={handleSubmit} className="create-borrow-form">
      <h2>Create Borrow</h2>
      <div className="borrow-field" style={{width:"200px"}}>
        <label htmlFor="book">Book:</label>
        <select id="book" value={selectedBook} onChange={handleBookChange}>
          <option value="">Select Book</option>
          {books.map((book) => (
            <option key={book.id} value={book.id}>
              {book.bookTitle}
            </option>
          ))}
        </select>
      </div>
      <div className="borrow-field" style={{width:"200px"}}>
        <label htmlFor="student">Student:</label>
        <select id="student" value={selectedStudent} onChange={handleStudentChange}>
          <option value="">Select Student</option>
          {students.map((student) => (
            <option key={student.id} value={student.id}>
              {student.firstName + " " + student.lastName}
            </option>
          ))}
        </select>
      </div>
      <div className="borrow-field">
        <label htmlFor="returnDate">Return Date:</label>
        <DatePicker
          id="returnDate"
          selected={selectedReturnDate}
          onChange={handleReturnDateChange}
          dateFormat="yyyy-MM-dd" // Set desired date format
          minDate={new Date()} // Disable past dates as options (optional)
        />
      </div>
      <button type="submit" className="create-borrow-button">
        Create Borrow
      </button>
    </form>)}
    </div>
  );
};

export default CreateBorrow;