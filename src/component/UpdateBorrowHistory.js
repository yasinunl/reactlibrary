import React, { useEffect, useState } from 'react';
import '../style/StudentList.css';
import { getAllBooks } from '../service/BookService';
import { getAllStudent } from '../service/StudentService';
import DatePicker from 'react-datepicker'; // Install react-datepicker library
import 'react-datepicker/dist/react-datepicker.css'; // Import stylesheet

const UpdateBorrowHistory = ({ isOpen, borrow, onClose, onSubmit }) => {
    const [selectedBook, setSelectedBook] = useState();
    const [selectedStudent, setSelectedStudent] = useState();
    const [selectedReturnDate, setSelectedReturnDate] = useState(borrow.returnDate);
    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);

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
        const formData = {
            returnDate: selectedReturnDate,
            books: {id: selectedBook},
            students: {id:selectedStudent},
            id: borrow.id
        }
        onSubmit(formData); // Call the provided onSubmit function with updated data
        onClose(); // Close the modal after submission
    };


    useEffect(() => {
        setSelectedBook(borrow.books.id)
        setSelectedStudent(borrow.student.id)
        const fetchData = async () => {
            setBooks(await getAllBooks());
            setStudents(await getAllStudent());
        }
        fetchData();

    }, []);
    return (
        <div className={`modal ${isOpen ? 'show' : ''}`}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Update Student</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="borrow-field" style={{ width: "200px" }}>
                                <label htmlFor="book">Book:</label>
                                <select id="book" value={selectedBook} onChange={handleBookChange}>
                                    <option value="">Select Book</option>
                                    {books && books.map((book) => (
                                        <option key={book.id} value={book.id}>
                                            {book.bookTitle}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="borrow-field" style={{ width: "200px" }}>
                                <label htmlFor="student">Student:</label>
                                <select id="student" value={selectedStudent} onChange={handleStudentChange}>
                                    <option value="">Select Student</option>
                                    {students && students.map((student) => (
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

                            <button type="submit" className="btn btn-primary">
                                Update Student
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateBorrowHistory;