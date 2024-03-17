import React, { useState } from 'react';
import '../style/StudentList.css';

const CreateBook = ({ onCreateBook }) => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookAuthor, setBookAuthor] = useState('');
  const [yearOfPublication, setYearOfPublication] = useState('');
  const [publisher, setPublisher] = useState('');
  const [totalQuantity, setTotalQuantity] = useState(1);
  
  // State variable and function to toggle visibility of the form
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    const newBook = {
      bookTitle: bookTitle,
      bookAuthor: bookAuthor,
      yearPublication: yearOfPublication,
      publisher: publisher,
      totalQuantity: totalQuantity,
      availableQuantity: totalQuantity,
    };
    onCreateBook(newBook);
    setIsVisible(!isVisible); // Toggles visibility of the form
    setTotalQuantity(1);
    setPublisher("");
    setYearOfPublication("");
    setBookAuthor("");
    setBookTitle("")
    
}


const toggleCreateBookForm = () => {
  setIsVisible(!isVisible);
};

return (
    <div>
      <button className='create-student-button' onClick={toggleCreateBookForm}>
        {isVisible ? 'Hide Create Student' : 'Create Student'}
      </button>
      {isVisible && (
        <form
          className={`create-student-form ${isVisible ? 'show' : ''}`}
          onSubmit={handleSubmit}
        >
          <label htmlFor="bookTitle" className="create-student-label">
          Book Title:
        </label>
        <input
          type="text"
          id="bookTitle"
          className="create-student-input"
          value={bookTitle}
          onChange={(e) => setBookTitle(e.target.value)}
          required
        />
        <label htmlFor="bookTitle" className="create-student-label">
          Book Author:
        </label>
        <input
          type="text"
          id="bookAuthor"
          className="create-student-input"
          value={bookAuthor}
          onChange={(e) => setBookAuthor(e.target.value)}
          required
        />
        <label htmlFor="yearOfPublication" className="create-student-label">
          Year of publication:
        </label>
        <input
          type="text"
          id="yearOfPublication"
          className="create-student-input"
          value={yearOfPublication}
          onChange={(e) => setYearOfPublication(e.target.value)}
          required
        />
         <label htmlFor="publisher" className="create-student-label">
         Publisher:
        </label>
        <input
          type="text"
          id="yearOfPublication"
          className="create-student-input"
          value={publisher}
          onChange={(e) => setPublisher(e.target.value)}
          required
        /> <label htmlFor="publisher" className="create-student-label">
        Total Quantity:
       </label>
       <input
         type="text"
         id="quantity"
         className="create-student-input"
         value={totalQuantity}
         onChange={(e) => setTotalQuantity(e.target.value)}
         required
       />
        <button type="submit" className="create-student-button">
          Create Book
        </button>
        </form>
      )}
    </div>
  );
  };

  export default CreateBook;