import React, { useState } from 'react';
import '../style/StudentList.css';

const UpdateStudent = ({ isOpen, student, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: student.id,
    firstName: student.firstName,
    lastName: student.lastName,
    email: student.email,
    borrowedBooks: student.borrowedBooks,
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formData); // Call the provided onSubmit function with updated data
    onClose(); // Close the modal after submission
  };

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
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">
                  Last Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="borrowedBooks" className="form-label">
                  Borrowed Books
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="borrowedBooks"
                  name="borrowedBooks"
                  value={formData.borrowedBooks}
                  onChange={handleChange}
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

export default UpdateStudent;