import React, { useState } from 'react';
import '../style/StudentList.css';

const CreateStudent = ({ onCreateStudent }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreateStudent({ firstName, lastName, email }); // Pass data to parent component
    setFirstName(''); // Clear form after submission (optional)
    setLastName('');
    setEmail('');
    setIsVisible(!isVisible);
  };



  const [isVisible, setIsVisible] = useState(false);

const toggleCreateStudentForm = () => {
  setIsVisible(!isVisible);
};

return (
  <div>
    <button className='create-student-button' onClick={toggleCreateStudentForm}>
      {isVisible ? 'Hide Create Student' : 'Create Student'}
    </button>
    {isVisible && (
      <form
        className={`create-student-form ${isVisible ? 'show' : ''}`}
        onSubmit={handleSubmit}
      >
        <label htmlFor="firstName" className="create-student-label">
        First Name:
      </label>
      <input
        type="text"
        id="firstName"
        className="create-student-input"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <label htmlFor="lastName" className="create-student-label">
        Last Name:
      </label>
      <input
        type="text"
        id="lastName"
        className="create-student-input"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <label htmlFor="email" className="create-student-label">
        Email:
      </label>
      <input
        type="email"
        id="email"
        className="create-student-input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit" className="create-student-button">
        Create Student
      </button>
      </form>
    )}
  </div>
);
};

export default CreateStudent;