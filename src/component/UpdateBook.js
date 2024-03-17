import React, { useState } from 'react';

const UpdateBook = ({ isOpen, book, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    id: book.id,
    bookTitle: book.bookTitle, // Pre-populate form with existing data
    bookAuthor: book.bookAuthor,
    yearPublication: book.yearPublication,
    publisher: book.publisher,
    totalQuantity: book.totalQuantity,
    availableQuantity: book.availableQuantity,
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
            <h5 className="modal-title">Update Book</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  name="bookTitle"
                  value={formData.bookTitle}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="author" className="form-label">
                  Author
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="author"
                  name="bookAuthor"
                  value={formData.bookAuthor}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="year" className="form-label">
                  Year
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="year"
                  name="yearPublication"
                  value={formData.yearPublication}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="publisher" className="form-label">
                  Publisher
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="publisher"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="total" className="form-label">
                  Total
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="total"
                  name="totalQuantity"
                  value={formData.totalQuantity}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="available" className="form-label">
                  Available
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="available"
                  name="availableQuantity"
                  value={formData.availableQuantity}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Update Book
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBook;
