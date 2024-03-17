import React from 'react';

const Student = ({ firstName, lastName, email, borrowedBooks }) => {
  return (<>
    <td>{firstName +" "+ lastName}</td>
    <td>{email}</td>
    <td>{borrowedBooks}</td>
    </>
  );
};

export default Student;