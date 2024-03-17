import React, { useContext, useEffect, useState } from 'react';
import '../style/BorrowHistory.css';
import BorrowHistory from '../component/BorrowHistory';
import CreateBorrow from '../component/CreateBorrow';
import { addBorrowHistory, deleteBorrowHistory, getAllBorrowHistory, updateBorrowHistory } from '../service/BorrowHistoryService';
import { AuthContext } from '../auth/auth';
import UpdateBorrowHistory from '../component/UpdateBorrowHistory';

const BorrowHistoryList = () => {
  const [borrowHistory, setBorrowHistory] = useState([
  ]);
  const [isCreatingBorrow, setIsCreatingBorrow] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext)
  const [updateModal, setUpdateModal] = useState(false);
  const [borrow, setBorrow] = useState({});
  const handleCreateBorrow = async(borrowData) => {
    setIsCreatingBorrow(!isCreatingBorrow);
    await addBorrowHistory(borrowData, user);
    const bHistory = await getAllBorrowHistory();
    setBorrowHistory(bHistory);
  };


  
  const handleUpdateBorrowHistory = (index) => {
    setBorrow(borrowHistory[index])
    setUpdateModal(true)
  }
  const hadleCloseModal = () => {
    setUpdateModal(false)
  }
  const handleUpdeteSubmit = (borrow) => {
    const fetchData = async()=>{
      await updateBorrowHistory(borrow, user)
      const bHistory = await getAllBorrowHistory();
      setBorrowHistory(bHistory);
    }
    fetchData();
  }
  const handleDeleteBorrowHistory = (id) => {
    const fetchData = async()=>{
      await deleteBorrowHistory(id, user)
      const bHistory = await getAllBorrowHistory();
      setBorrowHistory(bHistory);
    }
    fetchData();
    setBorrowHistory([])
  }



  useEffect(() => {
    const fetchData = async () => {
      const bHistory = await getAllBorrowHistory();
      setBorrowHistory(bHistory);
    }
    fetchData();
  }, [])
  return (
    <div className="borrow-history">
      <h2>Borrowing History</h2>
      {isLoggedIn && (
        <>
          <CreateBorrow onCreateBook={handleCreateBorrow} />
        </>
      )}
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th> Author</th>
            <th>Student Name</th>
            <th>Borrowed Date</th>
            <th>Returned Date</th>
            {isLoggedIn && <>
              <th>Update</th>
              <th>Delete</th></>}
          </tr>
        </thead>
        <tbody>
          {borrowHistory.map((entry, index) => {
            const data = {
              id: entry.id,
              bookTitle: entry.books.bookTitle,
              bookAuthor: entry.books.bookAuthor,
              firstName: entry.student.firstName,
              lastName: entry.student.lastName,
              borrowDate: entry.borrowDate,
              returnDate: entry.returnDate

            }
            return <tr>
              <BorrowHistory key={entry.id} {...data} />
              {isLoggedIn && <> <td>
                <button onClick={() => handleUpdateBorrowHistory(index)}>Update</button>
              </td>
                <td>
                  <button onClick={() => handleDeleteBorrowHistory(entry.id)}>Delete</button>
                </td></>}
            </tr>
          }
          )}
        </tbody>
      </table>
       
      {
        updateModal && <UpdateBorrowHistory isOpen={updateModal} borrow={borrow} onClose={hadleCloseModal} onSubmit={handleUpdeteSubmit}/>
      }
    </div>
  );
};

export default BorrowHistoryList;