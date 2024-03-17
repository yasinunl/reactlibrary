import React from 'react';

const BorrowHistory = ({ bookTitle, bookAuthor,firstName,lastName ,borrowDate, returnDate }) => {
  return (
  <>
     <td>{bookTitle}</td>
      <td>{bookAuthor}</td>
      <td>{firstName + " " + lastName}</td>
      <td>{borrowDate}</td>
      <td>{returnDate}</td>
    </>
    );
};

export default BorrowHistory;