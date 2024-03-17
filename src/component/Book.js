import React from 'react';

const Book = ({ bookTitle, bookAuthor, yearPublication, publisher, totalQuantity, availableQuantity }) => {
  return (<>
     <td>{bookTitle}</td>
      <td>{bookAuthor}</td>
      <td>{yearPublication}</td>
      <td>{publisher}</td>
      <td>{totalQuantity}</td>
      <td>{availableQuantity}</td></>
  );
};

export default Book;